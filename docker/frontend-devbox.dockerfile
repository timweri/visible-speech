ARG BASE_IMAGE
ARG BASE_IMAGE_VERSION
FROM ${BASE_IMAGE}:${BASE_IMAGE_VERSION}

ARG MAINTAINER
LABEL maintainer=${MAINTAINER}

RUN npm install -g @vue/cli eslint

COPY ./vue/package.json /package.json
WORKDIR /
RUN npm i

WORKDIR /app/
COPY ./vue /app/
