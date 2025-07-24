// components/ChartWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Chart component (client-only)
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

export default function ChartWrapper() {
  return <Chart />;
}
