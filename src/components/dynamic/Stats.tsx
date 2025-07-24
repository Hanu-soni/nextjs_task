// app/dashboard/components/Stats.tsx
export default async function Stats() {
  await new Promise((res) => setTimeout(res, 2000)); // simulate slow fetch
  return <p>🚀 Stats loaded!</p>;
}
