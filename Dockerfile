FROM mhart/alpine-node:11.11.0

# RUN apk update && apk upgrade && \
#     apk add --no-cache bash git openssh

# shared
COPY /coinpush-shared /usr/src/app/coinpush-shared

# client
WORKDIR /usr/src/app/client-web
COPY ./coinpush-client-web/*.json ./
RUN npm i --quiet --no-progress
COPY ./coinpush-client-web/src ./src