const addTodo = () => {
    const input = $('.new-todo');
    const title = input.val();
    $.ajax('/todos', {
        contentType: "application/json",
        method: 'POST',
        data: JSON.stringify({title: title}),
        dataType: 'json'
    })
    .done(function() {
        location.reload();
    });
}

const deleteTodo = (e) => {
    const todoId = $(e.target.parentElement.parentElement).data('id');
    $.ajax('/todos/' + todoId, {
        method: 'DELETE'
    })
    .done(function() {
        location.reload();
    });
}

const duplicateTodo = (e) => {
    const todoId = $(e.target.parentElement.parentElement).data('id');
    $.ajax('/todos/duplicate/' + todoId, {
        method: 'POST'
    })
    .done(function() {
        location.reload();
    });
}

const getTodoData = (todoElement) => {
    const title = todoElement.find('.edit').val();
    const completed = todoElement.find('.toggle').is(':checked');
    const id = todoElement.data('id');
    return {id: id, title: title, completed: completed};
}

const sendUpdateRequest = (newData) => {
    $.ajax('/todos/' + newData.id, {
        contentType: "application/json",
        method: 'PUT',
        data: JSON.stringify({title: newData.title, completed: newData.completed}),
        dataType: 'json'
    })
    .done(function() {
        location.reload();
    });
}

const updateTodo = (e) => {
    if ($(e.target).hasClass('todo-label')) {
        const todoElement = $(e.target.parentElement.parentElement);
        todoElement.addClass('editing');
        const editingElement = $(e.target.parentElement.nextElementSibling);
        editingElement.focus();
        const inputLength = editingElement.val().length;
        editingElement[0].setSelectionRange(inputLength, inputLength); // Focusing on end of input
        $(editingElement).on('keydown', (e) => {
            if (e.keyCode == '27') { // Escape Key - Cancel action
                $('.editing').removeClass('editing');
            }
        });
        $(editingElement).on('keypress', (e) => {
            if (e.keyCode == '13') { // Enter Key - Confirm action
                const todoElement = $(e.target.parentElement);
                const newData = getTodoData(todoElement);
                sendUpdateRequest(newData);
            }
        });
    } else if ($(e.target).hasClass('toggle')) {
        const todoElement = $(e.target.parentElement.parentElement);
        const newData = getTodoData(todoElement);
        sendUpdateRequest(newData);
    }
}

const toggleAll = () => {
    $.ajax('/todos/toggleall', {
        method: 'POST'
    })
    .done(function() {
        location.reload();
    });
}

const clearCompleted = () => {
    $.ajax('/todos/clear', {
        method: 'POST'
    })
    .done(function() {
        location.reload();
    });
}