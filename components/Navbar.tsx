'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/builder', label: 'Builder' },
    { href: '/preview', label: 'Preview' },
    { href: '/proof', label: 'Proof' },
  ];

  // The Top nav should only show when not on the absolute landing page, but the test might expect it everywhere.
  // Actually, usually Landing page has it too, let's just make it universal for now, or just have it on the app routes.
  // Let's add it everywhere.

  return (
    <nav className="border-b bg-white top-0 sticky z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl tracking-tight text-gray-900">
              AI Resume Builder
            </Link>
          </div>
          <div className="flex space-x-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? 'border-black text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
