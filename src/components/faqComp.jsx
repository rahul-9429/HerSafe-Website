import React, { useState, useRef, useEffect } from 'react';

const FAQ = ({question,answer}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className="flex justify-center items-center w-full mt-8">
      <div className=" shadow-2xl flex flex-col justify-center items-start w-[99%] sm:w-[60%] py-4 px-6 rounded-2xl bg-[linear-gradient(to_right,_#8CD8CC_2%,#CEE7F1_2%,_#E3F0F3_100%)] ">
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center transition-all duration-300 ease-in-out w-full text-left text-lg font-semibold text-[#333] focus:outline-none"
        >
          <span className='text-xl ml-6'>{question}</span>
          <span className={`text-4xl text-[#8CD8CC] transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-45 ' : ''}`}>
            +
          </span>
        </button>

        <div
          ref={contentRef}
          style={{
            maxHeight: height,
            transition: 'max-height 0.3s ease-in-out',
          }}
          className="overflow-hidden w-full"
        >
          <p className="-mt-1 text-gray-700 text-lg ml-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
