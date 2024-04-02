import React from 'react'

const Error = ({message}) => {
  return (
    <div className='flex justify-center items-center text-3xl text-white w-full min-h-[90vh]'>
      {message ? message : "Error - 404 Not found"}
    </div>
  )
}

export default Error
