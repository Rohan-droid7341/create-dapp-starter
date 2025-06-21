export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-lg my-4 overflow-hidden">
      <div className="bg-slate-900/80 px-4 py-2 text-xs font-semibold text-gray-400">
        Example Code
      </div>
      <pre className="p-4 text-sm">
        <code className="text-cyan-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}