/* eslint no-undef: 0, no-unused-vars: 0, no-restricted-globals: 0 */

const reloadOnDone = action =>
  action.done(() => {
    location.reload();
  })
    .catch(console.log);


const onAddTodo = (e) => {
  if (e.keyCode === 13) { // Enter Key
    const input = $('.new-todo');
    const title = input.val();

    const action = $.ajax('/todos', {
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify({ title }),
      dataType: 'json',
    });

    reloadOnDone(action);
  }
};

const onDeleteTodo = (e) => {
  const todoId = $(e.target.parentElement.parentElement)
    .data('id');

  const action = $.ajax(`/todos/${todoId}`, {
    method: 'DELETE',
  });

  reloadOnDone(action);
};

const onDuplicateTodo = (e) => {
  const todoId = $(e.target.parentElement.parentElement)
    .data('id');

  const action = $.ajax(`/todos/${todoId}/duplicate`, {
    method: 'POST',
  });

  reloadOnDone(action);
};

const getTodoData = (todoElement) => {
  const title = todoElement.find('.edit')
    .val();
  const completed = todoElement.find('.toggle')
    .is(':checked');
  const id = todoElement.data('id');
  return {
    id,
    title,
    completed,
  };
};

const sendUpdateRequest = (newData) => {
  const action = $.ajax(`/todos/${newData.id}`, {
    contentType: 'application/json',
    method: 'PUT',
    data: JSON.stringify({
      title: newData.title,
      completed: newData.completed,
    }),
    dataType: 'json',
  });

  reloadOnDone(action);
};

const onUpdateTodo = (e) => {
  if ($(e.target)
    .hasClass('todo-label')) {
    const todoElement = $(e.target.parentElement.parentElement);
    const editingElement = $(e.target.parentElement.nextElementSibling);
    todoElement.addClass('editing');
    editingElement.focus();
    const inputLength = editingElement.val().length;
    editingElement[0].setSelectionRange(inputLength, inputLength); // Focusing on end of input

    $(editingElement)
      .on('keydown', (kbEvent) => {
        if (kbEvent.keyCode === 27) { // Escape Key - Cancel action
          $('.editing')
            .removeClass('editing');
        }
      });

    $(editingElement)
      .on('keypress', (kbEvent) => {
        if (kbEvent.keyCode === 13) { // Enter Key - Confirm action
          const contextTodoElement = $(kbEvent.target.parentElement);
          const newData = getTodoData(contextTodoElement);

          sendUpdateRequest(newData);
        }
      });
  } else if ($(e.target)
    .hasClass('toggle')) {
    const todoElement = $(e.target.parentElement.parentElement);
    const newData = getTodoData(todoElement);

    sendUpdateRequest(newData);
  }
};

const onToggleAll = () => {
  const action = $.ajax('/todos/toggleall', {
    method: 'POST',
  });

  reloadOnDone(action);
};

const onClearCompleted = () => {
  const action = $.ajax('/todos', {
    method: 'DELETE',
  });

  reloadOnDone(action);
};


const clearAllItems = () => {
  const action = $.ajax("/todos/removeAll", {
    method: 'DELETE',
  });

  reloadOnDone(action);
};
