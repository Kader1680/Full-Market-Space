"use client"; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetch('http://localhost:8000/api/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      },
    })

      .then(res => res.json())
      .then(data => {
        if (data && data.user) {
          setUser(data.user);
        } else {
          setError('Failed to fetch profile');
        }
      })
      .catch(() => setError('Network error'));
  }, [router]);

  if (error) return <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-red-500">{error}</div>;
  if (!user) return <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
    </div>
  );
}
