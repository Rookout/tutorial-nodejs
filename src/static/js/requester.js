/* eslint no-undef: 0, no-unused-vars: 0, no-restricted-globals: 0 */
const onAddTodo = (e) => {
  if (e.keyCode === 13) { // Enter Key
    const input = $('.new-todo');
    const title = input.val();
    $.ajax('/todos', {
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify({ title }),
      dataType: 'json',
    })
      .done(() => {
        location.reload();
      });
  }
};

const onDeleteTodo = (e) => {
  const todoId = $(e.target.parentElement.parentElement).data('id');
  $.ajax(`/todos/${todoId}`, {
    method: 'DELETE',
  })
    .done(() => {
      location.reload();
    });
};

const onDuplicateTodo = (e) => {
  const todoId = $(e.target.parentElement.parentElement).data('id');
  $.ajax(`/todos/duplicate/${todoId}`, {
    method: 'POST',
  })
    .done(() => {
      location.reload();
    });
};

const getTodoData = (todoElement) => {
  const title = todoElement.find('.edit').val();
  const completed = todoElement.find('.toggle').is(':checked');
  const id = todoElement.data('id');
  return { id, title, completed };
};

const sendUpdateRequest = (newData) => {
  $.ajax(`/todos/${newData.id}`, {
    contentType: 'application/json',
    method: 'PUT',
    data: JSON.stringify({ title: newData.title, completed: newData.completed }),
    dataType: 'json',
  })
    .done(() => {
      location.reload();
    });
};

const onUpdateTodo = (e) => {
  if ($(e.target).hasClass('todo-label')) {
    const todoElement = $(e.target.parentElement.parentElement);
    const editingElement = $(e.target.parentElement.nextElementSibling);
    todoElement.addClass('editing');
    editingElement.focus();
    const inputLength = editingElement.val().length;
    editingElement[0].setSelectionRange(inputLength, inputLength); // Focusing on end of input
    $(editingElement).on('keydown', (kbEvent) => {
      if (kbEvent.keyCode === 27) { // Escape Key - Cancel action
        $('.editing').removeClass('editing');
      }
    });
    $(editingElement).on('keypress', (kbEvent) => {
      if (kbEvent.keyCode === 13) { // Enter Key - Confirm action
        const contextTodoElement = $(kbEvent.target.parentElement);
        const newData = getTodoData(contextTodoElement);
        sendUpdateRequest(newData);
      }
    });
  } else if ($(e.target).hasClass('toggle')) {
    const todoElement = $(e.target.parentElement.parentElement);
    const newData = getTodoData(todoElement);
    sendUpdateRequest(newData);
  }
};

const onToggleAll = () => {
  $.ajax('/todos/toggleall', {
    method: 'POST',
  })
    .done(() => {
      location.reload();
    });
};

const onClearCompleted = () => {
  $.ajax('/todos/clear', {
    method: 'POST',
  })
    .done(() => {
      location.reload();
    });
};
