import React from 'react'
import mapsImage from '../assets/maps.png'
const Join = () => {
  return (
    <div className='flex justify-between'>
        <div className='sm:w-[70%] w-[100%]'>
            <h1 className='text-6xl font-semibold'>Join the Movement</h1>
            <p className='text-2xl pt-4 '>Your safety matters. Join thousands of users who trust HerSafe for a smarter, safer tomorrow.</p>
            <p className='text-2xl pt-1'>Have Questions? Contact us at help@hersafe</p>
        </div>
        <div className="sm:w-[30%] w-full flex justify-center items-center flex-col border relative">
      <div
        className="h-[100px] w-[100px] rounded-xl border-3 border-black/40 bg-black/5 z-50 absolute top-[-30px]"
        style={{
          backgroundImage: `url(${mapsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="flex justify-center items-center flex-col border-3 border-black/40 bg-black/5 p-10 rounded-3xl backdrop-blur-lg relative z-40 mt-12">
        <h1 className="text-5xl font-semibold">1000+</h1>
        <h3 className="text-2xl pt-1">Monthly Active Users</h3>
      </div>
    </div>
        </div>
  )
}

export default Join