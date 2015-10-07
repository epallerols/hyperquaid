FROM node:4.1.2

ADD . /src
WORKDIR /src
RUN npm install

EXPOSE 8000

CMD ["node", "index.js"]
