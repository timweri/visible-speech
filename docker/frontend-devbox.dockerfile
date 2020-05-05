ARG BASE_IMAGE
ARG BASE_IMAGE_VERSION
FROM ${BASE_IMAGE}:${BASE_IMAGE_VERSION}

ARG MAINTAINER
LABEL maintainer=${MAINTAINER}

RUN npm install -g typescript eslint

COPY ./frontend/package.json /package.json
WORKDIR /
RUN npm i

WORKDIR /app/
COPY ./frontend /app/
