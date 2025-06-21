"use client";

import { useState, ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

interface HookAccordionProps {
  title: string;
  description: string;
  code: string;
  demo: ReactNode;
  result: ReactNode;
}

export function HookAccordion({ title, description, code, demo, result }: HookAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-mono text-lg text-sky-400">{title}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          ▶
        </span>
      </button>

      {isOpen && (
        <div className="px-2 pb-4">
          <p className="text-sm text-gray-400 mb-4">{description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left side: Live Demo */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
               <h4 className="font-semibold text-white mb-2">Live Demo</h4>
               {demo}
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Result</h4>
                {result}
            </div>
          </div>

          {/* Code at the bottom */}
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}