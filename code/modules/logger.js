const winston = require('winston');
const uuidV1 = require('uuid/v1');
const logzioWinstonTransport = require('winston-logzio');

const _generateLogID = () => uuidV1();

let transports = [];

if (process.env.NODE_ENV === "development") {
    transports.push(new winston.transports.Console({
        level: 'info',
        colorize: true
    }));
} else {
    let loggerOptions = {
        token: process.env.LOGGING_TOKEN,
        host: process.env.LOGGING_HOST,
        type: process.env.APP_NAME
    };
    transports.push(
        new (logzioWinstonTransport)(loggerOptions)
    );
}

const logger = new (winston.Logger)({
    transports
});


const getMetadata = (extend = {}) => {
    return Object.assign(extend, {
        appName: process.env.APP_NAME,
        logID: _generateLogID()
    });

};

logger.requestErrorStream = {
    write: function (message, encoding) {
        let meta = getMetadata();
        logger.error("Request Error", message, meta);
    }
};
module.exports = {
    logger,
    loggerMetadata: getMetadata
};