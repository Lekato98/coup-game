FROM oven/bun

COPY . .

RUN bun install

CMD ["bun", "start"]

EXPOSE 3000