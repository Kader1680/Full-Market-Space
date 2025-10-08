import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-xl">Full Market Space</div>
      <div className="space-x-4">
        <Link href="/login" className="hover:underline">Login</Link>
        <Link href="/register" className="hover:underline">Register</Link>
        <Link href="/profile" className="hover:underline">Profile</Link>
      </div>
    </nav>
  );
}
