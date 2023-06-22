/* eslint no-shadow: 0 */
const { create } = require('lodash');
const todos = require('../services/todos');


const sendResponse = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};


const performAction = action => async (req, res) => {
  immitateBpHighLoad();
  const result = await action(req);

  if (result.ok) {
    return sendResponse(res, 200, result.message);
  }

  return sendResponse(res, result.error.code, result.error.message);
};

async function immitateBpHighLoad() {
  var hugeObject = createHugeObject()
  for (var i = 0; i < 1000; i++) {
    var d = hugeObject;
    console.log('1');
    console.log('2');
    console.log('3');
    await sleep(100);
  }
}

function createHugeObject() {
  var obj = {
    level: 'top',
    innerCollection: []
  }
  fillMockObject(obj, obj, 0, 30)

  var obj2 = {
    level: 'top',
    innerCollection: []
  }
  fillMockObject(obj2, obj2, 0, 30)


  var obj3 = {
    level: 'top',
    innerCollection: []
  }
  fillMockObject(obj3, obj3, 0, 30)

  return {
    text: "super object",
    obj,
    obj2,
    obj3
  }
}

function fillMockObject(obj, top, currentLevel, maxLevel) {
  if (currentLevel > maxLevel) {
    return
  }

  var inner = {
    level: currentLevel,
    text: "stam",
    anotherText: "yooo",
    array1: ["bla", "bla4", "bla7", "bla8"],
    array2: ["bla", "bla4", "bla7", "bla8"],
    array3: ["bla", "bla4", "bla7", "bla8"],
    array4: ["bla", "bla4", "bla7", "bla8"],
    array5: ["bla", "bla4", "bla7", "bla8"],
  }
  obj.inner = inner;
  top.innerCollection.push(obj)
  createMockObject(inner, top, ++currentLevel, maxLevel)
}

async function sleep(ms) {
  await new Promise(res => setTimeout(res, ms))
}


const getAllTodos = async (req, res) => {
  const getAllAction = req => todos.getAll();
  return performAction(getAllAction)(req, res);
};

const addTodo = async (req, res) => {
  const addAction = req => todos.add(req);
  return performAction(addAction)(req, res);
};

const updateTodo = async (req, res) => {
  const updateAction = req => todos.update(req);
  return performAction(updateAction)(req, res);
};

const deleteTodo = async (req, res) => {
  const removeAction = req => todos.remove(req);
  return performAction(removeAction)(req, res);
};

const duplicateTodo = async (req, res) => {
  const duplicateAction = req => todos.duplicate(req);
  return performAction(duplicateAction)(req, res);
};

const toggleAllTodos = async (req, res) => {
  const toggleAllAction = req => todos.toggleAll(req);
  return performAction(toggleAllAction)(req, res);
};

const clearCompletedTodos = async (req, res) => {
  const clearCompletedAction = req => todos.clearCompleted(req);
  return performAction(clearCompletedAction)(req, res);
};

const removeAllTodos = async (req, res) => {
  const clearALl = req => todos.removeAll(req);
  return performAction(clearALl)(req, res);
};

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  duplicateTodo,
  toggleAllTodos,
  clearCompletedTodos,
  removeAllTodos,
};
