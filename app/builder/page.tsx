'use client';

import React from 'react';
import { useResume } from '@/lib/resumeContext';
import ATSScore from '@/components/ATSScore';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';

import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';

// Helper for Bullet Structure Guidance (used by Experience)
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



export default function BuilderPage() {
  const { data, setData, isLoaded } = useResume();

  if (!isLoaded) return null; // Avoid hydration mismatch

  const handlePersonalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [e.target.name]: e.target.value }
    }));
  };

  const handleLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({
      ...prev,
      links: { ...prev.links, [e.target.name]: e.target.value }
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), degree: '', school: '', year: '' }]
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), title: '', company: '', duration: '', description: '' }]
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };


  const loadSampleData = () => {
    setData({
      personalInfo: {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA'
      },
      summary: 'Results-driven software engineer with 5+ years of experience in building scalable web applications. Passionate about clean code, architecture, and user experience. Proven track record of delivering high-quality software products on time and collaborating effectively with cross-functional teams. I thrive in fast-paced environments.',
      education: [
        { id: 'e1', degree: 'B.S. Computer Science', school: 'University of Technology', year: '2015 - 2019' }
      ],
      experience: [
        { 
          id: 'ex1', 
          title: 'Senior Frontend Developer', 
          company: 'TechNova Solutions', 
          duration: '2021 - Present', 
          description: 'Led a team of 4 developers to rebuild the core customer portal using Next.js and React.\nImproved application performance by 40% through code splitting.'
        }
      ],
      projects: [
        {
          id: 'p1',
          title: 'OpenSource UI Library',
          year: '2022',
          description: 'Created and maintained an open-source React component library used by over 5k developers.',
          techStack: ['React', 'TypeScript']
        },
        {
          id: 'p2',
          title: 'E-commerce Platform',
          year: '2021',
          description: 'Developed a high-traffic e-commerce platform processing 10k transactions daily.',
          techStack: ['Node.js', 'PostgreSQL']
        }
      ],
      skills: {
        technical: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS'],
        soft: ['Communication', 'Team Leadership'],
        tools: ['Git', 'Figma']
      },
      links: {
        github: 'github.com/janedoe',
        linkedin: 'linkedin.com/in/janedoe'
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Left Column - Form Sections */}
      <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto border-r border-gray-200 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resume Details</h1>
            <button 
              onClick={loadSampleData}
              className="text-sm px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-colors font-medium text-black"
            >
              Load Sample Data
            </button>
          </div>

          <TemplateSelector />
          <ATSScore />
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Personal Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" value={data.personalInfo.name} onChange={handlePersonalInfo} type="text" placeholder="Name" className="p-2 border rounded-md" />
                <input name="email" value={data.personalInfo.email} onChange={handlePersonalInfo} type="email" placeholder="Email" className="p-2 border rounded-md" />
                <input name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfo} type="tel" placeholder="Phone" className="p-2 border rounded-md" />
                <input name="location" value={data.personalInfo.location} onChange={handlePersonalInfo} type="text" placeholder="Location" className="p-2 border rounded-md" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Summary</h2>
              <textarea 
                value={data.summary}
                onChange={e => setData(prev => ({...prev, summary: e.target.value}))}
                placeholder="Professional Summary" 
                rows={4} 
                className="w-full p-2 border rounded-md"
              ></textarea>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Experience</h2>
              {data.experience.map(exp => {
                const guidance = getBulletGuidance(exp.description);
                return (
                  <div key={exp.id} className="p-4 border rounded-md bg-gray-50 mb-4 relative group">
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 hidden group-hover:block text-sm">Remove</button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <input value={exp.title} onChange={e => updateExperience(exp.id, 'title', e.target.value)} type="text" placeholder="Job Title" className="p-2 border rounded-md" />
                      <input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} type="text" placeholder="Company" className="p-2 border rounded-md" />
                    </div>
                    <input value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} type="text" placeholder="Duration (e.g. 2020 - 2023)" className="w-full p-2 border rounded-md mb-3" />
                    <textarea 
                      value={exp.description} 
                      onChange={e => updateExperience(exp.id, 'description', e.target.value)} 
                      placeholder="Bullet points (one per line)" 
                      rows={3} 
                      className="w-full p-2 border rounded-md mb-1"
                    ></textarea>
                    {guidance.length > 0 && exp.description.length > 0 && (
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
                );
              })}
              <button onClick={addExperience} className="text-sm font-medium text-black border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-100">+ Add Experience</button>
            </section>

            <ProjectsSection />
            <SkillsSection />

            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="github" value={data.links.github} onChange={handleLinks} type="url" placeholder="GitHub URL" className="p-2 border rounded-md" />
                <input name="linkedin" value={data.links.linkedin} onChange={handleLinks} type="url" placeholder="LinkedIn URL" className="p-2 border rounded-md" />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Right Column - Live Preview Panel */}
      <div className="hidden md:flex flex-col w-full md:w-1/2 bg-gray-100 p-8 items-center justify-start overflow-y-auto">
        <div className="max-w-[210mm] w-full min-h-[297mm]">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
