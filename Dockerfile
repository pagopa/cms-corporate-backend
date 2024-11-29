FROM node:14.20.0-alpine@sha256:4aff4ba0da347e51561587eba037a38db4eaa70e1a6c8334d66779fe963d5be7

# Our working directory

WORKDIR /app

# Set node env
ENV NODE_ENV=production

# Copy the required files
COPY src/app .

# Install dependencies and run build
RUN yarn --production --frozen-lockfile
RUN yarn build
EXPOSE 1337

CMD ["yarn", "start"]

