import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';


export default function Template1() {

  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [content, setContent] = useState("");
  // const [status, setStatus] = useState();


  // HOOK FORM
  const createNotification = (event, selectedOption) => {
    event.preventDefault();
    let formData = {
      type,
      contact: event.target[1].value,
      content: event.target[2].value,
      status: event.target[3].value,
    };
    postData();
    console.log(formData);
  };

  let navigate = useNavigate();
  // API POST DATA
  const postData = () => {
    axios.post("https://notificationsapi2022.azurewebsites.net/api/notifications", {
      type,
      contact,
      content,
      //  status
    }, {
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      // console.log(response)
    }).catch(error => {
      console.log(error.response)
    }).then(() => {
      navigate("/")
    });
    console.log(`new item created `);
  }

  // SELECT OPTIONS
  const nOptions = [
    { key: 'SMS', label: 'SMS', value: 'SMS' },
    { key: 'Email', label: 'Email', value: 'Email' },
  ]
  const handleChange = (selectedOption) => {
    setType(selectedOption.value)
  }

  return (
    <div className='create'>
      <Button onClick={() => navigate(-1)} > Back </Button>
      <h3>Happy Birthday</h3>
      <Form onSubmit={createNotification} >
        {/***** Select library for better result ***/}
        <p><strong>Type *</strong></p>
        <Select placeholder='Notification Type'
          options={nOptions}
          required
          onChange={handleChange}
          className="optionStyle" />
        <Form.Group widths='equal'>
          <Form.Input
            onChange={(e) => { setContact(e.target.value) }}
            fluid label='Contact'
            required
            placeholder='Contact send to:' />
        </Form.Group>
        <Form.TextArea
          onChange={(e) => { setContent(e.target.value) }}
          label='Content'
          required
          value={content}
          placeholder='Send notification about...' />
        <Form.Button
          type='submit' >
          Send
        </Form.Button>
      </Form>
    </div>
  )
}

