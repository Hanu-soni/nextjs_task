// app/jobs/page.tsx (Server Component)
import { JobCard } from '@/components/server/jobs/jobcard';
import { Job } from '../types/index';

export const revalidate = 60; // Revalidate every 60s

export default async function JobsPage() {
  const res =await fetch('http://localhost:3000/api/jobs/create', {
  next: { revalidate: 60 },
});

  const jobs: Job[] = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}
