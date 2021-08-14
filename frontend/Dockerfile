FROM jenkins:1.596
 
USER root
RUN apt-get update \
      && apt-get install -y \
      && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm 

COPY package.json /app/package.json
RUN npm install 
RUN npm install react-scripts@3.0.1 -g


CMD ["npm", "start"]

USER jenkins

FROM nginx:latest
VOLUME /raor_dev_volume
RUN rm -rf /etc/nginx/conf.d/default.conf
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
ADD ./build /usr/share/nginx/html
