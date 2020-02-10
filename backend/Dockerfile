FROM node:12.15.0-alpine3.11

WORKDIR /app

COPY package.json .
COPY package-lock.json .

# npm ci respect the lockfile, npm install doesn't, so this avoids some problems
# that can appears when you have different versions.
RUN npm install

COPY . .

RUN npm install -g sequelize-cli

EXPOSE 3000

CMD ["npm", "start"]