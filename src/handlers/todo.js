// this file should be named actions
// as we talked the handler should be as thin as possible
// let's create services/todos and move all the logic there


const sendResponse = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};

//is it really needed?
// if so, move to a services/utils, use in  services/todos
const cleanString = (str) => {
  const regex = new RegExp(/[\u0590-\u05FF|>|<|;|`|&|/|\\]/g);
  let trimmedStr = str.replace(regex, '');
  trimmedStr = trimmedStr.trim();
  return trimmedStr;
};

//remove
const GetAllTodos = async (req, res) => {
  const todos = await global.Store.findAll();
  if (!todos) {
    return sendResponse(res, 404, 'No todos found');
  }
  return sendResponse(res, 200, todos);
};

// after moving logic to todos

const performAction = action => async (request, response) =>  {
	const result = await action(request);
	//NOTICE THE BLANK LINE
	if (result.ok) {
		return sendResponse(response, 200);  // do you think we need to add the response?
	}
	//NOTICE THE BLANK LINE
	return sendResponse(response, 400, result.errorMessage)
}

const AddTodo = async (req, res) => {
    const addAction = (req) => todos.add({title: req.body.title, });
	return performAction(addAction)(req, res);
};

const UpdateTodo = async (req, res) => {
  if (!req.params.id || req.body.title == null || req.body.completed == null) {
    return sendResponse(res, 400, 'Missing required parameters/payload <id>, <title>, <completed>');
  }
  const todoId = req.params.id;
  const query = await global.Store.findById(todoId); //why do we need query?
  const todo = query;
  if (!todo) {
    return sendResponse(res, 404, 'No todo found');
  }
  todo.title = cleanString(req.body.title);
  todo.completed = req.body.completed;
  const response = await global.Store.save(todo, todoId);
  return sendResponse(res, 200, response);
};

const DeleteTodo = async (req, res) => {
  if (!req.params.id) {
    return sendResponse(res, 400, 'Missing required parameter Todo ID');
  }
  const todoId = req.params.id;
  await global.Store.remove(todoId);
  return sendResponse(res, 200, 'Deleted successfully');
};

const DuplicateTodo = async (req, res) => {
  if (!req.params.id) {
    return sendResponse(res, 400, 'Missing required parameter Todo ID');
  }
  const todoId = req.params.id;
  const todo = await global.Store.findById(todoId);
  if (!todo) {
    return sendResponse(res, 404, 'No todo found');
  }

	// this is a duplication, and below you see the problem. (see the bug?)
	// in services/todos add function aNewTodo(title, completed)

  const newTodo = {
    title: todo.completed,
    completed: todo.title,
  };
  const response = await global.Store.save(newTodo);
  return sendResponse(res, 200, response);
};

const ToggleAll = async (req, res) => {
  await global.Store.ToggleAll();
  return sendResponse(res, 200, 'Cleared all complete todos');
};

const ClearCompleted = async (req, res) => {
  await global.Store.ClearCompleted();
  return sendResponse(res, 200, 'Cleared all complete todos');
};

//no CamelCase
module.exports = {
  GetAllTodos,
  AddTodo,
  UpdateTodo,
  DeleteTodo,
  DuplicateTodo,
  ToggleAll,
  ClearCompleted,
};
