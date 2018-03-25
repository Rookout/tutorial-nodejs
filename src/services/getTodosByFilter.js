const getTodos = async ({ fetchFunc, labelText, filter }) => {
  const todos = await fetchFunc();

  return {
    shownTodos: todos,
    countText: `${todos.length} ${labelText}`,
    filter,
  };
};

const getCompleted = async () => {
  const fetchCompletedTodos = () => global.Store.find({ completed: true });

  return getTodos({
    fetchFunc: fetchCompletedTodos,
    labelText: 'Completed Tasks',
    filter: 'completed',
  });
};

const getAll = async () => {
  const fetchTodos = () => global.Store.findAll();

  return getTodos({
    fetchFunc: fetchTodos,
    labelText: 'Tasks',
    filter: 'all',
  });
};

const getActive = async () => {
  const fetchActiveTodos = () => global.Store.find({ completed: false });

  return getTodos({
    fetchFunc: fetchActiveTodos,
    labelText: 'Active Tasks',
    filter: 'active',
  });
};

const fetchTodosByFilter = {
  completed: getCompleted,
  active: getActive,
  all: getAll,
};

const getTodosByFilter = async (filter) => {
  const fetchTodos = fetchTodosByFilter[filter] || fetchTodosByFilter.all;

  return fetchTodos();
};


module.exports = getTodosByFilter;
