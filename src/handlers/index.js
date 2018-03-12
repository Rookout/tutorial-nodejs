const HomeServiceProvider = require('../services/home');

module.exports.Home = async (req, res, next) => {
    const data = await HomeServiceProvider.HomeProvider(req.params.shown);
    res.render('index', data);
}
