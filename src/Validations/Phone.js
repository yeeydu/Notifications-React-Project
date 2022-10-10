import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'yup-phone';


export default function Phone() {

  const [type, setType] = useState("SMS");
  const [contact, setContact] = useState();
  const [content, setContent] = useState("");


  // validations schema for the notification form
  const notificationSchema = yup.object().shape({

    contact: yup.string().matches(/^([9][1236\s])[0-9\s]*$/, "Please enter a valid phone number ex.(91 - 92 - 93 - 96)").required("A phone number is required"),
    content: yup.string().min(20).max(100).required("please enter some info"),
    status: yup.bool()
  });


  // HOOK FORM
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(notificationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    postData();
  };

  let navigate = useNavigate();

  // API POST DATA
  const postData = () => {
    axios.post("https://localhost:7250/api/notifications", {
      type,
      contact,
      content,
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


  return (
    <React.Fragment>
      <div className='create' >
        <div className='ui form' >
          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
            <label>
              Contact (<small><i>phone</i></small>) :
            </label>
            <br />
            <input
              type="text"
              //required
              {...register("contact", { required: true })} //
              placeholder='Phone contact'
              onChange={(e) => { setContact(e.target.value) }}
            />
            <p>{errors.contact?.message}</p>
            <br />
            <label>
              Content:
            </label>
            <br />
            <textarea
              type="text"
              {...register("content", { required: true })} //
              placeholder='Send notification about...'
              onChange={(e) => { setContent(e.target.value) }}
            ></textarea>
            <p>{errors.content?.message}</p>
            <br />
            <button type="submit" >Send</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
