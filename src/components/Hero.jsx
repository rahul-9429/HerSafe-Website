import React from 'react'
import Header from './header'
import circle from '../assets/hero_circle.svg';
// import circleHero from  '../assets/Semicircle.svg';
import {FeaturesSectionDemo} from './BentoGrid';

const Hero = () => {
  return (
    <>
    
    <div className='flex flex-col  text-black w-full h-screen'
     style={{
      backgroundImage: `url(${import.meta.env.BASE_URL}Semicircle.svg)`,
      backgroundSize: 'contain',
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
    }}>
    <Header/>

    <div  className=' flex h-full'>
    <div className=' w-[50%] sm:pl-20 justify-center items-center flex flex-col'>
      <div className=''>
        <h3 className='uppercase font-semibold text-2xl tracking-[1.1rem] text-black/80'>let's live safer</h3>
        <h1 className=' uppercase font-semibold text-8xl tracking-widest'>hersafe</h1>
        <p className='text-xl pt-5'>Empowering women with real-time safety features, trusted alerts, and community support.</p>
      <button className='mt-6 bg-[#6EDACB] px-5 cursor-pointer text-white py-2 font-bold rounded-4xl border-3 border-[#5EC6B8]'>Download now</button>
      </div>
    </div>
    <div className='flex w-[50%] '>
      <span className='w-[90%]'>

      </span>
      <span className=" w-[10%] -mt-18  !h-screen bg-[linear-gradient(to_bottom,_transparent_0%,_#9AE0D3CC_2%,_#35A7A0CC_50%,_#89C8DDCC_98%,_transparent_100%)] uppercase writing-vertical-lr font-xl font-semibold text-white tracking-widest justify-evenly items-center flex"
      style={{ writingMode: 'vertical-lr' }}
      >
          <span className='tracking-[0.7rem]'>
            hersafe app 
          </span>
          <span className='tracking-[0.3rem]'>
          SAFETY | TRUST | FREEDOM
          </span>
      </span>



    </div>  
        
    </div>
   <img src={circle} alt="" width={400} height={400} className='-mt-32 ml-40'/>    
    </div>
    </>
  )
}

export default Hero