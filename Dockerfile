FROM debian:stable-slim

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
      lsb-release
      
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome*.deb 
RUN apt-get install -f
RUN apt-get clean autoclean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* google-chrome-stable_current_amd64.deb

# Install nodejs
ENV NPM_CONFIG_LOGLEVEL=info NODE_VERSION=8.3.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

ENTRYPOINT "/bin/bash"
