FROM node:argon
MAINTAINER Stanislav Dabov <stanislav.dabov@paysafe.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ../package.json /usr/src/app
RUN npm install

# Bundle app source
COPY ../src/app /usr/src/app

EXPOSE 4200
CMD [ "npm", "start" ]
