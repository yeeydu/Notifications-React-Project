import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='error'>
      <h2> Sorry<span role="img" aria-label="sorry"> 😥</span>Page not found</h2>
      <Link to={"/"}>Back to homepage</Link>
    </div>
  )
}

export default ErrorPage