FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# 1. Copy your already-built dist folder from your computer to the container
# Format: COPY <source_on_host> <destination_in_container>
COPY ./dist ./dist

# 2. Copy package.json to ensure npm start script is available
COPY package.json .

# 3. Only install production dependencies to keep the image small
RUN npm install --omit=dev

# Open the port
EXPOSE 3000

ENV NODE_ENV=dev

# Run the start command
CMD ["node", "./dist/server.js"]
