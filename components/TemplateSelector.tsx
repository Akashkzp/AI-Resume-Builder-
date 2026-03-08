'use client';

import React from 'react';
import { useResume, TemplateType } from '@/lib/resumeContext';

export default function TemplateSelector() {
  const { template, setTemplate } = useResume();

  const templates: { id: TemplateType; label: string }[] = [
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Template Style</h3>
      <div className="flex bg-gray-100 p-1 rounded-lg">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              template === t.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
