const getHomeCompletedData = async () => {
  const completedTodos = await global.Store.find({ completed: true });
  const shownTodos = completedTodos;
  const countLabel = `${completedTodos.length} Completed Tasks`;
  return { shownTodos, countLabel, shownFilter: 'completed' };
};

const getHomeData = async () => {
  const allTodos = await global.Store.findAll();
  const shownTodos = allTodos;
  const countLabel = `${allTodos.length} Tasks Total`;
  return { shownTodos, countLabel, shownFilter: 'all' };
};

const getHomeActiveData = async () => {
  const activeTodos = await global.Store.find({ completed: false });
  const shownTodos = activeTodos;
  const countLabel = `${activeTodos.length} Active Tasks`;
  return { shownTodos, countLabel, shownFilter: 'active' };
};

const GetTodosData = shownFilter => new Promise((resolve, reject) => {
  switch (shownFilter) {
    case 'active':
      resolve(getHomeActiveData());
      break;
    case 'completed':
      resolve(getHomeCompletedData());
      break;
    case 'all':
    default:
      resolve(getHomeData());
      break;
  }
  reject();
});


module.exports = {
  GetTodosData,
};
