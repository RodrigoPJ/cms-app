# Deployment instructions

This is a client side app aka the front end, made in react. It is meant to be delivered as a "compiled" solution,  in plain javascript, html and css.  The commands needed to get a fully ready bundle of files in the dist folder is at the moment "npm run build" using default vite configs.

It deploys the bundled ready files as static assets being served by nginx inside a docker container to  communicate with other docker images containing all the Back End services neede for the app.

commonly needed commands for checking the docker container

List current running docker images: **docker ps**
build a docker image **docker build -t <tag_name> .**
Enter the terminal of a docker image: **docker exec -it <image_id> sh**
copy a directory or file into a running container **docker cp ./nginx.conf <container_name_or_id>:/etc/nginx/conf.d/default.conf**
check current nginx config and dump contents **nginx -T**
location of config file inside an nginx docker container **:/etc/nginx/conf.d/default.conf**
restart a nginx server **nginx -s reload**

see images from docker: **docker images**

run a image as a container docker run -d -p 8080:80 --name cms-frontend cms-frontend

📦 Release Strategy for cms-app (Gitea + Docker)
🎯 Goals

Every push is traceable to a running version

No container sprawl

No image hoarding

Safe rollback

Minimal operational overhead

1️⃣ Image Tagging Strategy
Rule

Never rely on latest alone.

Each build produces two tags:

cms-frontend:latest

cms-frontend:<git-sha>

Example:

cms-frontend:latest
cms-frontend:9f3a2c1

Why

latest = what is running now

<sha> = immutable, rollback-safe artifact

2️⃣ Container Strategy (Single-Instance)
Rule

Only one container runs per service name.

Container name is fixed: cms-frontend

Old container is always stopped and removed before new run

docker stop cms-frontend || true
docker rm cms-frontend || true


This guarantees:

No orphan containers

Clear operational state

3️⃣ Deployment Flow

On every push to main:

Build frontend

Build Docker image

Tag image

Stop old container

Start new container

Verify container is running

Diagram
git push
   ↓
build
   ↓
docker image (sha + latest)
   ↓
replace container
   ↓
service running

4️⃣ Rollback Strategy (Fast & Boring)
Rule

Rollback = run a previous image tag

Example:

docker stop cms-frontend
docker rm cms-frontend

docker run -d \
  -p 8080:80 \
  --name cms-frontend \
  cms-frontend:9f3a2c1


No rebuilds.
No Git tricks.
No panic.

5️⃣ Image Retention Policy (Critical)
Rule

Keep:

latest

Last N images (recommended: 5–10)

Delete everything older.

Automated Cleanup Step

Add this to your Gitea workflow:

- name: Cleanup old images
  run: |
    docker images cms-frontend --format "{{.ID}}" | tail -n +6 | xargs -r docker rmi


📌 This keeps the 5 most recent images.

6️⃣ Container Cleanup Policy
Rule

There should never be more than one container per service.

But as a safety net:

docker container prune -f


Run manually or weekly via cron.

7️⃣ Disk Safety Nets
Monthly maintenance
docker image prune -f
docker volume prune -f


Optional cron:

0 3 1 * * docker system prune -f

8️⃣ Gitea Actions YAML (Release-Ready)

Key parts only:

- name: Build Docker image
  run: |
    SHA=$(git rev-parse --short HEAD)
    docker build \
      -t cms-frontend:latest \
      -t cms-frontend:$SHA \
      front-end

- name: Deploy
  run: |
    docker stop cms-frontend || true
    docker rm cms-frontend || true
    docker run -d \
      -p 8080:80 \
      --name cms-frontend \
      --restart unless-stopped \
      cms-frontend:latest

- name: Cleanup old images
  run: |
    docker images cms-frontend --format "{{.ID}}" | tail -n +6 | xargs -r docker rmi

9️⃣ What This Strategy Prevents

✅ Zombie containers
✅ Disk exhaustion
✅ “Which version is running?” confusion
✅ Unreproducible builds
✅ Panic rollbacks

10️⃣ When to Upgrade This Strategy

Move to something more complex only when:

multiple environments (staging/prod)

multiple servers

zero-downtime required

horizontal scaling

Until then, this setup is correct, intentional, and professional.