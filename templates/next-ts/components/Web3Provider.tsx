"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function Web3Provider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: any;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}