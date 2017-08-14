const correlationIdMiddleware = require(`${__dirname}/../middlewares/correlationId`);

const attachMiddlewares = (router) => {
    correlationIdMiddleware(router);
    return router;
};

module.exports = attachMiddlewares;
