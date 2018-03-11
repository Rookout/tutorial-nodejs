const newTodoHandler = (e) => {
    if (e.keyCode == 13) { // Enter Key
        addTodo();
    }
};

const setEventListeners = () => {
    $('.new-todo').on('keypress', newTodoHandler);
    $('.destroy').on('click', deleteTodo);
    $('.duplicate').on('click', duplicateTodo);
    $('.todo-label').on('dblclick', updateTodo);
    $('.toggle').on('change', updateTodo);
    $('.toggle-all').on('change', toggleAll);
    $('.clear-completed').on('click', clearCompleted);
};

$().ready(() => {
    setEventListeners();
});