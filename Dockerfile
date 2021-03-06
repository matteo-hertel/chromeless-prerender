FROM debian:stable-slim
MAINTAINER Matteo Hertel <info@matteohertel.com>
# Install basic tools/utilities and google Chrome unstable (which has cross platform support for headless mode). Combining theem together so that apt cache cleanup would need to be done just once.
RUN apt-get update -y && \
    apt-get install ca-certificates \
      gconf-service \
      libasound2 \
      libatk1.0-0 \
      libatk1.0-0 \
      libdbus-1-3 \
      libgconf-2-4 \
      libgtk-3-0 \
      libnspr4 \
      libnss3 \
      libx11-xcb1 \
      libxss1 \
      libxtst6 \
      fonts-liberation \
      libappindicator1 \
      xdg-utils \
      wget \
      curl \
      xz-utils -y --no-install-recommends \
      lsb-release \
      supervisor
RUN sed -i 's/^\(\[supervisord\]\)$/\1\nnodaemon=true/' /etc/supervisor/supervisord.conf
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome*.deb 
RUN apt-get install -f
RUN apt-get clean autoclean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* google-chrome-stable_current_amd64.deb

# Install nodejs
ENV NPM_CONFIG_LOGLEVEL=info 
ENV NODE_VERSION=8.9.3

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

RUN npm install -g yarn
RUN mkdir -p /var/node
ADD config/supervisord /etc/supervisor
ADD code/ /var/node/
WORKDIR /var/node
RUN rm -rf node_modules
RUN yarn

# Define working directory.
WORKDIR /etc/supervisor

# Define default command.
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
