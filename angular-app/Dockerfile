# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as builder

RUN mkdir /project
WORKDIR /project

# Install all the dependencies
RUN npm install -g @angular/cli@13

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]
