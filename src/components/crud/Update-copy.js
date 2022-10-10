import React, { useEffect, useState } from 'react'
import { Form, Icon, Input } from 'semantic-ui-react'
import axios from 'axios';
//import Select from 'react-select';
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateE() {

  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState();
  // const [ID, SetID] = useState();
  const { id } = useParams();

  // SET DATA
  //  const setData = (data) => {
  //    let { id: contact, content, status } = data
  //    localStorage.setItem("id", id);
  //    localStorage.setItem('type', type);
  //    localStorage.setItem('contact', contact);
  //    localStorage.setItem('content', content);
  //    localStorage.setItem('status', status);
  //  }
  //

  //useEffect(() => {
  //  SetID(localStorage.getItem("id", id));
  //  setType(localStorage.getItem('type', type));
  //  setContact(localStorage.getItem('contact', contact));
  //  setContent(localStorage.getItem('content', content));
  //  setContent(localStorage.getItem('status', status));
  //}, [id])

  let navigate = useNavigate();

  // API PUT DATA
  const updateHandler = (e) => {

    e.preventDefault();
    const newData = {
      type: type,
      contact: contact,
      content: content,
      status: status,
    }
    axios.put(`https://localhost:7250/api/notifications/${id}`, newData)
      .then(function (response) {
        // console.log(response)
      })
      .catch(function (error) {
        console.log(error.response)
      });
    navigate("/")
    console.log(`item  ${id} updated`)
  }

  // API GET ID TO UPDATE
  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(`https://localhost:7250/api/notifications/${id}`)
      setType(data.type)
      setContact(data.contact)
      setContent(data.content)
      setStatus(data.status)
    }
    getDataById()
  }, [id])

  // SELECT OPTIONS
  // const nOptions = [
  //   { key: 'SMS', label: 'SMS', value: 'SMS' },
  //   { key: 'Email', label: 'Email', value: 'Email' },
  // ]
  // const handleChange = (selectedOption) => {
  //   setType(selectedOption.value)
  // }


  return (
    <div className='create'>
      <h3>Update</h3>
      <Form key={id} onSubmit={updateHandler}>
        <p><strong>Type</strong></p>
        <Input
          placeholder='Notification Type'
          value={type}
          //options={nOptions}
          required
          //onChange={handleChange}
          className="optionStyle" />
        <Form.Group widths='equal'>
          <Form.Input
            input="text"
            value={contact}
            onChange={(e) => { setContact(e.target.value) }}
            fluid label='Contact'
            required
            placeholder='Contact send to:' />
        </Form.Group>
        <Form.TextArea
          input="text"
          value={content}
          onChange={(e) => { setContent(e.target.value) }}
          label='Content'
          required
        />
        <Form.Field value={status}>
          Status: {status === true ?
            <Icon className='checkmark' name='checkmark'>Sent </Icon> :
            <Icon className='attention' name='attention'>  Not Sent </Icon>}
        </Form.Field>
        <Form.Button
          type='submit'
        >
          Update
        </Form.Button>
      </Form>
    </div>
  )
}
