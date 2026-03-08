import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
        Build a Resume That Gets Read.
      </h1>
      <p className="mt-4 text-xl text-gray-600 max-w-2xl mb-10">
        AI Resume Builder helps you create professional, ATS-friendly resumes in minutes.
      </p>
      <Link 
        href="/builder"
        className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 transition-colors"
      >
        Start Building
      </Link>
    </div>
  );
}
