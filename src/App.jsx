import {useState} from 'react';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setTodoList(prev => {
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: newTodo,
          checked: false
        }
      ];
    });
    setNewTodo('');
  };

  const toggleTodo = (id, checked) => {
    setTodoList(prev => {
      return prev.map(todo => {
        if (todo.id === id) {
          return {...todo, checked};
        }
        return todo;
      });
    });
  };

  const deleteTodo = id => {
    setTodoList(prev => {
      return prev.filter(todo => todo.id !== id);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo">New Todo</label>
        <br />
        <input type="text"
               id='newTodo'
               value={newTodo}
               onChange={e => setNewTodo(e.target.value)} />
        <br />
        <br />
        <button>Add</button>
      </form>
      <h1>Todo List</h1>
      <ul>
        {todoList.length === 0 && <p>No todos</p>}
        {todoList.map(todo => {
          return  <li key={todo.id}>
                    <label>
                      <input type="checkbox"
                             checked={todo.checked}
                             onChange={e => toggleTodo(todo.id, e.target.checked)} />
                      {todo.text}
                    </label>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </li>
        })}
      </ul>
    </>
  );
};

export default App;
