import React, { useState, useEffect } from 'react';
import { Container, Row, Card, Button, Form } from 'react-bootstrap';
import './TaskDash.css';
import { getMe, createTask, getTasks } from '../utils/API';
import Auth from '../utils/auth';


function TaskDash() {
  const [userData, setUserData] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: ""
  });

  const [checked, setChecked] = useState(
    new Array(userData.length).fill(false)
  );

  const handleChange = (task) => {
    const updatedCheckedState = checked.map((task, index) =>
      index === task ? !task : task
    );

    setChecked(updatedCheckedState);
  }
  
  
  const handleOnChange = (event) => {
    console.log(event.target.id);
    setTaskData({
      ...taskData,
      [event.target.id]: event.target.value
    })
  }

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  const createTaskData = async () => {
    console.log('Hello')
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        console.log('no token');
        return false;
      }

      const response = await createTask({...taskData, userId:userData._id}, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const createTasks = await response.json();
      setUserData(createTasks);

    } catch (err) {
      console.error(err);
    }
  };
  console.log("Hi")
  return (
    <>
      <Container>
        <h2 className='header'>
          Todays Tasks
        </h2>
        <Form>
          <textarea className="form-control" id="title" rows="3" title="This field is required" placeholder="Title" required onChange={handleOnChange}></textarea>
          <textarea className="form-control" id="description" rows="3" title="This field is required" placeholder="Description" onChange={handleOnChange}></textarea>
          <textarea className="form-control" id="deadline" rows="3" title="This field is required" placeholder="Deadline" onChange={handleOnChange}></textarea>
          <Button className='submitBtn' onClick={createTaskData}>
            Save
          </Button>
        </Form>
      </Container>
      <Row className='row' xs={1} md={2}>
        {console.log(userData)}
        {userData?.tasks?.map(( task ) => {
          return (
            <Card key={task._id} className='card' border='dark'>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <p className='small'>Authors: {task.description}</p>
                <Card.Text>{task.description}</Card.Text>
                <input
                  className='checkBox'
                  type="checkbox"
                  id={`custom-checkbox-${task}`}
                  checked={checked}
                  onChange={handleChange}
                />
                {/* <Button className='btn-block btn-danger' onClick={handleDeleteTask(taskData.taskId)}>
                    Delete this taskData!
                  </Button> */}
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </>
  )


  // create function that accepts the taskData's mongo _id value as param and deletes the taskData from the database
  // const handleDeleteTask = async (taskId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const response = await deleteTask(taskId, token);

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     const updatedUser = await response.json();
  //     setUserData(updatedUser);

  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // if data isn't here yet, say so
  // if (!userDataLength) {
  //   return <h2>LOADING...</h2>;
  // }
};

export default TaskDash;
