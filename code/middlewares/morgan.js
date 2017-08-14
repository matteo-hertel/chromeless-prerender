const morgan = require('morgan');

const {
    logger
} = require(`${__dirname}/../modules/logger`);
morgan.token('headers', (req, res) =>{
    return JSON.stringify(req.headers);
});

morgan.format("custom", `RemoteAddress :remote-addr;Date [:date[clf]]; Method :method; URL :url; Length :res[content-length]; ResponseTime :response-time ms; HTTPVersion /:http-version; StatusCode :status; Referrer :referrer; UserAgent :user-agent; Headers ":headers";`);

module.exports = (router) => {
    router.use(morgan("custom", {
        stream: logger.requestErrorStream,
        skip: (req, res) => {
            return res.statusCode < 400;
        }
    }));
};
