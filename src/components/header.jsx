import React from 'react'

const Header = () => {
  const [scrolled , setScrolled] = React.useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrolled(position);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={`flex justify-between items-center sm:px-20 py-5 px-10  text-black sticky top-0 transition-all duration-75 ease-in-out ${scrolled >0 ? "backdrop-blur-sm": ""} `}>
        <div>Hersafeai</div>
        <div>
          <ul className='flex gap-16 uppercase font-semibold '>
            <li className=' hover:text-[#6EDACB] transition-colors duration-75 ease-in-out cursor-pointer '>Home</li>
            <li className=' hover:text-[#6EDACB] transition-colors duration-75 ease-in-out cursor-pointer '>Features</li>
            <li className=' hover:text-[#6EDACB] transition-colors duration-75 ease-in-out cursor-pointer '>About Us</li>
            <li className=' hover:text-[#6EDACB] transition-colors duration-75 ease-in-out cursor-pointer '>Community</li>
          </ul>
        </div>
        <span className='text-transparent'>:</span>
        {/* <div><button class="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full">Get App</button></div> */}
    </div>
  )
}

export default Header