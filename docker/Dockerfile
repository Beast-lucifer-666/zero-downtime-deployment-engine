FROM node:20-alpine
WORKDIR /app
COPY app/package*.json ./
COPY app/src ./src
USER node
ENV PORT=8080
EXPOSE 8080
CMD ["node", "src/server.js"]
