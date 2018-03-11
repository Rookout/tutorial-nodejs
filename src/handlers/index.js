exports.Home = async (req, res, next) => {
    let count = {};
    let filter = 'all';
    const allTodos = await global.Store.findAll();
    const activeTodos = await global.Store.find({completed: false});
    const completedTodos = await global.Store.find({completed: true});
    let shownTodos = allTodos;
    count.all = shownTodos.length;
    count.completed = completedTodos.length;
    count.active = activeTodos.length;
    let countLabel = count.all + ' Tasks Total';
    if (req.params.shown) {
      switch (req.params.shown) {
        case "active":
          shownTodos = activeTodos;
          countLabel = count.active + ' Active Tasks';
          filter = 'active';
          break;
        case "completed":
          shownTodos = completedTodos;
          countLabel = count.completed + ' Completed Tasks';
          filter = 'completed';
          break;
        case "all":
        default:
          shownTodos = allTodos;
          countLabel = count.all + ' Tasks Total';
          filter = 'all';
          break;
      }
    }
    res.render('index', {shownTodos: shownTodos, filter: filter, count: count, countLabel: countLabel})
}
