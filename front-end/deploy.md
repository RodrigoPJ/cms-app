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
