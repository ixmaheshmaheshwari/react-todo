import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Input, Pagination, Space, Modal, Form, Switch, Skeleton } from 'antd';
import '../components/card.css';
import { FaRegEdit } from 'react-icons/fa';
import { DeleteOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from './ThemeChanger';

const Cards = ({ todoss }) => {
const {toggle}=useContext(ThemeContext)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Change to 0 initially
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
  const [loading, setLoading] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [form] = Form.useForm();
  const baseURL = "https://jsonplaceholder.typicode.com/todos";
console.log(toggle)
  useEffect(() => {
    axios.get(`${baseURL}`)
      .then((res) => {

        const totalCount = Number(res.headers["x-total-count"]);
        setTotalPages(Math.ceil(totalCount / todosPerPage));
      })
      .catch((error) => {
        console.error('Error fetching todos', error);
      });

  }, []);
  useEffect(() => {
    todoss.map((todo) => {
      // toast.success('Task is successfully added.');
      setTodos([...todos, todo]);
      console.log(todo)
    })

    console.log(todos)
  }, [todoss])
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
    setIsLoading(false)
  };
  const onFinish = (values, completed) => {
    setIsLoading(true)
    setLoading(true)
    handleUpdate(selectedTodo.id, values.title, completed);
  };


  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  const fetchData = async () => {
    try {

      setLoading(true)
      const response = await axios.get(`${baseURL}?_page=${currentPage}&_limit=${todosPerPage}`);
      setTodos(response.data);

      const totalCount = Number(response.headers['x-total-count']);
      setTotalPages(Math.ceil(totalCount / todosPerPage)); // Calculate totalPages dynamically
      setLoading(false)
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
        toast.success('Task is successfully deleted')
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error deleting todo', error);
        toast.error('Error deleting task')
      });
  };

  const handleUpdate = (id, updatedTitle, completed) => {
    axios.put(`${baseURL}/${id}`, { title: updatedTitle, completed })
      .then(() => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title: updatedTitle, completed } : todo));
        setIsEditModalVisible(false);
        setIsLoading(false);
        setLoading(false)


        toast.success('Task is successfully edited')
      })

      .catch((error) => {
        setIsEditModalVisible(false);
        setIsLoading(false);
        console.error('Error updating todo', error);
        toast.error('Error updating todo')
      });
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);
  return (
    <>
      {loading ? <Skeleton active className={toggle} style={{
        height: 10,
        width: 298,
        marginLeft: 20
        
      }} > </Skeleton>
        :
        <Space loading direction="horizontal" size={16} wrap>
          {incompleteTodos.map((todo) => (
            <Card loading={loading}
              key={todo.id}
              title={<span style={{ color: '#ff0000' }}>Incompleted Task</span>}
              size="small"
              style={{
                width: 300,
                borderColor: 'black',
              }}
            
              className={toggle}
            >
              
              <div id="card-body">
              <p className={toggle}>{todo.title}</p>
                <FaRegEdit
                  style={{ fontSize: '24px' }}
                  className="edit"
                  onClick={() => showEditModal(todo)}
                />
                <DeleteOutlined
                  className="delete"
                  style={{ fontSize: '24px' }}
                  onClick={() => { setLoading(true); handleDelete(todo.id) }}
                />
              </div>
            </Card>
          ))}
        </Space>
      }
      {loading ? <Skeleton active style={{
        height: 10,
        width: 298,
        marginLeft: 20
      }} > </Skeleton>
        :
        <Space className="card" direction="horizontal" size={16} wrap style={{ marginTop: 20 }}>
          {completedTodos.map((todo) => (
            <Card
              loading={loading}
              key={todo.id}
              size="small"
              title={<span className={`title-${toggle}`} >Completed Task</span>}
              style={{
                width: 326,
                marginLeft: 10,
                borderColor: 'black'
              }}
              className={toggle}
            >
              <div id="card-body">
              <p className={toggle }>{todo.title}</p>
                <FaRegEdit
                  style={{ fontSize: '24px' }}
                  className="edit"
                  onClick={() => showEditModal(todo)}
                />
                <DeleteOutlined
                  className="delete"
                  style={{ fontSize: '24px' }}
                  onClick={() => { setLoading(true); handleDelete(todo.id) }}
                />
              </div>
            </Card>
          ))}
        </Space>
      }
      <Pagination
        className={`page-${toggle}`}
        current={currentPage}
        pageSize={todosPerPage}
        total={200} // Set total to totalPages
        showSizeChanger={true}
        pageSizeOptions={['5', '10', '15', '20', '25', '30', '40', '50', '100']}
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
        className={toggle}
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
            {isLoading ? <Button type="primary" loading className='edit-loading' onClick={handleOk}>
              Editing
            </Button> : <Button type="primary" htmlType="submit" className='edit-btn'>
              Edit
            </Button>}

            {/* Same as */}
            <Button className='card-cancel' onClick={handleEditCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* <ToastContainer
        position="top-right"
        // autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"

      /> */}
    </>
  );
};

export default Cards;
