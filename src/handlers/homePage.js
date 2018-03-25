const getTodosByFilter = require('../services/getTodosByFilter');

const homePage = async (req, res) => {
  const data = await getTodosByFilter(req.params.shown);
  res.render('index', data);
};

module.exports = {
  homePage,
};
