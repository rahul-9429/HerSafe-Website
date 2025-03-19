import React from 'react';
import { Linkedin , Mail } from 'lucide-react';
import PlayStor from '../assets/dplaystore.svg';
import AppStor from '../assets/dappstore.svg';
const Footer = () => {
  return (
    <div className="text-white py-16">
      <div className="container mx-auto flex flex-col sm:flex-row gap-5 justify-between px-5">
        
        {/* Hersafeai, Socials */}
        <div className="flex flex-col items-center gap-3 sm:w-1/4">
        <h1 className="text-3xl font-bold text-center text-black">
                 HerSafeai </h1>
            <span className=' flex gap-6 '>
                {/* <a href="" className=''><Instagram className=' text-white/70 hover:text-white transition-all duration-200 '/>
                </a>                 */}
                <a href=""><Linkedin className='text-black/70 hover:text-black transition-all duration-200 ' />
                </a>
                <a href=""><Mail className='text-black/70 hover:text-black transition-all duration-200 mt-[2px]' />
                </a>
            </span>
          <div className="flex gap-4">
            
          </div>
        </div>

        {/* Useful Links and Services */}
        {/* <div className="flex sm:w-1/2 justify-around gap-5">
        <div>
  <h1 className="text-2xl font-semibold pb-2">Useful Links</h1>
  <ul className="text-gray-400 space-y-2">
    <li>
      <Link href="/" className="hover:text-[#7985FA] transform transition-all duration-150 font-semibold">
        Home
      </Link>
    </li>
    <li>
      <Link href="/AboutUs" className="hover:text-[#7985FA] transform transition-all duration-150 font-semibold">
        About
      </Link>
    </li>
    <li>
      <Link href="/Careers" className="hover:text-[#7985FA] transform transition-all duration-150 font-semibold">
        Careers
      </Link>
    </li>
    <li>
      <Link href="/ContactUs" className="hover:text-[#7985FA] transform transition-all duration-150 font-semibold">
        Contact
      </Link>
    </li>
  </ul>
</div>
<div>
  <h1 className="text-2xl font-semibold pb-2">Our Services</h1>
  <ul className="text-gray-400 space-y-2 list-none">
    <li>
      <Link href="/services/TalentOutsourcing" className="hover:text-[#7985FA] transform transition-all duration-150 font-semibold cursor-pointer">
        Outsourcing
      </Link>
    </li>            
    <li>
      <Link href="/services/SoftwareDevelopment" className="hover:text-[#7985FA] transform transition-all duration-150 font-semibold cursor-pointer">
        Software Development
      </Link>
    </li>
    <li>
      <Link href="/services/Testing&Validation" className="hover:text-[#7985FA] transform transition-all duration-150 font-semibold cursor-pointer">
        Testing & Validation
      </Link>
    </li>
    <li>
      <Link href="/services/AutomotiveInfotainment" className="hover:text-[#7985FA] transform transition-all duration-150 font-semibold cursor-pointer">
      Automotive Infotainment
      </Link>
    </li>
  </ul>
</div>
        </div> */}

        <div className="sm:w-1/4 items-center ">
          {/* <div className="mt-2">    
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3637.411930707992!2d83.16334257490088!3d17.710479393417724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3968cb428b8087%3A0xaa3e198c43836a65!2sVignan&#39;s%20Institute%20Of%20Information%20Technology!5e1!3m2!1sen!2sin!4v1742048668569!5m2!1sen!2sin" width="300" height="150" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div> */}
          <h1 className='text-lg font-semibold mb-1 text-center text-black  '>Get the app now!</h1>
              <div className='flex flex-row gap-5 items-center justify-center'>
              <img src={AppStor} alt=""  width={150}/>
              <img src={PlayStor} alt="" width={150} />
              </div>
           

        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text mt-6">
        <p>HerSafe Ai &reg;. All rights reserved 2025
            <br />An Arambh's initiative.
        </p>
      </div>
    </div>
  );
};

export default Footer;