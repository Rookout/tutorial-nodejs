const TodoHandlers = require('../handlers/todo');
const express = require('express');

const router = express.Router();


//restful endpoints:
router.get('/', TodoHandlers.GetAllTodos);
router.post('/todos/', TodoHandlers.AddTodo);
router.put('/todos/:id', TodoHandlers.UpdateTodo);
router.delete('/todos/:id', TodoHandlers.DeleteTodo);
router.post('/todos/:id/duplicate', TodoHandlers.DuplicateTodo);
router.delete('/todos', TodoHandlers.ClearCompleted);
router.post('/toggleall', TodoHandlers.ToggleAll);

module.exports = router;

//this file should be called router