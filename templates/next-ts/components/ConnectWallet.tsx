"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useMemo, useState, useEffect } from "react"; 

export function ConnectWallet() {

  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);
 

  const { address, isConnected, connector } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const truncatedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);


  if (!isClient) {
    return null; 
     }

  if (isConnected) {
    return (
      <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
        <div className="flex flex-col text-left">
          <span className="font-mono text-lg">{truncatedAddress}</span>
          <span className="text-xs text-gray-400">Connected via {connector?.name}</span>
        </div>
        <button 
            onClick={() => disconnect()} 
            className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {connectors.map((c) => (
        <button 
            key={c.uid} 
            onClick={() => connect({ connector: c })} 
            className="px-4 py-2 font-semibold text-white bg-sky-500 rounded-md hover:bg-sky-600 transition-colors"
        >
          Connect with {c.name}
        </button>
      ))}
    </div>
  );
}