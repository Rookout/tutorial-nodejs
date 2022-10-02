/* eslint no-undef: 0 */
const setEventListeners = () => {
  $('.new-todo').on('keypress', onAddTodo);
  $('.destroy').on('click', onDeleteTodo);
  $('.duplicate').on('click', onDuplicateTodo);
  $('.todo-label').on('dblclick', onUpdateTodo);
  $('.toggle').on('change', onUpdateTodo);
  $('.toggle-all').on('change', onToggleAll);
  $('.clear-completed').on('click', onClearCompleted);
  $('.clear-all-items').on('click', clearAllItems);
};

$(document).ready(() => {
  setEventListeners();
});
