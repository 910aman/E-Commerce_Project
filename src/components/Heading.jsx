import React from 'react'

const Heading = ({heading}) => {
  return (
    <div className='h-10 w-full my-2 gray-800'>
        <h1 className=' h-full border-l-8 border-gray-500 rounded-md bg-gradient-to-r bg-green-200 from-slate-600 text-slate-50 flex items-center w-full pl-5 '>
            {heading}
        </h1>
    </div>
  )
}

export default Heading