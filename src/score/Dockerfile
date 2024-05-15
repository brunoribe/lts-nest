# Use a Node.js base image
FROM node:18-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json from the project root
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Bundle app source inside Docker image
# Copy only the relevant microservice source code
COPY ./src/score ./
COPY ./src/bootstrap.ts ./

# Build the TypeScript application
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/tsconfig.json ./

# Expose port and define CMD
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]