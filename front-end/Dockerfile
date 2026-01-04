FROM nginx:alpine

COPY react-client-app/dist /usr/share/nginx/html

# Copy my nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
