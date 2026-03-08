'use client';

import React, { useState } from 'react';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import ATSScore from '@/components/ATSScore';
import { useResume } from '@/lib/resumeContext';

export default function PreviewPage() {
  const { data, isLoaded } = useResume();
  const [showWarning, setShowWarning] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  if (!isLoaded) return null;

  const validateResume = () => {
    const hasName = !!data.personalInfo.name.trim();
    const hasExperience = data.experience.length > 0;
    const hasProjects = data.projects.length > 0;

    if (!hasName || (!hasExperience && !hasProjects)) {
      setShowWarning(true);
      // We automatically hide it after a few seconds
      setTimeout(() => setShowWarning(false), 5000);
    } else {
      setShowWarning(false);
    }
  };

  const handlePrint = () => {
    validateResume();
    // Use setTimeout so the warning renders briefly or stays if needed, 
    // but we do NOT block the print
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const generatePlainText = () => {
    let text = '';
    
    // Name and Contact
    if (data.personalInfo.name) text += `${data.personalInfo.name.toUpperCase()}\n`;
    
    const contacts = [];
    if (data.personalInfo.email) contacts.push(data.personalInfo.email);
    if (data.personalInfo.phone) contacts.push(data.personalInfo.phone);
    if (data.personalInfo.location) contacts.push(data.personalInfo.location);
    if (contacts.length > 0) text += `${contacts.join(' | ')}\n`;
    
    const links = [];
    if (data.links.github) links.push(`GitHub: ${data.links.github}`);
    if (data.links.linkedin) links.push(`LinkedIn: ${data.links.linkedin}`);
    if (links.length > 0) text += `${links.join(' | ')}\n`;
    
    // Summary
    if (data.summary) {
      text += `\nSUMMARY\n-------\n${data.summary}\n`;
    }

    // Experience
    if (data.experience.length > 0) {
      text += `\nEXPERIENCE\n----------\n`;
      data.experience.forEach(exp => {
        text += `${exp.title} at ${exp.company} (${exp.duration})\n`;
        if (exp.description) {
          exp.description.split('\n').forEach(bullet => {
            if (bullet.trim()) text += `  * ${bullet.trim()}\n`;
          });
        }
        text += '\n';
      });
    }

    // Education
    if (data.education.length > 0) {
      text += `\nEDUCATION\n---------\n`;
      data.education.forEach(edu => {
        text += `${edu.degree}, ${edu.school} (${edu.year})\n`;
      });
    }

    // Projects
    if (data.projects.length > 0) {
      text += `\nPROJECTS\n--------\n`;
      data.projects.forEach(proj => {
        text += `${proj.title} (${proj.year})\n`;
        if (proj.description) {
          proj.description.split('\n').forEach(bullet => {
            if (bullet.trim()) text += `  * ${bullet.trim()}\n`;
          });
        }
        text += '\n';
      });
    }

    // Skills
    if (data.skills) {
      text += `\nSKILLS\n------\n${data.skills}\n`;
    }

    return text.trim();
  };

  const handleCopyText = async () => {
    validateResume();
    
    const text = generatePlainText();
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 3000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 print-page-wrapper">
      
      {/* UI Elements hidden during printing */}
      <div className="max-w-[210mm] w-full mb-6 no-print">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TemplateSelector />
          
          <div className="flex gap-3">
            <button 
              onClick={handleCopyText}
              className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
            >
              {copyStatus === 'copied' ? (
                <>
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v1m-6 4h8" /></svg>
                  Copy Resume as Text
                </>
              )}
            </button>
            <button 
              onClick={handlePrint}
              className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print / Save as PDF
            </button>
          </div>
        </div>

        <ATSScore />

        {showWarning && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded-md shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700 font-medium">
                  Your resume may look incomplete. (Missing Name or standard sections like Experience/Projects)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow max-w-[210mm] w-full min-h-[297mm] overflow-hidden print-resume-container">
        <ResumePreview />
      </div>
    </div>
  );
}
