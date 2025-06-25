import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white flex-col">
      <h1 className="text-4xl font-bold">Welcome to the quiz!</h1>
      <Link href="/quiz">
        <button className="px-2 py-3 my-6 rounded-md bg-blue-600 text-white hover:bg-orange-600 transition">Click here to start!</button>
      </Link>    
    </main>
  );
}
