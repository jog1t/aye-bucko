FROM node:current-alpine AS builder
WORKDIR /app
COPY build ./build

FROM nginx:stable-alpine AS runner
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY .deployment/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
