FROM node:8.9.4

ARG GIT_COMMIT=unspecified
ENV ROOKOUT_COMMIT=$GIT_COMMIT

ARG GIT_ORIGIN=unspecified
ENV ROOKOUT_REMOTE_ORIGIN=$GIT_ORIGIN

ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 4000
CMD ["node", "index"]