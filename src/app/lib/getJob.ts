// lib/getJobs.ts
import { Job } from '../types/index';

export async function getJobs(): Promise<Job[]> {
  const res = await fetch('http://localhost:3000/api/jobs/create', {
    cache: 'no-store',
  });
  return res.json();
}
