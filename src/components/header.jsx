import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center sm:px-20 py-5 px-10  text-black sticky top-0 backdrop-blur-sm '>
        <div>Hersafeai</div>
        <div><button class="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full">Get App</button></div>
    </div>
  )
}

export default Header