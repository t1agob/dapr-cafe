FROM node:lts-bullseye@sha256:6d72e3efec7d7844d5fd268e25da86c59306bd732341b25d810840dd1d4c05c8
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 40000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "start"]
