const getTodos = async ({fetchFunc, labelText, filter}) => {
	const todos = await fetchFunc();

	return {
		shownTodos: todos,
		countLabel: `${todos.length} ${labelText}`,
		filter
	};
};

const getCompleted = async () => {
  const fetchCompletedTodos = () => global.Store.find({ completed: true });

  return getTodos({
	  fetchFunc: fetchCompletedTodos,
	  labelText: 'Completed Tasks',
	  filter: 'completed'
  })
};

const getAll = async () => {
  const fetchTodos = () => global.Store.findAll();

  return getTodos({
	  fetchFunc: fetchTodos,
	  labelText: 'Tasks',
	  filter: 'all'
  })
};

const getActive = async () => {
  const fetchActiveTodos = () => global.Store.find({ completed: false });

  return getTodos({
	  fetchFunc: fetchActiveTodos,
	  labelText: 'Active Tasks',
	  filter: 'active'
  })
};

const getTodosByFilter = async (filter) => {
  const todosByFilter = todoByFilter[filter] || todoByFilter['all'];

  return todosByFilter();
};

const todoByFilter = {
	completed: getCompleted,
  active: getActive,
  all: getAll
};

module.exports = getTodosByFilter;