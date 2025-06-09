import { useContext, useState } from 'react';
import { WalletContext } from './context/WalletProvider';
import Header from './components/Header';

function App() {
  const { wallet, connectWallet } = useContext(WalletContext);
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header toggleDark={() => setDark(!dark)} />
        <main className="flex flex-col items-center justify-center p-4">
          {!wallet.connected ? (
            <button
              onClick={connectWallet}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-md space-y-4 text-left">
              <div><strong>Address:</strong> {wallet.address}</div>
              {wallet.ens && <div><strong>ENS:</strong> {wallet.ens}</div>}
              <div><strong>Network:</strong> {wallet.network}</div>
              <div><strong>ETH Balance:</strong> {wallet.ethBalance} ETH</div>
              {wallet.daiBalance && (
                <div><strong>DAI Balance:</strong> {wallet.daiBalance} DAI</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
