# Chromeless Prerender

This is a less smart version  of [https://github.com/prerender/prerender](https://github.com/prerender/prerender) that uses headless chrome to achieve the same goal, it uses [https://github.com/graphcool/chromeless](https://github.com/graphcool/chromeless) to wrap the headless chrome debugger protocol with a beautiful and elegant set of API

## Quick Start

```
git clone https://github.com/matteo-hertel/chromeless-prerender.git
cd chromeless-prerender
docker-compose up -d #use --build to force the rebuild of the container
```
The container running the node app and the headless chrome will start and it will be ready to accept a new connection

## Try it out

once the container is up and running run

```
curl -XGET -i http://localhost:3000/api/v0.1/fetchHTML?url=https://google.co.uk
```

and it will return something like

```
HTTP/1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
Connection: keep-alive

[html]
```

NOTE: make sure you update the DOMAIN_WHITELIST env var to whitelist your domains, it accepts a csv sting like `google.com;google.co.uk` (the default value)

if a request comes in for a domain that is not whitelisted 

```
curl -XGET -i http://localhost:3000/api/v0.1/fetchHTML\?url\=https://google.nz
```

will return an error that will look like

```
HTTP/1.1 400 Bad Request

Content-Length: 0
```

## ENV
The following ENV vars are supported
```
DOMAIN_WHITELIST=google.com;google.co.ukhertel.me.uk # CSV string of whitelisted domains
APP_NAME=dev-chromeless-prerender #Name of the app, for loggin
NODE_ENV=development # set this to production if you deploy it
SERVER_PORT=3000 # port the server will listen to
LOGGING_TOKEN= #[https://logz.io](https://logz.io) token
LOGGING_HOST=#[https://logz.io](https://logz.io) host
RENDER_TIMEOUT=2000 #time chrome will wait before fetching the HTML
```

## Loggin
I'm testing out [https://logz.io](https://logz.io) and its free plan, it gives a fully fledge ELK stack, just throw in your token and host, if the ENV values are missing it will default to logging to the console

## Notes
this is a PoC built to fit my current needs, could be deployed in production but needs some customization 