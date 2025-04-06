import React from 'react';
import Faq from './faqComp';

const faqs = [
  {
    question: "What is the purpose of the app?",
    answer: "HerSafe is designed to enhance personal safety and provide a sense of security."
  },
  {
    question: "How does the app work?",
    answer: "Users can send alerts, share their location, and access safety resources."
  },
  {
    question: "Is the app free to use?",
    answer: "Yes, the app is free to download and use with optional premium features."
  },
  {
    question: "How do I report an issue?",
    answer: "Users can report issues through the app's support section."
  }
];

const FaqDisDiv = () => {
  return (
    <>
        <h1 className='text-center tracking-[1rem] text-4xl font-semibold'>FAQS</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="flex justify-center items-center w-full">
            <Faq question={faq.question} answer={faq.answer} />
          </div>
      ))}
    </>
  );
};

export default FaqDisDiv;