FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

COPY package.json ./
# npm ci respect the lockfile, npm install doesn't, so this avoids some problems
# that can appears when you have different versions.
RUN npm ci
RUN npm install -g sequelize-cli

EXPOSE 3000

CMD ["npm", "run", "dev"]