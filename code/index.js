require('dotenv').config({ path: `${__dirname}/.env` });
const server = require(`${__dirname}/modules/server`);
/**
 * Metrics
 */
require('epimetheus').instrument(server);
const {
    logger,
    loggerMetadata
} = require(`${__dirname}/modules/logger`);

server.listen(process.env.SERVER_PORT);

/**
 * Fire in the hole!
 */
logger.log('info', `${process.env.APP_NAME} restarted`, loggerMetadata());

process.on('uncaughtException', err => {
    logger.log('error', `${err.message}`, loggerMetadata({
        stack: err.stack
    }));
});
