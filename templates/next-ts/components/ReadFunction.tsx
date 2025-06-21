"use client";
import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { type Abi, type Address, type AbiFunction } from 'viem';
import { Result } from './HookCard';
import { FunctionArgs } from './FunctionArgs';

interface ReadFunctionProps {
  address: Address;
  abi: Abi;
  functionData: AbiFunction;
}

export function ReadFunction({ address, abi, functionData }: ReadFunctionProps) {
  const { name: functionName, inputs: args } = functionData;
  const [formArgs, setFormArgs] = useState<any[]>(new Array(args.length).fill(''));

  const { data, error, isLoading, isFetching, refetch } = useReadContract({
    address,
    abi,
    functionName,
    args: formArgs,
    query: {
      enabled: false,
    },
  });

  return (
    <div className="p-4 bg-slate-800/50 rounded-lg">
      <FunctionArgs args={args} formArgs={formArgs} setFormArgs={setFormArgs} />
      <button
        onClick={() => refetch()}
        disabled={isLoading || isFetching}
        className = "inline-flex w-full justify-center rounded-md px-4 py-2 mt-4 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isFetching ? 'Reading...' : 'Read'}
      </button>
      <div className="mt-4">
        <h4 className="font-semibold text-white mb-2">Result</h4>
        <Result data={data} error={error} isPending={isLoading} />
      </div>
    </div>
  );
}