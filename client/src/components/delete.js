// import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';

// import { deleteTask } from '../utils/API';

// function DeleteButton() {
//     const [taskData, setTaskData] = useState({});

//     const handleOnChange = (event) => {
//         console.log(event.target.id);
//         setTaskData({
//           ...taskData,
//           [event.target.id]: event.target.value
//         })
//     }


//     const handleDeleteTask = async (taskId) => {
//         const response = await deleteTask(taskId)

//   return (

// <Button className='btn-block btn-danger' onClick={handleDeleteTask(taskData.taskId)}>
// Delete this taskData!
// </Button>
//         )
//     }
// }

// export default DeleteButton;