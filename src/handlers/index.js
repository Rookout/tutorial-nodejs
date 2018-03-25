const TodosService = require('../services/todos');

//why upper case?
const HomePage = async (req, res) => {
  const data = await TodosService.GetTodosData(req.params.shown);
  res.render('index', data);
};

module.exports = {
  HomePage,
};


//let's call this file homePage (to be consistent)