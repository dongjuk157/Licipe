FROM jenkins:1.596
 
USER root
RUN apt-get update \
      && apt-get install -y \
      && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

FROM ubuntu

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm 

COPY package.json /app/package.json
RUN npm install 
RUN npm install react-scripts@3.0.1 -g
COPY . /app
RUN npm run build

CMD ["npm", "start"]

USER jenkins

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
