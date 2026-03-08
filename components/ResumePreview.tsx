'use client';

import React from 'react';
import { useResume } from '@/lib/resumeContext';

export default function ResumePreview() {
  const { data, template } = useResume();
  const { personalInfo, summary, education, experience, projects, skills, links } = data;

  const hasPersonalInfo = personalInfo.name || personalInfo.email || personalInfo.phone || personalInfo.location;
  const hasLinks = links.github || links.linkedin;
  const hasHeader = hasPersonalInfo || hasLinks;

  // Template-specific classes
  const getTemplateClasses = () => {
    switch (template) {
      case 'modern':
        return {
          root: 'font-sans text-gray-900',
          header: 'border-b-2 border-gray-900 pb-4 mb-6 text-left',
          name: 'text-4xl font-black tracking-tight mb-2',
          sectionHeading: 'text-xl font-bold mb-3 text-gray-900',
          subHeading: 'font-bold text-gray-900',
        };
      case 'minimal':
        return {
          root: 'font-sans text-gray-800',
          header: 'mb-8 text-left',
          name: 'text-3xl font-medium mb-1',
          sectionHeading: 'text-sm font-semibold uppercase tracking-widest mb-3 text-gray-500',
          subHeading: 'font-semibold text-gray-800',
        };
      case 'classic':
      default:
        return {
          root: 'font-serif text-black',
          header: 'border-b-2 border-black pb-4 mb-6 text-center sm:text-left',
          name: 'text-3xl font-bold uppercase tracking-wider mb-2',
          sectionHeading: 'text-lg font-bold uppercase tracking-widest mb-3 pb-1 border-b border-gray-300',
          subHeading: 'font-bold text-base',
        };
    }
  };

  const classes = getTemplateClasses();

  return (
    <div className={`w-full bg-white px-8 py-10 shadow-sm transition-all duration-300 ${classes.root}`} style={{ minHeight: '100%' }}>
      {hasHeader && (
        <header className={classes.header}>
          {personalInfo.name && <h1 className={classes.name}>{personalInfo.name}</h1>}
          
          <div className={`text-sm flex flex-wrap gap-x-4 gap-y-1 ${template === 'classic' ? 'sm:justify-start justify-center' : ''}`}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          
          {hasLinks && (
            <div className={`mt-1 text-sm flex gap-x-4 gap-y-1 flex-wrap ${template === 'classic' ? 'sm:justify-start justify-center' : ''}`}>
              {links.github && <span>{links.github}</span>}
              {links.linkedin && <span>{links.linkedin}</span>}
            </div>
          )}
        </header>
      )}

      <main className="space-y-6">
        {summary && (
          <section>
            <h2 className={classes.sectionHeading}>Professional Summary</h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className={classes.sectionHeading}>Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="avoid-break-inside">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={classes.subHeading}>{exp.title}</h3>
                    <span className="text-sm font-medium text-gray-600">{exp.duration}</span>
                  </div>
                  <div className={`text-sm mb-1 ${template === 'classic' ? 'font-medium uppercase tracking-wide' : 'text-gray-700'}`}>
                    {exp.company}
                  </div>
                  {exp.description && (
                    <div className="text-sm leading-relaxed whitespace-pre-wrap ml-4 list-disc" style={{ display: 'list-item' }}>
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className={classes.sectionHeading}>Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="avoid-break-inside">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={classes.subHeading}>{edu.degree}</h3>
                    <span className="text-sm font-medium text-gray-600">{edu.year}</span>
                  </div>
                  <div className={`text-sm ${template === 'classic' ? 'font-medium uppercase tracking-wide' : 'text-gray-700'}`}>
                    {edu.school}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0) && (
          <section>
            <h2 className={classes.sectionHeading}>Skills</h2>
            <div className="space-y-3">
              {skills.technical.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Technical</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.technical.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-800 text-xs font-medium rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Soft Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.soft.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.tools.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tools & Tech</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.tools.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className={classes.sectionHeading}>Projects</h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="avoid-break-inside">
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className={classes.subHeading}>{proj.title}</h3>
                      {(proj.liveUrl || proj.githubUrl) && (
                        <div className="flex gap-1.5">
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 print:text-black">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-black print:text-black">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-600">{proj.year}</span>
                  </div>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5 mb-1.5">
                      {proj.techStack.map((tech, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded">{tech}</span>
                      ))}
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-sm mt-1 whitespace-pre-wrap">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
