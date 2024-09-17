FROM node:20

WORKDIR /front

COPY . .

RUN npm install -g @angular/cli@17.0.3

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
