import { ConnectWallet } from "@/components/ConnectWallet"; // Import ConnectWallet component
import Link from "next/link"; // Import Link from Next.js

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="absolute top-0 right-0 p-6">
        <ConnectWallet />
      </div>

      <div className="space-y-6">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Welcome to Your Dapp
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-gray-300">
          This starter template is equipped with Next.js, Wagmi, Tailwind CSS, and a
          pre-configured developer playground to jumpstart your web3 project.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/dev"
          className="rounded-md bg-sky-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 transition-all duration-150 ease-in-out transform hover:scale-105"
        >
          Explore Wagmi Hooks →
        </Link>
      </div>

      <div className="absolute bottom-8 text-gray-500 text-sm">
        <p>Start by editing <code>app/page.tsx</code></p>
      </div>
    </main>
  );
}