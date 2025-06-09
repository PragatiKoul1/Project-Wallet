export default function Header({ toggleDark }) {
  return (
    <header className="w-full px-6 py-4 bg-gray-200 dark:bg-gray-700 flex justify-between items-center">
      <h1 className="text-xl font-bold">🔗 Wallet Dashboard</h1>
      <button
        onClick={toggleDark}
        className="bg-gray-300 dark:bg-gray-600 px-3 py-1 rounded"
      >
        Toggle Theme
      </button>
    </header>
  );
}
