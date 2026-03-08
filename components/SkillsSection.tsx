import React, { useState } from 'react';
import { useResume, Skills } from '@/lib/resumeContext';

export default function SkillsSection() {
  const { data, setData } = useResume();
  const [inputs, setInputs] = useState({ technical: '', soft: '', tools: '' });
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, category: keyof Skills) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = inputs[category].trim();
      if (val && !data.skills[category].includes(val)) {
        setData(prev => ({
          ...prev,
          skills: {
            ...prev.skills,
            [category]: [...prev.skills[category], val]
          }
        }));
      }
      setInputs(prev => ({ ...prev, [category]: '' }));
    }
  };

  const removeSkill = (category: keyof Skills, index: number) => {
    setData(prev => {
      const newSkills = [...prev.skills[category]];
      newSkills.splice(index, 1);
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: newSkills
        }
      };
    });
  };

  const suggestSkills = () => {
    setIsSuggesting(true);
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        skills: {
          technical: Array.from(new Set([...prev.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])),
          soft: Array.from(new Set([...prev.skills.soft, "Team Leadership", "Problem Solving"])),
          tools: Array.from(new Set([...prev.skills.tools, "Git", "Docker", "AWS"]))
        }
      }));
      setIsSuggesting(false);
    }, 1000);
  };

  const renderCategory = (title: string, category: keyof Skills, placeholder: string) => {
    const skillsList = data.skills[category] || [];
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-700">{title}</label>
          <span className="text-xs text-gray-500 font-medium">{skillsList.length}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {skillsList.map((skill, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              {skill}
              <button 
                type="button" 
                onClick={() => removeSkill(category, index)} 
                className="ml-1.5 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        
        <input 
          type="text" 
          value={inputs[category]}
          onChange={e => setInputs(prev => ({ ...prev, [category]: e.target.value }))}
          onKeyDown={e => handleKeyDown(e, category)}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-black focus:border-black"
        />
      </div>
    );
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        <button 
          onClick={suggestSkills}
          disabled={isSuggesting}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 disabled:opacity-50"
        >
          {isSuggesting ? (
            <span className="flex items-center gap-1">
              <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </span>
          ) : (
            <>✨ Suggest Skills</>
          )}
        </button>
      </div>

      {renderCategory("Technical Skills", "technical", "e.g. React, Next.js (Press Enter)")}
      {renderCategory("Soft Skills", "soft", "e.g. Communication (Press Enter)")}
      {renderCategory("Tools & Technologies", "tools", "e.g. Git, Figma (Press Enter)")}
    </section>
  );
}
