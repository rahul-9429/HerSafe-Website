import React from 'react';
import {
  AlarmCheck,
  UserCheck,
  Bot,
  PhoneOff,
  Watch,
  PhoneCall
} from 'lucide-react';

const icons = {
  "INSTANT SOS": <AlarmCheck className="w-8 h-8 text-[#5EC6B8] mb-4" />,
  "TRUSTED CONTACTS": <UserCheck className="w-8 h-8 text-[#5EC6B8] mb-4" />,
  "AI SAFETY ASSISTANT": <Bot className="w-8 h-8 text-[#5EC6B8] mb-4" />,
  "FAKE CALL": <PhoneOff className="w-8 h-8 text-[#5EC6B8] mb-4" />,
  "SMARTWATCH INTEGRATION": <Watch className="w-8 h-8 text-[#5EC6B8] mb-4" />,
  "POLICE DIAL (100/112)": <PhoneCall className="w-8 h-8 text-[#5EC6B8] mb-4" />
};

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white/40 rounded-2xl py-10 px-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:bg-gradient-to-bl from-[#CEE7F1] to-rose-50 shadow-2xl transform hover:-translate-y-1 border border-gray-100">
      {icons[title]}
      <h2 className="text-xl tracking-wide font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "INSTANT SOS",
      description: "Send a real-time SOS with your live location to your emergency contacts and nearby responders in seconds."
    },
    {
      title: "TRUSTED CONTACTS",
      description: "Reach your trusted friends or family instantly with a single tap, even when you're in distress."
    },
    {
      title: "AI SAFETY ASSISTANT",
      description: "Chat or speak to our AI assistant to trigger help, share location, or guide you through critical situations."
    },
    {
      title: "FAKE CALL",
      description: "Create a fake but realistic incoming call to exit dangerous or uncomfortable encounters."
    },
    {
      title: "SMARTWATCH INTEGRATION",
      description: "Trigger SOS or safety actions discreetly via your smartwatch or fitness band anytime, anywhere."
    },
    {
      title: "POLICE DIAL (100/112)",
      description: "One-tap access to emergency police helpline numbers—always available when you need it most."
    }
  ];

  return (
    <div className="py-24 px-6 md:px-24" id = "features">
             <h1 className='text-center tracking-[1rem] text-4xl font-semibold pb-20'>KEY FEATURES</h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
