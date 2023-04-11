FROM node:16.13.2 AS builder

WORKDIR /adverts-project

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run builder

FROM nginx:latest

COPY --from=builder /advertsProject/dist/adverts-project /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT" '/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'