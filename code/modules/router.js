const router = require('express').Router();
const { loadControllers } = require(`${__dirname}/../controllers`);
const systemRoutes = require(`${__dirname}/../controllers/system`)(router); //Load system routes

loadControllers(router);

module.exports = router;
