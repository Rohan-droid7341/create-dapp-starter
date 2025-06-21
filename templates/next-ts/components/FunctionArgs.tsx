interface FunctionArgsProps {
  args: readonly any[];
  formArgs: any[];
  setFormArgs: React.Dispatch<React.SetStateAction<any[]>>;
}

export function FunctionArgs({ args, formArgs, setFormArgs }: FunctionArgsProps) {
  if (args.length === 0) {
    return <p className="text-sm text-gray-400">This function takes no arguments.</p>;
  }

  const handleArgChange = (index: number, value: string) => {
    const newArgs = [...formArgs];
    newArgs[index] = value;
    setFormArgs(newArgs);
  };

  return (
    <div className="space-y-3">
      {args.map((arg, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {arg.name || `arg_${index}`} ({arg.type})
          </label>
          <input
            type="text"
            value={formArgs[index]}
            onChange={(e) => handleArgChange(index, e.target.value)}
            className="w-full bg-slate-700 p-2 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      ))}
    </div>
  );
}