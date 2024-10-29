# Base image
FROM node:20-alpine AS base
RUN npm install -g turbo pnpm

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

# Builder stage
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=@fpoon-tymex/web --docker

# Installer stage
FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo build --filter=@fpoon-tymex/web...
RUN ls -la apps/web/dist

# Runner stage
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

RUN ls -la
# Copy built files from installer stage
COPY --from=installer /app/apps/web/dist .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]