"use client";
import { useMemo } from 'react';
import { type AbiFunction, type Abi, type Address } from 'viem';


import { myContractAddress, myContractAbi } from '@/lib/contract';

import { ReadFunction } from '@/components/ReadFunction';
import { WriteFunction } from '@/components/WriteFunction';
import { HookAccordion } from '@/components/HookAccordion';
import { ConnectWallet } from '@/components/ConnectWallet';


const getFunctionKey = (func: AbiFunction): string => {
  const inputTypes = func.inputs.map(input => input.type).join(',');
  return `${func.name}(${inputTypes})`;
};
// 

const buttonStyles = {
  primary: "inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
  secondary: "inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
  danger: "inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
};

export default function DevPage() {

    
  const isContractAvailable = myContractAbi && myContractAbi.length > 0;

  // Memoize the filtered functions to avoid re-calculating on every render
  const { readFunctions, writeFunctions, payableFunctions } = useMemo(() => {
    if (!isContractAvailable) return { readFunctions: [], writeFunctions: [], payableFunctions: [] };

    const functions = myContractAbi.filter((item: any) => item.type === 'function') as AbiFunction[];

    return {
      readFunctions: functions.filter(f => f.stateMutability === 'view' || f.stateMutability === 'pure'),
      writeFunctions: functions.filter(f => f.stateMutability === 'nonpayable'),
      payableFunctions: functions.filter(f => f.stateMutability === 'payable'),
    };
  }, [isContractAvailable]);

  if (!isContractAvailable) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold">Contract Dashboard</h1>
            <div className="max-w-md mx-auto bg-yellow-900/50 border border-yellow-700 text-yellow-200 p-6 rounded-lg mt-8">
                <h2 className="text-xl font-semibold mb-2">No Contract Found</h2>
                <p className="text-sm">
                    You did not provide a contract ABI during setup. To enable this dashboard, create <code className="bg-yellow-800/50 px-1 rounded-sm">/contract.abi.json</code> and <code className="bg-yellow-800/50 px-1 rounded-sm">/lib/contract.ts</code> and provide your contract details.
                </p>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Contract Dashboard</h1>
        <p className="mt-3 text-md text-gray-400">
          Interactively test functions from <code className="font-mono bg-slate-700 px-1 rounded">{myContractAddress}</code>
        </p>
        <div className="mt-6 flex justify-center">
          <ConnectWallet />
        </div>
      </header>

      <main className="space-y-8">
        {/* --- READ FUNCTIONS --- */}
        <section className="bg-slate-900/50 border border-slate-700 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-white pb-2 mb-4">
            📖 Read Functions <span className="text-sm font-normal text-gray-400">({readFunctions.length})</span>
          </h2>
          {readFunctions.map((func) => (
            <HookAccordion
              key={getFunctionKey(func)}  
              
              title={func.name}
              description={`Calls the \`${func.name}\` read function.`}
              code={`useReadContract({ ..., functionName: '${func.name}' })`}
              demo={<ReadFunction address={myContractAddress} abi={[func]} functionData={func} />}
              result={<></>}
            />
          ))}
          {readFunctions.length === 0 && <p className="text-gray-400">No read functions found in ABI.</p>}
        </section>

        {/* --- WRITE FUNCTIONS --- */}
        <section className="bg-slate-900/50 border border-slate-700 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-white pb-2 mb-4">
            ✍️ Write Functions <span className="text-sm font-normal text-gray-400">({writeFunctions.length})</span>
          </h2>
           {writeFunctions.map((func) => (
            <HookAccordion
              key={getFunctionKey(func)}
              title={func.name}
              description={`Executes the \`${func.name}\` write function.`}
              code={`useWriteContract({ ..., functionName: '${func.name}' })`}
              demo={<WriteFunction address={myContractAddress} abi={[func]} functionData={func} />}
              result={<></>}
            />
          ))}
          {writeFunctions.length === 0 && <p className="text-gray-400">No write functions found in ABI.</p>}
        </section>
        
        {/* --- PAYABLE FUNCTIONS --- */}
        <section className="bg-slate-900/50 border border-slate-700 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-white pb-2 mb-4">
            💰 Payable Functions <span className="text-sm font-normal text-gray-400">({payableFunctions.length})</span>
          </h2>
           {payableFunctions.map((func) => (
            <HookAccordion
               key={getFunctionKey(func)}
              title={func.name}
              description={`Executes the \`${func.name}\` payable function, sending ETH with the transaction.`}
              code={`useWriteContract({ ..., functionName: '${func.name}', value: parseEther('...') })`}
              demo={<WriteFunction address={myContractAddress} abi={[func]} functionData={func} />}
              result={<></>}  
            />
          ))}
          {payableFunctions.length === 0 && <p className="text-gray-400">No payable functions found in ABI.</p>}
        </section>
      </main>
    </div>
  );
}