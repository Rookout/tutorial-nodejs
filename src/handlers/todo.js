exports.GetAllTodos = async (req, res, next) => {
    const todos = await global.Store.findAll();
    if (!todos) {
        return res.status(404).send({message: 'No todos found'})
    }
    return res.status(200).send({message: todos})
};

exports.AddTodo = async (req, res, next) => {
    if (!req.body || !req.body.title) {
        return res.status(400).send({message: 'Missing required payload parameter <Title>'})
    }
    let todo = {};
    todo.title = cleanString(req.body.title);
    todo.completed = false;
    const response = await global.Store.save(todo);
    return res.status(200).send({message: response})
};

exports.UpdateTodo = async (req, res, next) => {
    if (!req.params.id || req.body.title == null || req.body.completed == null) {
        return res.status(400).send({message: 'Missing required parameters/payload'})
    }
    const todoId = req.params.id;
    const query = await global.Store.findById(todoId);
    let todo = query;
    if (!todo) {
        return res.status(404).send({message: 'No todo found'})
    }
    todo.title = cleanString(req.body.title);
    todo.completed = req.body.completed;
    const response = await global.Store.save(todo, todoId);
    return res.status(200).send({message: response});
};

exports.DeleteTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Missing required parameter Todo ID'});
    }
    let todoId = req.params.id;
    const response = await global.Store.remove(todoId);
    return res.status(200).send({message: 'Deleted successfully'});
};

exports.DuplicateTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Missing required parameter Todo ID'});
    }
    const todoId = req.params.id;
    const todo = await global.Store.findById(todoId);
    if (!todo) {
        return res.status(404).send({message: 'No todo found'})
    }
    let newTodo = {};
    newTodo.title = todo.completed;
    newTodo.completed = todo.title;
    const response = await global.Store.save(newTodo);
    return res.status(200).send({message: response})
};

exports.ToggleAll = async (req, res, next) => {
    const query = await global.Store.ToggleAll();
    return res.status(200).send({message: 'Cleared all complete todos'})
};

exports.ClearCompleted = async (req, res, next) => {
    const query = await global.Store.ClearCompleted();
    return res.status(200).send({message: 'Cleared all complete todos'})
};

const cleanString = (title) => {
    const regex = new RegExp(/[\u0590-\u05FF|>|<|;|`|&|\/|\\]/g);
    let trimmedTitle = title.replace(regex, '');
    trimmedTitle = trimmedTitle.trim();
    return trimmedTitle;
};