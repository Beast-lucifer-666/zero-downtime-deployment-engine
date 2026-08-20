FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/* /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY app/src ./src

USER node
ENV PORT=8080
EXPOSE 8080

CMD ["node", "src/server.js"]
