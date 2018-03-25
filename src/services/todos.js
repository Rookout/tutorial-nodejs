// as we discussed, "home" is a frontend decision, so no need to mention it here.
// also the word "data" does not really contribute
///  getHomeCompletedData => getCompleted etc.


// we can reduce a lot of the code duplication here, using inversion of control
// so we can have a general method

const getTodos = async ({fetchFunc, labelText, shownFilter}) => {
	const todos = await fetchTodos();

	return {
		shownTodos: todos,
		countLabel:  `${todos.length} ${labelText}`,
		shownFilter
	};
};

const getHomeCompletedData = async () => {
  const fetchCompletedTodos = () => global.Store.find({ completed: true });

  return getTodos({
	  fetchFunc: fetchCompletedTodos,
	  labelText: 'Completed Tasks',
	  shownFilter: 'completed'
  })
};

//compose as above
const getHomeData = async () => {
  const allTodos = await global.Store.findAll();
  const shownTodos = allTodos;
  const countLabel = `${allTodos.length} Tasks Total`;
  return { shownTodos, countLabel, shownFilter: 'all' };
};

//compose as above
const getHomeActiveData = async () => {
  const activeTodos = await global.Store.find({ completed: false });
  const shownTodos = activeTodos;
  const countLabel = `${activeTodos.length} Active Tasks`;
  return { shownTodos, countLabel, shownFilter: 'active' };
};


// GetTodosData - why upper case? also what does the word shown adds here? - should be called todosByFilter
// shownFilter => filter
// countLabel - label is a front end concept/display decision,  a better name would be "countText" or even "summary"
// switch case is ugly, we can do something more idiomatic here.

const GetTodosData = shownFilter => async () => {
  const todosByFilter =  todoByFilter[shownFilter] || todoByFilter['all'];

  return todosByFilter();
};

const todoByFilter = {
	completed: getHomeCompletedData,
	//etc..
}

module.exports = {
  GetTodosData,
};

// this flile should be called todosByFilter
