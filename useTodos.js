import { useEffect, useReducer } from "react"
import { todoReducer } from "./../08-reducer/todoReducer";

const init = () => {
    return JSON.parse( localStorage.getItem('todos'))||[];
};

export const useTodos = (inicialState=[]) => {

    const [todos, dispatch] = useReducer( todoReducer, inicialState, init);

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos || []));
    }, [todos])

    const handleNewTodo = (todo) => {
        const action = {
            type:'[TODO] add todo',
            payload: todo
        };
        dispatch(action);
    }

    const handleDeleteTodo = ( id ) => {
        const action = {
            type:'[TODO] Remove todo',
            payload: id
        };
        dispatch(action);
    };

    const handleToggleTodo = ( id ) => {
        const action = {
            type:'[TODO] Toggle todo',
            payload: id
        };
        dispatch(action);
        console.log(id)
    };
        
    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        pedingTodosCount: todos.filter( todo => !todo.done).length,
        todosCount: todos.length
    }
}