/* eslint prefer-destructuring: 0 */
const utils = require('./utils');

const actionResult = (ok, message, errorCode = null, errorMessage = null) => ({
  ok,
  message,
  error: {
    message: errorMessage,
    code: errorCode,
  },
});

const addNewTodo = async (title, completed) => {
  title = utils.cleanString(title.toString());

  const newTodo = await global.Store.save({
    title,
    completed,
  })
    .then(null, (err) => {
      console.log(err);
    });

  return newTodo;
};

const getAll = async () => {
  const todos = await global.Store.findAll()
    .then(null, (err) => {
      console.log(err);
    });

  if (!todos) {
    return actionResult(false, null, 404, 'No todos found');
  }

  return actionResult(true, todos);
};

const add = async (req) => {
  const title = req.body.title;
  const completed = req.body.completed || false;

  if (!title) {
    return actionResult(false, null, 400, 'Missing <title>');
  }

  const newTodo = addNewTodo(title, completed)
    .then(null, (err) => {
      console.log(err);
    });

  return actionResult(true, newTodo);
};

const update = async (req) => {
  const todoId = req.params.id;
  const title = req.body.title;
  const completed = req.body.completed;

  if (!todoId || title == null || completed == null) {
    return actionResult(false, null, 404, 'Missing required parameters/payload <id>, <title>, <completed>');
  }

  const todo = await global.Store.findById(todoId)
    .then(null, (err) => {
      console.log(err);
    });
  if (!todo) {
    return actionResult(false, null, 404, 'No todo found');
  }

  todo.title = utils.cleanString(title);
  todo.completed = completed;

  const updatedTodo = await global.Store.save(todo, todoId)
    .then(null, (err) => {
      console.log(err);
    });
  return actionResult(true, updatedTodo);
};

const remove = async (req) => {
  const todoId = req.params.id;

  if (!todoId) {
    return actionResult(false, null, 400, 'Missing required parameter Todo ID');
  }

  await global.Store.remove(todoId)
    .then(null, (err) => {
      console.log(err);
    });
  return actionResult(true, 'Deleted successfully');
};

const duplicate = async (req) => {
  const todoId = req.params.id;

  if (!todoId) {
    return actionResult(false, null, 400, 'Missing required parameter Todo ID');
  }

  const todo = await global.Store.findById(todoId);

  if (!todo) {
    return actionResult(false, null, 404, 'No todo found');
  }

  const newTodo = addNewTodo(todo.completed, todo.title)
    .then(null, (err) => {
      console.log(err);
  });

  return actionResult(true, newTodo);
};

const toggleAll = async (req) => {
  await global.Store.ToggleAll()
    .then(null, (err) => {
      console.log(err);
    });
  return actionResult(true, 'Toggled all todos');
};

const clearCompleted = async (req) => {
  await global.Store.ClearCompleted()
    .then(null, (err) => {
      console.log(err);
    });
  return actionResult(true, 'Cleared all complete todos');
};


module.exports = {
  getAll,
  add,
  update,
  remove,
  duplicate,
  toggleAll,
  clearCompleted,
};
