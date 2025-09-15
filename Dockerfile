FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run updateSharedComponents

# RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]