const TodoHandlers = require('../handlers/todo');
const express = require('express');
let router = express.Router();

router.get('/', TodoHandlers.GetAllTodos);
router.post('/', TodoHandlers.AddTodo);
router.put('/:id', TodoHandlers.UpdateTodo);
router.delete('/:id', TodoHandlers.DeleteTodo);
router.post('/duplicate/:id', TodoHandlers.DuplicateTodo);
router.post('/clear', TodoHandlers.ClearCompleted);
router.post('/toggleall', TodoHandlers.ToggleAll);

module.exports = router;