import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling
import ReactPaginate from 'react-paginate';

const baseURL = "https://jsonplaceholder.typicode.com/todos";
const todosPerPage = 5;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [newId,setNewId]=useState(200)

  useEffect(() => {
    axios.get(`${baseURL}?_page=${currentPage}&_limit=${todosPerPage}`)
      .then((res) => {
        setTodos(res.data);
        const totalCount = Number(res.headers["x-total-count"]);
        setTotalPages(Math.ceil(totalCount / todosPerPage));
      })
      .catch((error) => {
        console.error('Error fetching todos', error);
      });
  }, [currentPage]);

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting todo', error);
      });
  };

  const handleUpdate = (id, updatedTitle) => {
    axios.put('https://jsonplaceholder.typicode.com/todos/{id}', { title: updatedTitle })
      .then(() => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title: updatedTitle } : todo));
      })
      .catch((error) => {
        console.error('Error updating todo', error);
      });
  };

  const handleCreate = (newTodo) => {
    axios.post(baseURL, { title: newTodo, completed: false,id:newId })
      .then((res) => {
        setTodos([...todos, res.data]);
        setNewId(prev=>prev+1);
      })
      .catch((error) => {
        console.error('Error creating todo', error);
      });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todo-container">
      <div className="todo-content">
        <h3 className="todo-header">Incomplete Tasks</h3>
        {incompleteTodos.map((todo) => (
          <div key={todo.id} className="todo-card">
            <div className="todo-card-header">
              {todo.title}
            </div>
            <div className="todo-card-body">
              <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
              <button className="btn btn-primary" onClick={() => handleUpdate(todo.id, prompt("Enter updated title", todo.title))}>Update</button>
            </div>
          </div>
        ))}
        <h3 className="todo-header">Completed Tasks</h3>
        {completedTodos.map((todo) => (
          <div key={todo.id} className="todo-card">
            <div className="todo-card-header">
              {todo.title}
            </div>
            <div className="todo-card-body">
              <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
              <button className="btn btn-primary" onClick={() => handleUpdate(todo.id, prompt("Enter updated title", todo.title))}>Update</button>
            </div>
          </div>
        ))}
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< Previous"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>
      <div className="todo-sidebar">
        <h3 className="todo-header">Add New Todo</h3>
        <div className="todo-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter new todo"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreate(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
          <button className="btn btn-success" onClick={() => handleCreate(document.querySelector('.form-control').value)}>Add Todo</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
