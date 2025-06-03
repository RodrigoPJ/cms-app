# Deployment instructions

this is a client side app aka the front end, made in react. It is meant to be delivered as a "compiled" solution,  in plain javascript, html and css.  The commands needed to get a fully ready bundle of files in the dist folder is at the moment "npm run build" using default vite configs.


the idea is to deploy this bundled ready files as static assets being served by nginx, then use that server to proxy the requeests made inside to our Auth and Content servers