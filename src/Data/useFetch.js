import axios from "axios";
import React, {useEffect, useState} from "react";


const useFetch = (url) => {

  const [data, setData] = useState([]);
  
 //const url = "https://localhost:7250/api/notifications"

 // API fetch
useEffect(() => {
  const getData = axios.get(url)
      .then((response) => {
          console.log(response.data);
          setData(response.data);
      }).catch(error => {
          console.log(error);
      })
    }, [setData]);
    
    return {data}
  }
  export default useFetch;




/*
 // API PUT DATA
 const updateHandler =  (e) => {
 
  e.preventDefault();
  const newData = {
    type: type,
    contact: contact,
    content: content,
    status: status,
   }
   axios.put(url/`${id}`, newData)
   .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error.response)
    })
    .catch(function (error) {
      console.log(error.response)
    });
  console.log(`item  ${id} updated`, newData)
  navigate("/")
}

 // API GET ID TO UPDATE
 useEffect(() => {
   const getDataById = async () => {
     const { data } = await axios.get(url/`${id}`)
     setType(data.type)
     setContact(data.contact)
     setContent(data.content)
     setStatus(data.status)
   }
   getDataById()
 }, [id])


//DELETE
useEffect(() => {
  const getDataById = async () => {
    const { data } = await axios.get(url/`${id}`)
    setType(data.type)
    setContact(data.contact)
    setContent(data.content)
    setStatus(data.status)
  }
  getDataById()
}, [id])
*/
