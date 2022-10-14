import React from 'react'

export default function DeleteE() {

  const onDelete = (url) => {
    axios.delete(url)
        .then((getData) => {
            setData(getData.data);
        })
    console.log(`item  deleted `)
}

  return (
    <div>Item Deleted</div>
  )
}
