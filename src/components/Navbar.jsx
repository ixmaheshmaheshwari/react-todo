import { useState, useEffect } from 'react';
import '../components/Navbar.css';
import { Button, Modal, Form, Input,InputNumber,Flex } from 'antd';
import axios from 'axios';

const Navbar = ({ onTodoCreated }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const baseURL = "https://jsonplaceholder.typicode.com/todos";

    // const handleCreate = (values) => {
    
    //     axios.post(baseURL, { title: values.title, completed: false, id: values.Id, userId: 201 })
    //       .then((res) => {
    //         setTodos([...todos, res.data]);
    //         setIsModalOpen(false);

    //         // getData();
    //        })
    //       .catch((error) => {
    //         console.error('Error creating todo', error);
    //       });
    //   };
      const handleCreate = (values) => {
        axios
          .post(baseURL, { title: values.title, completed: false, id: values.ID, userId: 201 })
          .then((res) => {
            const newTodo = res.data;
            
            setIsModalOpen(false);
            onTodoCreated(newTodo); // Pass the new todo to the parent component
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error creating todo', error);
          });
      };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
     
    setIsLoading(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (value) => {
    console.log('changed', value);
  };
  const onFinish = async (values) => {
    // Set loading state to true when API call starts
    console.log(values)
    setIsLoading(true);
    await handleCreate(values);
     // Set loading state to false when API call is done
   
};
  return (

    <>
    <div className='header'>
        <div className='img'>
        <img src="./src/components/icons8-todo-list.gif"  className='image'></img>
    <h2>To-Do Tasks</h2>
        </div>
<div>
<Button type="primary" onClick={showModal} >
          Add New Task
        </Button>
</div>
        
    </div>
    
    <Modal
          title="Add ToDo"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={onFinish}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter the title' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="ID"
              name="ID"
              rules={[{ required: true, message: 'Please enter the Id' }]}
            >
              <InputNumber min={201}   onChange={onChange} />
            </Form.Item>
            <Form.Item>
            <Flex gap="5" horizontal="true">
                {isLoading? <Button type="primary" loading className='add-loading'>
          Adding
        </Button> :<Button type="primary" size='small' htmlType="submit" onClick={handleOk} className='add'>
                            Add
                        </Button>}
                        <Button type="primary" size='small' htmlType="submit" onClick={handleCancel} className='cancel'>
                            Cancel
                        </Button>
                        </Flex>
                        
            </Form.Item>
          </Form>
        </Modal>
    </>
  )
}

export default Navbar