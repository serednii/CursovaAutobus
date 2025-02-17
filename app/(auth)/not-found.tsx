import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-800">404 🧐</h1>
      <p className="text-gray-500">Сторінку не знайдено</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        На головну 🏠
      </Link>
    </div>
  );
}
