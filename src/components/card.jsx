import React, { useState,useEffect } from 'react';
import { Card, Button, Input, Pagination, Space, Modal, Form, Switch } from 'antd';
import '../components/card.css';
import { FaRegEdit } from 'react-icons/fa';
import { DeleteOutlined } from '@ant-design/icons';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
const Cards = ({todoss}) => {
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [todos, setTodos] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [selectedTodo, setSelectedTodo] = useState(null);
//   const [form] = Form.useForm();
//   const baseURL = "https://jsonplaceholder.typicode.com/todos";

//   const todosPerPage = 10;

//   const showEditModal = (todo) => {
//     setSelectedTodo(todo);
//     form.setFieldsValue({
//       title: todo.title,
//       completed: todo.completed,
//     });
//     setIsEditModalVisible(true);
//   };

//   const handleEditOk = () => {
//     form.submit();
//   };

//   const handleEditCancel = () => {
//     setIsEditModalVisible(false);
//   };

//   const onFinish = (values) => {
//     handleUpdate(selectedTodo.id, values.title, values.completed);
//     setIsEditModalVisible(false);
//   };
//   useEffect(() => {
//     fetchData();
//   }, [currentPage]); // Fetch data when currentPage changes

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${baseURL}?_page=${currentPage}&_limit=${todosPerPage}`);
//       setTodos(response.data);
//       const totalCount = Number(response.headers['x-total-count']);
//       setTotalPages(Math.ceil(totalCount / todosPerPage));
//     } catch (error) {
//       console.error('Error fetching todos', error);
//     }
//   };

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected + 1);
//   };
const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Change to 0 initially
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
const[loading,setLoading]=useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [form] = Form.useForm();
  const baseURL = "https://jsonplaceholder.typicode.com/todos";

  useEffect( () => {
     axios.get(`${baseURL}`)
    .then((res) => {
      
      const totalCount = Number(res.headers["x-total-count"]);
      setTotalPages(Math.ceil(totalCount / todosPerPage));
    })
    .catch((error) => {
      console.error('Error fetching todos', error);
    });

  }, []);
  useEffect(()=>{
    todoss.map((todo)=>{
        setTodos([...todos, todo]);
        console.log(todo)
    })
   
    console.log(todos)
  },[todoss])
  const showEditModal = (todo) => {
    setSelectedTodo(todo);
    form.setFieldsValue({
      title: todo.title,
      completed: todo.completed,
    });
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    form.submit();
  };
  const handleOk = () => {
    setIsLoading(true);
};
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setIsLoading(true)
  };
  const onFinish = (values, completed) => {
    setIsLoading(true)
    handleUpdate(selectedTodo.id, values.title, completed);
  };
  

  useEffect(() => {
    setLoading(true)
    fetchData();
    setLoading(false)
  }, [currentPage]); // Fetch data when currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}?_page=${currentPage}&_limit=${todosPerPage}`);
      setTodos(response.data);
      const totalCount = Number(response.headers['x-total-count']);
      setTotalPages(Math.ceil(totalCount / todosPerPage)); // Calculate totalPages dynamically
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDelete = (id) => {
    axios.delete(`${baseURL}/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        // getData();

      })
      .catch((error) => {
        console.error('Error deleting todo', error);
      });
  };

  const handleUpdate = (id, updatedTitle,completed) => {
      axios.put(`${baseURL}/${id}`, { title: updatedTitle, completed })
      .then(() => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title: updatedTitle, completed } : todo));
        setIsEditModalVisible(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error updating todo', error);
      });
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);
  return (
    <>
      <Space loading direction="horizontal" size={16} wrap>
        {incompleteTodos.map((todo) => (
          <Card loading={loading}
            key={todo.id}
            size="small"
            title="Incomplete Task"
            style={{
              width: 300,
             borderColor:'black'
            }}
          >
            <div id="card-body">
              <p className="title">{todo.title}</p>
              <FaRegEdit
                style={{ fontSize: '24px' }}
                className="edit"
                onClick={() => showEditModal(todo)}
              />
              <DeleteOutlined
                className="delete"
                style={{ fontSize: '24px' }}
                onClick={() => handleDelete(todo.id)}
              />
            </div>
          </Card>
        ))}
      </Space>
      <Space className="card" direction="horizontal" size={16} wrap style={{marginTop:20}}>
        {completedTodos.map((todo) => (
          <Card
            
            key={todo.id}
            size="small"
            title="Completed Task"
            style={{
              width: 300,
              marginLeft: 10,
              borderColor:'black'
            }}
          >
            <div id="card-body">
              <p className="title">{todo.title}</p>
              <FaRegEdit
                style={{ fontSize: '24px' }}
                className="edit"
                onClick={() => showEditModal(todo)}
              />
              <DeleteOutlined
                className="delete"
                style={{ fontSize: '24px' }}
                onClick={() => handleDelete(todo.id)}
              />
            </div>
          </Card>
        ))}
      </Space>
      <Pagination
      className='page'
        current={currentPage}
        pageSize={todosPerPage}
        total={200} // Set total to totalPages
        showSizeChanger={true}
        pageSizeOptions={['5','10', '15','20','25', '30','40','50','100']}
        onChange={handlePageChange}
        onShowSizeChange={(currentPage, size) => {
            // Update todosPerPage and fetch data based on new page size
            setTodosPerPage(size);
            setCurrentPage(1); // Reset to first page when changing page size
          }}
      />
      <Modal
        title="Edit Task"
        open={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => onFinish(values, values.completed)}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Completed"
            name="completed"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
          {isLoading? <Button type="primary" loading className='edit-loading' onClick={handleOk}>
              Editing
            </Button> :<Button type="primary" htmlType="submit" className='edit-btn'>
              Edit
            </Button>}
            
            <Button className='card-cancel' onClick={handleEditCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Cards;
