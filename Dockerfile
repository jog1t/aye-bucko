FROM node:current-alpine AS builder
WORKDIR /app
COPY ambrose-light ambrose-light
COPY fair-wind fair-wind
COPY whydah/package.json whydah/build whydah/
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

FROM node:current-alpine AS runner
WORKDIR /app
COPY --from=builder /app/whydah ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
