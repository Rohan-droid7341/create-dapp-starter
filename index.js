#!/usr/bin/env node

// --- FIX: Use `require` for CommonJS and built-in modules at the top ---
const fs = require('fs-extra');
const path = require('path');
// --- END OF FIX ---

// Helper function to check for valid JSON
const isJson = (str) => {
  try { JSON.parse(str); } catch (e) { return false; }
  return true;
};

// A reliable map to get the correct Alchemy network endpoint.
const alchemyEndpoints = {
    '1': 'eth-mainnet',
    '11155111': 'eth-sepolia',
    '137': 'polygon-mainnet',
    '80001': 'polygon-mumbai',
    '42161': 'arb-mainnet',
    '10': 'opt-mainnet',
    '8453': 'base-mainnet',
};

const main = async () => {
  // --- FIX: Only use dynamic import for pure ESM packages ---
  const { default: chalk } = await import('chalk');
  const { default: inquirer } = await import('inquirer');
  // --- END OF FIX ---

  console.log(chalk.bold.hex('#9945FF')('\nWelcome to the Dapp Starter Kit! 🚀\n'));

  const questions = [
    { type: 'input', name: 'projectName', message: 'What is the name of your project?', validate: (input) => /^([A-Za-z\-\_\d])+$/.test(input) || 'Project name is invalid.' },
    { type: 'list', name: 'framework', message: '1. Choose your frontend framework:', choices: ['Next.js (App Router)'] },
    { type: 'list', name: 'language', message: '2. Choose your language:', choices: ['TypeScript'] },
    { type: 'input', name: 'walletConnectId', message: `3. Enter your WalletConnect Project ID (get one at ${chalk.cyan('https://cloud.walletconnect.com/')}) :`, default: 'ADD_LATER' },
    { type: 'checkbox', name: 'chains', message: '4. Select the chains you want to support:', choices: [ { name: 'Sepolia (Testnet)', value: 'sepolia', checked: true }, { name: 'Ethereum Mainnet', value: 'mainnet' }, { name: 'Polygon', value: 'polygon' }, { name: 'Arbitrum One', value: 'arbitrum' }], validate: (answer) => (answer.length < 1 ? 'You must choose at least one chain.' : true) },
    { type: 'input', name: 'alchemyKey', message: `5. Enter your Alchemy API Key (get one at ${chalk.cyan('https://www.alchemy.com/')}) :`, default: 'ADD_LATER' },
    { type: 'input', name: 'contractAddress', message: '6. Paste your deployed contract address (or press Enter to do it later):', default: 'ADD_LATER' },
    { type: 'editor', name: 'contractAbi', message: 'Paste your contract ABI (JSON format):', when: (answers) => answers.contractAddress !== 'ADD_LATER', validate: (input) => (isJson(input) ? true : 'Please enter a valid JSON ABI.'), filter: (input) => JSON.stringify(JSON.parse(input)) },
  ];

  const answers = await inquirer.prompt(questions);
  const { projectName, contractAddress, contractAbi } = answers;

  const langKey = 'ts';
  const templateDir = path.join(__dirname, 'templates', `next-${langKey}`);
  const projectPath = path.join(process.cwd(), projectName);

  console.log(chalk.green(`\nCreating a new dApp in ${chalk.bold(projectPath)}...`));
  fs.ensureDirSync(projectPath);
  fs.copySync(templateDir, projectPath);


  
  // 1. This will create wagmi.ts
  const chainImports = answers.chains.join(', ');
  const wagmiConfigTemplate = `
import { http, createConfig } from 'wagmi';
import { ${chainImports} } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

if (!projectId) throw new Error("WalletConnect Project ID is not set in .env.local");
if (!alchemyKey) throw new Error("Alchemy Key is not set in .env.local");

const supportedChains = [${chainImports}];
const alchemyEndpoints = ${JSON.stringify(alchemyEndpoints, null, 2)};

const transports = Object.fromEntries(
  supportedChains.map(chain => {
     const endpoint = alchemyEndpoints[String(chain.id) as keyof typeof alchemyEndpoints];
    const rpcUrl = endpoint ? \`https://\${endpoint}.g.alchemy.com/v2/\${alchemyKey}\` : undefined;
    return [chain.id, http(rpcUrl)];
  })
);

export const config = createConfig({
  chains: supportedChains,
  connectors: [
    walletConnect({ projectId }),
  ],
  transports,
});
`;

   const libDirPath = path.join(projectPath, 'lib');
fs.ensureDirSync(libDirPath); 


const wagmiConfigPath = path.join(libDirPath, `wagmi.${langKey}`); 

fs.writeFileSync(wagmiConfigPath, wagmiConfigTemplate.trim());

  // 2. this will create contract.ts
  if (contractAddress !== 'ADD_LATER' && contractAbi) {
    console.log(chalk.blue('Configuring your smart contract...'));
    const contractInfoTemplate = `import { type Address } from 'viem';\nimport abiJson from '../contract.abi.json';\n\nexport const myContractAddress = '${contractAddress}' as Address;\nexport const myContractAbi = abiJson ;`;
    fs.writeFileSync(path.join(projectPath, 'lib', `contract.${langKey}`), contractInfoTemplate.trim());
    fs.writeFileSync(path.join(projectPath, 'contract.abi.json'), JSON.stringify(JSON.parse(contractAbi), null, 2));
  }

  
  // 3. This will  create the .env.local file.
  const envTemplate = `
# WalletConnect Project ID from https://cloud.walletconnect.com/
NEXT_PUBLIC_WC_PROJECT_ID=${answers.walletConnectId}

# Alchemy API Key from https://www.alchemy.com/
NEXT_PUBLIC_ALCHEMY_KEY=${answers.alchemyKey}
`;
  fs.writeFileSync(path.join(projectPath, '.env.local'), envTemplate.trim());
  
  
  const gitignoreContent = "\n# Environment variables\n.env.local\n";
  fs.appendFileSync(path.join(projectPath, '.gitignore'), gitignoreContent);
  



  console.log(chalk.bold.green('\n✅ Success! Your project is ready.'));
  console.log(chalk.yellow('\nIMPORTANT: Your API keys have been saved to a new `.env.local` file.'));
  console.log(chalk.yellow('This file is ignored by Git and should NOT be committed.'));
  
  console.log('\nNext steps:');
  console.log(chalk.cyan(`  cd ${projectName}`));
  console.log(chalk.cyan('  npm install'));
  console.log(chalk.cyan('  npm run dev'));
};

main().catch(console.error);