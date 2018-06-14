const host = 'http://60.205.141.116:';
const port = 60002;

const loginURL = host+port+'/api/login';
const registerURL = host+port+'/api/register';
const postTodoItemURL = host+port+'/api/postTodoItem';
const updateTodoItemURL = host+port+'/api/updateTodoItem';
const deleteTodoItemURL = host+port+'/api/deleteTodoItem';
const getTodoItemsURL = host+port+'/api/getTodoItems';
const finishTodoItemURL = host+port+'/api/finishTodoItem';

export {
    loginURL,
    registerURL,
    postTodoItemURL,
    updateTodoItemURL,
    deleteTodoItemURL,
    getTodoItemsURL,
    finishTodoItemURL
}