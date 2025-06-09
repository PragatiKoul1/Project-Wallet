import { createContext, useState } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

const DAI_CONTRACT = {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI mainnet
  abi: [
    'function balanceOf(address owner) view returns (uint256)',
    'function symbol() view returns (string)',
  ],
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    address: '',
    network: '',
    ethBalance: '',
    daiBalance: '',
    ens: '',
    connected: false,
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install it: https://metamask.io/download.html');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(address);
      const ethBalance = ethers.utils.formatEther(balance);

      let ensName = '';
      try {
        ensName = await provider.lookupAddress(address);
      } catch {}

      let daiBalance = '';
      try {
        const dai = new ethers.Contract(DAI_CONTRACT.address, DAI_CONTRACT.abi, provider);
        const daiRaw = await dai.balanceOf(address);
        daiBalance = ethers.utils.formatUnits(daiRaw, 18);
      } catch {}

      setWallet({
        address,
        network: network.name,
        ethBalance,
        daiBalance,
        ens: ensName,
        connected: true,
      });

      window.ethereum.on('accountsChanged', connectWallet);
      window.ethereum.on('chainChanged', () => window.location.reload());
    } catch (err) {
      console.error(err);
      alert('Failed to connect wallet.');
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
