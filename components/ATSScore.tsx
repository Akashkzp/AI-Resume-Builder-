'use client';

import React, { useMemo } from 'react';
import { useResume } from '@/lib/resumeContext';

export default function ATSScore() {
  const { data } = useResume();

  const { score, status, statusColor, improvements } = useMemo(() => {
    let currentScore = 0;
    const potentialImprovements: { msg: string; pts: number }[] = [];
    
    // Total skills helper
    const totalSkills = data.skills.technical.length + data.skills.soft.length + data.skills.tools.length;

    // +10 if name provided
    if (data.personalInfo.name.trim().length > 0) currentScore += 10;
    else potentialImprovements.push({ msg: 'Add your full name', pts: 10 });

    // +10 if email provided
    if (data.personalInfo.email.trim().length > 0) currentScore += 10;
    else potentialImprovements.push({ msg: 'Add an email address', pts: 10 });

    // +10 if summary > 50 chars
    if (data.summary.trim().length > 50) currentScore += 10;
    else potentialImprovements.push({ msg: 'Expand professional summary to >50 characters', pts: 10 });

    // +15 if at least 1 experience entry with bullets
    const hasExpWithBullets = data.experience.some(exp => exp.description && exp.description.trim().length > 0);
    if (hasExpWithBullets) currentScore += 15;
    else potentialImprovements.push({ msg: 'Add at least 1 experience entry with bullet points', pts: 15 });

    // +10 if at least 1 education entry
    if (data.education.length >= 1) currentScore += 10;
    else potentialImprovements.push({ msg: 'Add an education entry', pts: 10 });

    // +10 if at least 5 skills added
    if (totalSkills >= 5) currentScore += 10;
    else potentialImprovements.push({ msg: 'Add at least 5 skills', pts: 10 });

    // +10 if at least 1 project added
    if (data.projects.length >= 1) currentScore += 10;
    else potentialImprovements.push({ msg: 'Add at least 1 project', pts: 10 });

    // +5 if phone provided
    if (data.personalInfo.phone.trim().length > 0) currentScore += 5;
    else potentialImprovements.push({ msg: 'Add a phone number', pts: 5 });

    // +5 if LinkedIn provided
    if (data.links.linkedin.trim().length > 0) currentScore += 5;
    else potentialImprovements.push({ msg: 'Add a LinkedIn profile link', pts: 5 });

    // +5 if GitHub provided
    if (data.links.github.trim().length > 0) currentScore += 5;
    else potentialImprovements.push({ msg: 'Add a GitHub profile link', pts: 5 });

    // +10 if summary contains action verbs
    const actionVerbs = ['built', 'led', 'designed', 'improved', 'created', 'developed', 'managed', 'optimized', 'implemented', 'spearheaded'];
    const summaryLower = data.summary.toLowerCase();
    const hasActionVerb = actionVerbs.some(verb => summaryLower.includes(verb));
    if (hasActionVerb) currentScore += 10;
    else potentialImprovements.push({ msg: 'Use strong action verbs in summary (e.g. Built, Led, Designed)', pts: 10 });

    // Ensure score doesn't exceed 100 somehow
    currentScore = Math.min(currentScore, 100);

    // Determine status text and color
    let statusText = '';
    let colorClass = '';
    let hexColor = '';
    
    if (currentScore <= 40) {
      statusText = 'Needs Work';
      colorClass = 'text-red-500';
      hexColor = '#ef4444'; // Red-500
    } else if (currentScore <= 70) {
      statusText = 'Getting There';
      colorClass = 'text-amber-500';
      hexColor = '#f59e0b'; // Amber-500
    } else {
      statusText = 'Strong Resume';
      colorClass = 'text-green-500';
      hexColor = '#22c55e'; // Green-500
    }

    return {
      score: currentScore,
      status: statusText,
      statusColor: { class: colorClass, hex: hexColor },
      improvements: potentialImprovements
    };
  }, [data]);

  // SVG Circular Progress calculation
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">ATS Readiness</h2>
          <p className={`text-sm font-semibold mt-1 ${statusColor.class}`}>{status}</p>
        </div>
        
        {/* Circular Progress Indicator */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 scale-110">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-100"
            />
            {/* Progress circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke={statusColor.hex}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-black ${statusColor.class}`}>{score}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest -mt-1">/ 100</span>
          </div>
        </div>
      </div>

      {improvements.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Improvement Suggestions
          </h3>
          <ul className="space-y-2.5">
            {improvements.map((improvement, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2.5 leading-snug">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                <span>
                  {improvement.msg} <span className="font-semibold text-blue-600">(+{improvement.pts} points)</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {improvements.length === 0 && (
        <div className="bg-green-50 p-4 rounded-md border border-green-100 flex items-center gap-3">
          <div className="bg-green-100 p-1.5 rounded-full">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p className="text-sm text-green-700 font-medium">
            Your resume is fully optimized!
          </p>
        </div>
      )}
    </div>
  );
}
