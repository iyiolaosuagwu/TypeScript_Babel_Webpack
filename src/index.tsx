import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { filter } from 'minimatch';

type FormEl = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>();
  const [todos, setTodos] = useState<ITodo[]>([]);
  // debugger;

  const handleSubmit = (e: FormEl): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: any): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodos = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodoList = (): void => {};

  console.log(todos);

  return (
    <Fragment>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type='submit'>Add Todo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <Fragment key={index}>
            <div
              style={{ textDecoration: todo.complete ? 'line-through' : '' }}
            >
              {todo.text}
            </div>
            <button type='button' onClick={() => completeTodo(index)}>
              {' '}
              {todo.complete ? 'Incomplete' : 'Complete'}
            </button>
            <button type='button' onClick={() => removeTodos(index)}>
              remove
            </button>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
}

const root = document.getElementById('app-root');

ReactDOM.render(<App />, root);
