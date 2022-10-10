import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <div className='header'>
      <h1 className='title'>
        <Link to={"/"}>
          Notifications App
        </Link>
      </h1>
      <p className='sub-title'>Choose your notification and send</p>
    </div>
  )
}
