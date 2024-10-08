FROM node:20-alpine as build

# update and install the latest dependencies
# Add non root user to the docker image and set the user
RUN apk update && apk upgrade && adduser -D nuxtuser

USER nuxtuser

# set work dir as app
WORKDIR /app
# copy the nuxt project content with proper permission for the user nuxtuser
COPY --chown=nuxtuser:nuxtuser . /app
# COPY . ./
# install all the project npm dependencies
# build the nuxt project to generate the artifacts in .output directory
RUN npm install && npm run build

# we are using multi stage build process to keep the image size as small as possible
FROM node:19-alpine
# update and install latest dependencies, add dumb-init package
# add a non root user
RUN apk update && apk upgrade && apk add dumb-init && adduser -D nuxtuser 
# set non root user
USER nuxtuser

# set work dir as app
WORKDIR /app
# copy the output directory to the /app directory from 
# build stage with proper permissions for user nuxt user
COPY --chown=nuxtuser:nuxtuser --from=build /app/.output ./
# expose 3000 on container
EXPOSE 3000

# set app host and port . In nuxt 3 this is based on nitor and you can read
#more on this https://nitro.unjs.io/deploy/node#environment-variables
ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
# start the app with dumb init to spawn the Node.js runtime process
# with signal support
CMD ["dumb-init","node","/app/server/index.mjs"]