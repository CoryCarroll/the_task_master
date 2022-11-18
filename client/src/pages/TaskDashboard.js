import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteTask } from '../utils/API';
import Auth from '../utils/auth';
// import { removeTaskId } from '../utils/localStorage';

const SavedTask = () => {
  const [userData, setUserData] = useState({});

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
};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteTask = async (taskId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteTask(taskId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      // removeTaskId(taskId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteTask = async (taskId) => {
    // TODO complete task button logic 
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
  //     // upon success, remove book's id from localStorage
  //     removeTaskId(taskId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedTasks.length
            ? `Viewing ${userData.savedTasks.length} saved ${userData.savedTasks.length === 1 ? 'task' : 'tasks'}:`
            : 'You have no saved tasks!'}
        </h2>
        <CardColumns>
          {userData.savedTasks.map((book) => {
            return (
              <Card key={task.taskId} border='dark'>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <p className='small'> {task.createdAt}</p>
                  <p className='small'> {task.deadline}</p>
                  <Button className='btn btn-primary Complete' onClick={() => handleCompleteTask(task.taskId)}>
                  </Button>
                  <Card.Text>{book.deadline}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteTask(task.taskId)}>
                    Delete this Task!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default savedTask;
