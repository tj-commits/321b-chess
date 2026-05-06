'use client';

import { useRouter } from 'next/navigation';

export default function MyComponent() {
  const router = useRouter();

  const handleAction = () => {
    // Perform some logic...
    router.push('/submit'); // Adds to history
    // or router.replace('/dashboard'); // Replaces current history entry
  };

  return <button onClick={handleAction}>Go to Dashboard</button>;
}
