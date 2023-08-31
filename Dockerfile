FROM oven/bun

COPY . .

RUN bun install --production
RUN bun run build

CMD ["bun", "run", "start:prod"]

EXPOSE 3000