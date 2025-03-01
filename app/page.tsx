  'use client';

  import { redirect } from 'next/navigation';

  export default function Home() {

    if (true) {
      redirect('/login');
    }

    return (
      <h1>Home</h1>
    );
  }
