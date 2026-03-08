import React, { useState } from 'react';
import { useResume, Project } from '@/lib/resumeContext';

// Helper for Bullet Structure Guidance
const getBulletGuidance = (text: string) => {
  if (!text) return [];
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const actionVerbs = ['built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated', 'managed', 'spearheaded', 'architected'];
  
  const issues = new Set<string>();
  
  lines.forEach(line => {
    const firstWordMatch = line.trim().match(/^[a-zA-Z]+/);
    const firstWord = firstWordMatch ? firstWordMatch[0].toLowerCase() : '';
    
    if (firstWord && !actionVerbs.includes(firstWord) && !firstWord.endsWith('ed')) {
      issues.add('Start with a strong action verb (e.g., Built, Developed, Led).');
    }
    
    if (!/\d/.test(line)) {
      issues.add('Add measurable impact (numbers, %, etc) to your bullets.');
    }
  });

  return Array.from(issues);
};

export default function ProjectsSection() {
  const { data, setData } = useResume();
  const [techStackInputs, setTechStackInputs] = useState<Record<string, string>>({});

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { 
        id: Date.now().toString(), 
        title: '', 
        year: '', 
        description: '', 
        techStack: [], 
        liveUrl: '', 
        githubUrl: '',
        isExpanded: true 
      }]
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj)
    }));
  };

  const removeProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent accordion toggle
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const toggleExpanded = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => proj.id === id ? { ...proj, isExpanded: !proj.isExpanded } : proj)
    }));
  };

  // Tech Stack Tag Input Logic
  const handleTechStackKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = (techStackInputs[id] || '').trim();
      const project = data.projects.find(p => p.id === id);
      if (val && project && !project.techStack.includes(val)) {
        updateProject(id, 'techStack', [...project.techStack, val]);
      }
      setTechStackInputs(prev => ({ ...prev, [id]: '' }));
    }
  };

  const removeTechStack = (id: string, index: number) => {
    const project = data.projects.find(p => p.id === id);
    if (!project) return;
    const newTech = [...project.techStack];
    newTech.splice(index, 1);
    updateProject(id, 'techStack', newTech);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Projects</h2>
      
      {data.projects.map((proj, idx) => {
        const guidance = getBulletGuidance(proj.description || '');
        const descLength = (proj.description || '').length;
        
        return (
          <div key={proj.id} className="border border-gray-200 rounded-md bg-white mb-4 shadow-sm overflow-hidden">
            {/* Accordion Header */}
            <div 
              onClick={() => toggleExpanded(proj.id)}
              className="px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-medium text-gray-800 flex items-center gap-2">
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${proj.isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {proj.title || `Project ${idx + 1}`}
              </h3>
              <button 
                onClick={(e) => removeProject(proj.id, e)} 
                className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 rounded hover:bg-red-50"
              >
                Delete
              </button>
            </div>

            {/* Accordion Content */}
            {proj.isExpanded && (
              <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input value={proj.title} onChange={e => updateProject(proj.id, 'title', e.target.value)} type="text" placeholder="Project Title" className="p-2 border rounded-md text-sm" />
                  <input value={proj.year} onChange={e => updateProject(proj.id, 'year', e.target.value)} type="text" placeholder="Year / Duration" className="p-2 border rounded-md text-sm" />
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-gray-600">Description (Max 200 chars)</label>
                    <span className={`text-xs ${descLength > 200 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>{descLength}/200</span>
                  </div>
                  <textarea 
                    value={proj.description} 
                    onChange={e => updateProject(proj.id, 'description', e.target.value)} 
                    placeholder="Bullet points (one per line)" 
                    rows={2} 
                    maxLength={250} // Let them type a bit over to see the warning, but logic might cap it. Let's not hard cap so they can edit.
                    className={`w-full p-2 border rounded-md text-sm ${descLength > 200 ? 'border-red-500 focus:ring-red-500' : ''}`}
                  ></textarea>
                  {guidance.length > 0 && proj.description.length > 0 && (
                    <div className="text-xs text-amber-600 mt-1 space-y-1">
                      {guidance.map((g, i) => (
                        <div key={i} className="flex gap-1 items-start">
                          <span className="font-bold">💡</span>
                          <span>{g}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Stack Picker */}
                <div className="mb-3">
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Tech Stack</label>
                  <div className="flex flex-wrap gap-2 mb-2 min-h-[24px]">
                    {(proj.techStack || []).map((tech, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {tech}
                        <button 
                          type="button" 
                          onClick={() => removeTechStack(proj.id, index)} 
                          className="ml-1 text-blue-400 hover:text-blue-600 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    value={techStackInputs[proj.id] || ''}
                    onChange={e => setTechStackInputs(prev => ({ ...prev, [proj.id]: e.target.value }))}
                    onKeyDown={e => handleTechStackKeyDown(e, proj.id)}
                    placeholder="e.g. React (Press Enter)"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Live URL (Optional)</label>
                    <input value={proj.liveUrl || ''} onChange={e => updateProject(proj.id, 'liveUrl', e.target.value)} type="url" placeholder="https://" className="w-full p-2 border rounded-md text-sm text-gray-600" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">GitHub URL (Optional)</label>
                    <input value={proj.githubUrl || ''} onChange={e => updateProject(proj.id, 'githubUrl', e.target.value)} type="url" placeholder="https://" className="w-full p-2 border rounded-md text-sm text-gray-600" />
                  </div>
                </div>

              </div>
            )}
          </div>
        );
      })}
      <button onClick={addProject} className="text-sm font-medium text-black border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-100">+ Add Project</button>
    </section>
  );
}
