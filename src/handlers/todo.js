const sendResponse = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};

const cleanString = (str) => {
  const regex = new RegExp(/[\u0590-\u05FF|>|<|;|`|&|/|\\]/g);
  let trimmedStr = str.replace(regex, '');
  trimmedStr = trimmedStr.trim();
  return trimmedStr;
};

const GetAllTodos = async (req, res) => {
  const todos = await global.Store.findAll();
  if (!todos) {
    return sendResponse(res, 404, 'No todos found');
  }
  return sendResponse(res, 200, todos);
};

const AddTodo = async (req, res) => {
  if (!req.body.title) {
    return sendResponse(res, 400, 'Missing required payload parameter <Title>');
  }
  const todo = {
    title: cleanString(req.body.title),
    completed: false,
  };
  const response = await global.Store.save(todo);
  return sendResponse(res, 200, response);
};

const UpdateTodo = async (req, res) => {
  if (!req.params.id || req.body.title == null || req.body.completed == null) {
    return sendResponse(res, 400, 'Missing required parameters/payload <id>, <title>, <completed>');
  }
  const todoId = req.params.id;
  const query = await global.Store.findById(todoId);
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

module.exports = {
  GetAllTodos,
  AddTodo,
  UpdateTodo,
  DeleteTodo,
  DuplicateTodo,
  ToggleAll,
  ClearCompleted,
};
