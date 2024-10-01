import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <Link href="/users" className="text-blue-500">
        Users Directory
      </Link>
    </div>
  );
}
