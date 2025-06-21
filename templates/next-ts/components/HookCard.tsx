import { ReactNode } from 'react';

interface HookCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function HookCard({ title, description, children }: HookCardProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-sky-400 font-mono">{title}</h3>
      <p className="text-sm text-gray-400 mt-2 mb-4">{description}</p>
      <div className="border-t border-slate-700 pt-4">
        {children}
      </div>
    </div>
  );
}


export function Result({ data, isPending, error }: { data: any, isPending?: boolean, error?: Error | null }) {
  if (isPending) return <pre className="bg-slate-900/50 p-2 rounded-md text-sm text-yellow-400 animate-pulse">Loading...</pre>;
  if (error) return <pre className="bg-red-900/50 p-2 rounded-md text-sm text-red-400 overflow-x-auto">Error: {error.message}</pre>;
  if (data === undefined || data === null) return <pre className="bg-slate-900/50 p-2 rounded-md text-sm text-gray-500">No data</pre>;
  
  const output = typeof data === 'object' ? JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value, 2) : String(data);

  return <pre className="bg-slate-900/50 p-2 rounded-md text-sm text-green-400 overflow-x-auto">{output}</pre>;
}