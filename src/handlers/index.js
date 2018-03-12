const TodosService = require('../services/todos');

const HomePage = async (req, res) => {
  const data = await TodosService.GetTodosData(req.params.shown);
  res.render('index', data);
};

module.exports = {
  HomePage,
};
