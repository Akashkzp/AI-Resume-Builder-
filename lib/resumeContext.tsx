'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  isExpanded?: boolean; // UI state only
}

export interface Skills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  links: {
    github: string;
    linkedin: string;
  };
}

export const initialResumeData: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    soft: [],
    tools: []
  },
  links: { github: '', linkedin: '' }
};

export type TemplateType = 'classic' | 'modern' | 'minimal';

interface ResumeContextType {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  template: TemplateType;
  setTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
  isLoaded: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(initialResumeData);
  const [template, setTemplate] = useState<TemplateType>('classic');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Migration step: skills might be a string from old code
        if (typeof parsedData.skills === 'string') {
          parsedData.skills = { technical: parsedData.skills.split(',').map((s: string) => s.trim()).filter(Boolean), soft: [], tools: [] };
        }
        setData(parsedData);
      } catch (e) {
        console.error('Failed to parse resume data', e);
      }
    }

    const savedTemplate = localStorage.getItem('resumeBuilderTemplate');
    if (savedTemplate && ['classic', 'modern', 'minimal'].includes(savedTemplate)) {
      setTemplate(savedTemplate as TemplateType);
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('resumeBuilderData', JSON.stringify(data));
      localStorage.setItem('resumeBuilderTemplate', template);
    }
  }, [data, template, isLoaded]);

  return (
    <ResumeContext.Provider value={{ data, setData, template, setTemplate, isLoaded }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
