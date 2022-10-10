import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import 'yup-phone';

export default function UpdateE() {

  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState();

  // validations schema for the notification form
  const notificationSchema = yup.object().shape({
    //type: yup.string().required("please choose what type of notification is needed"),
    content: yup.string().min(20).max(100).required("please enter some info"),
    status: yup.bool(),
    contact: yup.string("Enter your Email/Phone Number")
      .required("Email/Phone Number is required")
      .test('test-name', 'Enter Valid Phone/Email',
        function (value) {  // eslint-disable-next-line
          const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          const phoneRegex = /^([9][1236\s])[0-9\s]*$/;
          let isValidEmail = emailRegex.test(value);
          let isValidPhone = phoneRegex.test(value);
          if (!isValidEmail && !isValidPhone) {
            return false;
          }
          return true;
        }),
  });

  const { id } = useParams();

  let navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(notificationSchema),
  });

  const onSubmit = (data) => {
    //console.log(data);
    updateHandler();
  };

  // API PUT DATA
  const updateHandler = (e) => {
    // e.preventDefault();
    const newData = {
      type: type,
      contact: contact,
      content: content,
      status: status,
    }
    axios.put(`https://notificationsapi2022.azurewebsites.net/api/notifications/${id}`, newData)
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
      const { data } = await axios.get(`https://notificationsapi2022.azurewebsites.net/api/notifications/${id}`)
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
    <React.Fragment>
      <div className='create' >
        <button className='back-btn' onClick={() => navigate(-1)} >Back</button>
        <div className='ui form' >
          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
            <label>
              Type:
              <select
                value={type}
                className="optionStyle"
                type="text"
                required
                {...register("type", { required: true })}
                onChange={(e) => { setType(e.target.value) }}
                placeholder='type'
              >
                <option className='option' value=""> Notification Type |</option>
                <option className='option' value="SMS">SMS</option>
                <option className='option' value="Email">Email</option>
              </select>
            </label>
            <p>{errors.type?.message}</p>
            <br />
            {/*    { type === "SMS" ? <Phone/> : <Mail/> } / */}
            <br />
            {type === "SMS" && (
              <>
                <label>
                  Contact (<small><i>phone</i></small>) :
                </label>
                <input
                  value={contact}
                  type="text"
                  {...register("contact", { required: true })} //
                  placeholder='Phone contact'
                  onChange={(e) => { setContact(e.target.value) }}
                />
                <p>{errors.contact?.message}</p>
              </>
            )}
            {type === "Email" && (
              <>
                <label>
                  Contact (<small><i>email</i></small>) :
                </label>
                <input
                  value={contact}
                  type="text"
                  {...register("contact", { required: true })} //
                  placeholder='Email contact'
                  onChange={(e) => { setContact(e.target.value) }}
                />
                <p>{errors.contact?.message}</p>
              </>
            )}
            <br />
            <label>
              Content:
            </label>
            <br />
            <textarea
              value={content}
              type="text"
              {...register("content", { required: true })} //
              placeholder='Send notification about...'
              onChange={(e) => { setContent(e.target.value) }}
            ></textarea>
            <p>{errors.content?.message}</p>
            <br />
            <button type="submit" >Update</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
