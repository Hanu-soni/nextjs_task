// app/blog/[slug]/error.tsx
'use client';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
      <p className="mt-4">{error.message}</p>
    </div>
  );
}
