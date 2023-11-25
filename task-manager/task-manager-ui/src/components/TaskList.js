import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TaskListWrapper = styled.div`
  max-width: 600px;
  margin: auto;
`;

const TaskItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  background-color: ${(props) => (props.completed ? '#557C55' : '#FA7070')};

  strong {
    font-size: 1.2em;
    color: #333;
  }
  button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
  }
`;

export { TaskListWrapper, TaskItem };

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the server
    axios.get('http://localhost:3000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
        <TaskListWrapper>

      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
            <TaskItem key={task.id} completed={task.completed}>
                <div>

                <strong>{task.title}</strong><p>Description: {task.description}</p>
            Status: {task.completed ? 'Completed' : 'Incomplete'}
                </div>
                <div>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </TaskItem>
        ))}
      </ul>
        </TaskListWrapper>
    </div>
  );
};

export default TaskList;
