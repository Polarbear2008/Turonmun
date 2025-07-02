
import React from 'react';
import { CircleCheck } from 'lucide-react';

interface RegistrationStepsProps {
  currentStep: number;
}

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Preferences" },
    { number: 3, label: "Additional Info" },
    { number: 4, label: "Confirmation" },
  ];

  return (
    <div className="max-w-3xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentStep === step.number 
                  ? 'bg-diplomatic-600 text-white'
                  : currentStep > step.number 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white border border-neutral-200 text-neutral-500'
              }`}
            >
              {currentStep > step.number ? <CircleCheck size={18} /> : step.number}
            </div>
            <span className="text-xs mt-2 text-neutral-600">
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-neutral-200 rounded"></div>
        <div 
          className="absolute top-0 left-0 h-1 bg-diplomatic-600 rounded transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default RegistrationSteps;
