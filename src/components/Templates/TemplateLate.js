import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import 'yup-phone';


export default function TemplateBirthday() {

  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [content, setContent] = useState("Today I´ll be late, don´t wait for me to dinner");
  // const [status, setStatus] = useState();


  // validations schema for the notification form
  const notificationSchema = yup.object().shape({
    type: yup.string().required("please choose what type of notification is needed"),
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


  // HOOK FORM
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(notificationSchema),
  });

  const onSubmit = (data) => {
    //console.log(data);
    postData();
  };

  let navigate = useNavigate();

  // API POST DATA
  const postData = () => {
    axios.post("https://notificationsapi2022.azurewebsites.net/api/notifications", {
      type,
      contact,
      //contactPhone,
      content,
      // status
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
        <button className='back-btn' onClick={() => navigate(-1)} >Back</button>
        <div className='ui form' >
          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
            <label>
              Type:
              <select
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
            <p className='val-errors'>{errors.type?.message}</p>
            <br />
            {/*    { type === "SMS" ? <Phone/> : <Mail/> } / */}
            <br />
            {type === "SMS" && (
              <>
                <label>
                  Contact (<small><i>phone</i></small>) :
                </label>
                <input
                  type="text"
                  {...register("contact", { required: true })} //
                  placeholder='Phone contact'
                  onChange={(e) => { setContact(e.target.value) }}
                />
                <p className='val-errors'>{errors.contact?.message}</p>
              </>
            )}
            {type === "Email" && (
              <>
                <label>
                  Contact (<small><i>email</i></small>) :
                </label>
                <input
                  type="text"
                  {...register("contact", { required: true })} //
                  placeholder='Email contact'
                  onChange={(e) => { setContact(e.target.value) }}
                />
                <p className='val-errors'>{errors.contact?.message}</p>
              </>
            )}
            <br />
            <label>
              Content:
            </label>
            <br />
            <textarea
              type="text"
              value={content}
              {...register("content", { required: true })} //
              placeholder='Send notification about...'
              onChange={(e) => { setContent(e.target.value) }}
            ></textarea>
            <p className='val-errors'>{errors.content?.message}</p>
            <br />
            <button type="submit" >Send</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

