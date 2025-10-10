import React from 'react';
import { ArrowRight, ArrowLeft, FileText, Lightbulb, Users2, Scale } from 'lucide-react';
import { CustomButton } from '../ui/custom-button';

interface EssayStepProps {
  formData: {
    uniqueDelegateTrait: string;
    issueInterest: string;
    type1SelectedPrompt: string;
    type1InsightResponse: string;
    type2SelectedPrompt: string;
    type2PoliticalResponse: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const EssayStep: React.FC<EssayStepProps> = ({ 
  formData, 
  handleChange, 
  nextStep, 
  prevStep 
}) => {
  const wordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const isFormValid = () => {
    return (
      formData.uniqueDelegateTrait.trim() !== '' &&
      formData.issueInterest.trim() !== '' &&
      formData.type1SelectedPrompt !== '' &&
      formData.type1InsightResponse.trim() !== '' &&
      formData.type2SelectedPrompt !== '' &&
      formData.type2PoliticalResponse.trim() !== ''
    );
  };

  const getWordCountColor = (text: string, limit: number = 115) => {
    const count = wordCount(text);
    if (count === 0) return 'text-gray-400';
    if (count <= limit) return 'text-green-600';
    return 'text-red-500';
  };

  const type1Prompts = [
    "A rival delegate launches a sarcastic attack on your country's motives mid-session. You're boiling, but can't strike back — what do you do?",
    "What's a belief or value you claim to care about — but find hard to practice? Why the gap?"
  ];

  const type2Prompts = [
    "You're mediating between two states. One broke international law, but punishing them might destabilize peace. Do you choose justice or stability — and why?",
    "What's more dangerous: fanatics with no strategy or clever people with no principles?"
  ];

  return (
    <div className="bg-white rounded-xl shadow-elegant p-8 border border-neutral-100">
      <h2 className="text-2xl font-display font-semibold mb-2">Page 4 — Essay Section</h2>
      <p className="text-red-600 mb-6">Kindly ensure all responses are original; any use of AI will be detected and may adversely affect your performance evaluation.</p>
      
      <div className="space-y-8">
        {/* What aspects of your background, thinking, or presence set you apart from most delegates */}
        <div className="form-group">
          <label htmlFor="uniqueDelegateTrait" className="block text-sm font-medium text-neutral-700 mb-1">
            What aspects of your background, thinking, or presence set you apart from most delegates - and how? <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <Users2 size={18} className="text-neutral-400" />
            </div>
            <textarea
              id="uniqueDelegateTrait"
              name="uniqueDelegateTrait"
              value={formData.uniqueDelegateTrait}
              onChange={handleChange}
              rows={4}
              className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all resize-none"
              placeholder="Share a trait, habit, or experience that gives you an edge or makes you memorable in MUN."
              required
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-neutral-500">Share a trait, habit, or experience that gives you an edge or makes you memorable in MUN.</p>
            <span className={`text-xs font-medium ${getWordCountColor(formData.uniqueDelegateTrait)}`}>
              {wordCount(formData.uniqueDelegateTrait)}/115 words
            </span>
          </div>
        </div>

        {/* A topic or issue you're passionate about */}
        <div className="form-group">
          <label htmlFor="issueInterest" className="block text-sm font-medium text-neutral-700 mb-1">
            A topic or issue you're passionate or knowledgeable about <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <Lightbulb size={18} className="text-neutral-400" />
            </div>
            <textarea
              id="issueInterest"
              name="issueInterest"
              value={formData.issueInterest}
              onChange={handleChange}
              rows={4}
              className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all resize-none"
              placeholder="Pick an issue or theme you'd dive into for hours. Tell us why it grips you — even briefly."
              required
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-neutral-500">Pick an issue or theme you'd dive into for hours. Tell us why it grips you — even briefly.</p>
            <span className={`text-xs font-medium ${getWordCountColor(formData.issueInterest)}`}>
              {wordCount(formData.issueInterest)}/115 words
            </span>
          </div>
        </div>

        {/* Type I - Personal Insight */}
        <div className="form-group">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Type I — Personal Insight <span className="text-red-500">*</span> <span className="text-neutral-500">(choose 1/2)</span>
          </label>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-start space-x-2">
              <input
                type="radio"
                id="type1prompt1"
                name="type1SelectedPrompt"
                value="1"
                checked={formData.type1SelectedPrompt === "1"}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-diplomatic-600 border-neutral-300 focus:ring-diplomatic-500"
                required
              />
              <label htmlFor="type1prompt1" className="text-sm text-neutral-700 cursor-pointer">
                <strong>1.</strong> {type1Prompts[0]}
              </label>
            </div>
            
            <div className="flex items-start space-x-2">
              <input
                type="radio"
                id="type1prompt2"
                name="type1SelectedPrompt"
                value="2"
                checked={formData.type1SelectedPrompt === "2"}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-diplomatic-600 border-neutral-300 focus:ring-diplomatic-500"
                required
              />
              <label htmlFor="type1prompt2" className="text-sm text-neutral-700 cursor-pointer">
                <strong>2.</strong> {type1Prompts[1]}
              </label>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <FileText size={18} className="text-neutral-400" />
            </div>
            <textarea
              id="type1InsightResponse"
              name="type1InsightResponse"
              value={formData.type1InsightResponse}
              onChange={handleChange}
              rows={4}
              className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all resize-none"
              placeholder="Write your response to the selected prompt..."
              required
              disabled={!formData.type1SelectedPrompt}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-neutral-500">Choose ONE prompt above and write your response</p>
            <span className={`text-xs font-medium ${getWordCountColor(formData.type1InsightResponse)}`}>
              {wordCount(formData.type1InsightResponse)}/115 words
            </span>
          </div>
        </div>

        {/* Type II - Political Reflection */}
        <div className="form-group">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Type II — Political Reflection <span className="text-red-500">*</span> <span className="text-neutral-500">(choose 1/2)</span>
          </label>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-start space-x-2">
              <input
                type="radio"
                id="type2prompt1"
                name="type2SelectedPrompt"
                value="1"
                checked={formData.type2SelectedPrompt === "1"}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-diplomatic-600 border-neutral-300 focus:ring-diplomatic-500"
                required
              />
              <label htmlFor="type2prompt1" className="text-sm text-neutral-700 cursor-pointer">
                <strong>1.</strong> {type2Prompts[0]}
              </label>
            </div>
            
            <div className="flex items-start space-x-2">
              <input
                type="radio"
                id="type2prompt2"
                name="type2SelectedPrompt"
                value="2"
                checked={formData.type2SelectedPrompt === "2"}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-diplomatic-600 border-neutral-300 focus:ring-diplomatic-500"
                required
              />
              <label htmlFor="type2prompt2" className="text-sm text-neutral-700 cursor-pointer">
                <strong>2.</strong> {type2Prompts[1]}
              </label>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <Scale size={18} className="text-neutral-400" />
            </div>
            <textarea
              id="type2PoliticalResponse"
              name="type2PoliticalResponse"
              value={formData.type2PoliticalResponse}
              onChange={handleChange}
              rows={4}
              className="pl-10 w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-diplomatic-300 focus:border-transparent transition-all resize-none"
              placeholder="Write your response to the selected prompt..."
              required
              disabled={!formData.type2SelectedPrompt}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-neutral-500">Choose ONE prompt above and write your response</p>
            <span className={`text-xs font-medium ${getWordCountColor(formData.type2PoliticalResponse)}`}>
              {wordCount(formData.type2PoliticalResponse)}/115 words
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <CustomButton 
          variant="outline" 
          onClick={prevStep}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </CustomButton>
        
        <CustomButton 
          variant="primary"
          onClick={nextStep}
          disabled={!isFormValid()}
        >
          Next Step
          <ArrowRight size={16} className="ml-2" />
        </CustomButton>
      </div>
    </div>
  );
};

export default EssayStep; 