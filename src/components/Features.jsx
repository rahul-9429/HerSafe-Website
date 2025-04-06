import React from 'react';

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:bg-[#E2F4FB] transform hover:-translate-y-1">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "SOS ALERT",
      description: "SEND AN INSTANT SOS WITH YOUR LIVE LOCATION TO EMERGENCY CONTACTS AND NEARBY HELP."
    },
    {
      title: "EMERGENCY CONTACT",
      description: "REACH YOUR TRUSTED CONTACTS QUICKLY WITH JUST ONE TAP DURING EMERGENCIES."
    },
    {
      title: "AI ASSISTANT",
      description: "YOUR SMART SAFETY COMPANION—GET QUICK ANSWERS AND TRIGGER EMERGENCY ACTIONS THROUGH VOICE OR TEXT."
    },
    {
      title: "FAKE CALL",
      description: "TRIGGER A LIFELIKE FAKE CALL TO SAFELY EXIT UNCOMFORTABLE OR RISKY SITUATIONS."
    },
    {
      title: "WEARABLE INTEGRATION",
      description: "ACCESS SOS AND OTHER FEATURES DIRECTLY FROM YOUR SMARTWATCH OR FITNESS BAND."
    },
    {
      title: "DAIL 100",
      description: "CALL THE POLICE HELPLINE INSTANTLY FROM WITHIN THE APP FOR IMMEDIATE SUPPORT."
    }
  ];

  return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center tracking-widest mb-16">KEY FEATURES</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-24">
          {features.slice(0, 3).map((feature, index) => (
            <FeatureCard 
              key={index} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mx-24 mb-32">
          {features.slice(3, 6).map((feature, index) => (
            <FeatureCard 
              key={index + 3} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
   
  );
};

export default Features;