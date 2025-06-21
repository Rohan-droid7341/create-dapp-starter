"use client";
import { useState } from 'react';
import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { type Abi, type Address, type AbiFunction, parseEther } from 'viem';
import { Result } from './HookCard';
import { FunctionArgs } from './FunctionArgs';

interface WriteFunctionProps {
  address: Address;
  abi: Abi;
  functionData: AbiFunction;
}

export function WriteFunction({ address, abi, functionData }: WriteFunctionProps) {
  const { name: functionName, inputs: args, stateMutability } = functionData;

  const [formArgs, setFormArgs] = useState<any[]>(new Array(args.length).fill(''));
  const [value, setValue] = useState('');

  const isPayable = stateMutability === 'payable';

  const { data: simulation, error: simError } = useSimulateContract({
    address,
    abi,
    functionName,
    args: formArgs,
    value: isPayable ? parseEther(value || '0') : undefined,
    query: {
      enabled: formArgs.every((arg) => arg !== ''),
    },
  });

  const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError } = useWaitForTransactionReceipt({ hash });

  const handleWrite = () => {
    if (simulation?.request) {
      writeContract(simulation.request);
    }
  };

  return (
    <div className="p-4 bg-slate-800/50 rounded-lg">
      <div className="space-y-4">
        <FunctionArgs args={args} formArgs={formArgs} setFormArgs={setFormArgs} />
        {isPayable && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Value (ETH)</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.1"
              className="w-full bg-slate-700 p-2 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        )}
      </div>

      <button onClick={handleWrite} disabled={!simulation?.request || isPending || isConfirming}  className="inline-flex w-full justify-center rounded-md px-4 py-2 mt-4 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {isPending ? 'Check Wallet...' : isConfirming ? 'Confirming Tx...' : 'Write'}
      </button>

      <div className="mt-4 space-y-2">
        {simError && <Result data={null} error={simError} />}
        {writeError && <Result data={null} error={writeError} />}
        {receiptError && <Result data={null} error={receiptError} />}
        {hash && <div className="text-sm text-gray-300">Transaction Hash: <Result data={hash} /></div>}
        {isConfirmed && <div className="text-sm text-green-400 font-bold">✅ Transaction Confirmed!</div>}
      </div>
    </div>
  );
}