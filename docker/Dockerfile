FROM node:22-alpine

WORKDIR /app

COPY app/src ./src

RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

USER node

ENV PORT=8080
EXPOSE 8080

CMD ["node", "src/server.js"]
