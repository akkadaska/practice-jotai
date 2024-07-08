import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Hello, Jotai!</h1>
      <p>This is my practice project to learn Jotai.</p>
      <Link href="/single-resource-mutation">
        Single Resource Mutation Pattern
      </Link>
    </main>
  );
}
