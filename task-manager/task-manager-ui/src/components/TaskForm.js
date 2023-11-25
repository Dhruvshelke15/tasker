import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TaskFormWrapper = styled.div`
  max-width: 600px;
  margin: auto;
`;


const Form = styled.form`
  background-color: #A6CF98;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;


const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/tasks', { title, description, completed });
      window.location.reload();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
        <TaskFormWrapper>

      <h2>Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Title:
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Label>
        <br />
        <Label>L
          Description:
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Label>
        <br />
        <Label>
          Completed:
          <Input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        </Label>
        <br />
        <button type="submit" onClick={handleSubmit}>Create Task</button>
      </Form>
        </TaskFormWrapper>
    </div>
  );
};

export default TaskForm;
