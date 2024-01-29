import React from 'react'
import notFound from '../assets/404page.gif'

export default function Page404() {
  return (
    <div className='flex flex-auto items-center justify-center min-h-screen bg-[#f7f9fb]'>
      <img src={notFound} alt=""/>
    </div>
  )
}
