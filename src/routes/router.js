const HomePageHandlers = require('../handlers/homePage');
const ActionsHandlers = require('../handlers/actions');
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', HomePageHandlers.homePage);
router.get('/favicon.ico', (req, res) => res.status(204));
router.get('/filter/:shown', HomePageHandlers.homePage);

// restful endpoints:
router.get('/todos', ActionsHandlers.getAllTodos);
router.post('/todos', ActionsHandlers.addTodo);
router.put('/todos/:id', ActionsHandlers.updateTodo);
router.delete('/todos/removeAll', ActionsHandlers.removeAllTodos);
router.delete('/todos/:id', ActionsHandlers.deleteTodo);
router.post('/todos/:id/duplicate', ActionsHandlers.duplicateTodo);
router.delete('/todos', ActionsHandlers.clearCompletedTodos);
router.post('/todos/toggleall', ActionsHandlers.toggleAllTodos);


module.exports = router;
