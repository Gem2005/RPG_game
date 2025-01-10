import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to RPG Game</h1>
      <Link href="/game">
        <div className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Start Game
        </div>
      </Link>
    </div>
  );
}
