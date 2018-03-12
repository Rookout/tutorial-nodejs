const getHomeCompletedData = async () => {
    const completedTodos = await global.Store.find({completed: true});
    const shownTodos = completedTodos;
    const countLabel = completedTodos.length + ' Completed Tasks';
    return {shownTodos, countLabel, shownFilter: 'completed'};
};

const getHomeData = async () => {
    const allTodos = await global.Store.findAll();
    const shownTodos = allTodos;
    const countLabel = allTodos.length + ' Tasks Total';
    return {shownTodos, countLabel, shownFilter: 'all'};
};

const getHomeActiveData = async () => {
    const activeTodos = await global.Store.find({completed: false});
    const shownTodos = activeTodos;
    const countLabel = activeTodos.length + ' Active Tasks';
    return {shownTodos, countLabel, shownFilter: 'active'};
};

module.exports.HomeProvider = shownFilter => {
    return new Promise((resolve, reject) => {
        switch (shownFilter) {
            case "active":
                resolve(getHomeActiveData());
            case "completed":
                resolve(getHomeCompletedData());
            case "all":
            default:
                resolve(getHomeData());
        }
    });
};