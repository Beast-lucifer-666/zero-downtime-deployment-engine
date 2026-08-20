FROM gcr.io/distroless/nodejs22-debian12:nonroot

WORKDIR /app

COPY app/src ./src

ENV PORT=8080
EXPOSE 8080

CMD ["src/server.js"]
