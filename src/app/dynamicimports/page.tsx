
import ChartWrapper from '@/components/dynamic/ChartWrapper';
import Stats from '@/components/dynamic/Stats';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Suspense fallback={<p>Loading stats...</p>}>
        <Stats />
      </Suspense>
      <p>importing chart dynamicaly</p>

      <div className="mt-6 border rounded-lg p-4 shadow">
         <Suspense fallback={<p>Loading chart...</p>}>
        <ChartWrapper />
      </Suspense>
      </div>
    </main>
  );
}
