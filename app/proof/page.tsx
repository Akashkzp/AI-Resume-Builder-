import React from 'react';

export default function ProofPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 p-6 text-center">
      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 max-w-lg w-full">
        <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Proof Artifacts
        </h1>
        <p className="text-gray-600">
          This is a placeholder for artifacts generation. Future versions will include generated proof documents here.
        </p>
      </div>
    </div>
  );
}
