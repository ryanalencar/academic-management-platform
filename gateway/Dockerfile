FROM node:22-slim AS base

WORKDIR /app

FROM base AS dependencies

COPY package.json package-lock.json ./

RUN npm ci

FROM dependencies AS build

COPY tsconfig*.json ./
COPY src ./src

RUN npm run build

FROM base AS production

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]