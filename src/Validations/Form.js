import React  from 'react'
//import axios from 'axios';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


export default function Form() {

   // const [type, setType] = useState("");
   // const [contact, setContact] = useState("");
   // const [content, setContent] = useState("");

    // validations schema for the notification form
    const notificationSchema = yup.object().shape({
        type: yup.string().required("please choose what type of notification is needed"),
        contact: yup.string().email().required("there has to be a contact"),
        content: yup.string().min(25).max(100).required("please enter some info"),
        status: yup.bool()
    });

    // HOOK FORM
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(notificationSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

  
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Type:
                <select
                    type="text"
                    {...register("type", { required: true })}
                    // onChange={handleChange}
                    placeholder='type'
                    className="optionStyle">
                    <option value="SMS">SMS</option>
                    <option value="Email">Email</option>
                </select>
                </label>
                <p>{errors.type?.message}</p>  
                <br/>
                <label>
                    Contact:
                <input
                    type="text"
                    {...register("contact", { required: true })} //
                    placeholder='contact'
                    //onChange={(e) => { setContact(e.target.value) }}
                     />
                </label>
                       <p>{errors.contact?.message}</p>  
                    <br/>
                    <label>
                    Content:
                <textarea
                    type="text"
                    {...register("content", { required: true })} //
                    placeholder='Send notification about...'
                    //onChange={(e) => { setContact(e.target.value) }}
                    ></textarea>
                    </label>
                     <p>{errors.content?.message}</p>   
                    <br/>
                <input type="submit" />
            </form>
        </div>
    )
}
