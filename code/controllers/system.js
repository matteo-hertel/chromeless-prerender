const systemRoutes = (router) => {
    router.get('/healthcheck', function(req, res) {
        res.send(`I'm alive!`);
    });
    router.get('/teapot', function(req, res) {
        res.status(418);
        res.send(`I'm a teapot`);
    });
};

module.exports = systemRoutes;
