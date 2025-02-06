import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/background.jpg')`, // Replace with your game background image
      }}
    >
      <h1 className="text-6xl text-white font-bold mb-8 shadow-md text-center" style={{ textShadow: '2px 2px 4px #000000' }}>
        Welcome to RPG Game
      </h1>
      <Link href="/game">
        <div className="mt-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-red-500 hover:to-yellow-500 shadow-lg text-xl font-semibold"
          style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          Start Game
        </div>
      </Link>
    </div>
  );
}
