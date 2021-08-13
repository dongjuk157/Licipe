FROM jenkins:1.596
 
USER root
RUN apt-get update \
      && apt-get install -y \
      && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers
 
USER jenkins

FROM nginx:latest
VOLUME /raor_dev_volume
RUN rm -rf /etc/nginx/conf.d/default.conf
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
ADD ./build /usr/share/nginx/html
