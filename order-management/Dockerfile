FROM node:lts-alpine3.19@sha256:291e84d956f1aff38454bbd3da38941461ad569a185c20aa289f71f37ea08e23
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 40000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start"]
