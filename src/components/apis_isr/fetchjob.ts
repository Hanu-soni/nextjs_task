export const fetchJobs = async (setJobs) => {
  try {
    const res = await fetch('/api/jobs/create',{next:{revalidate:3000}});
    const data = await res.json(); // you forgot to parse JSON
    setJobs(data);
  } catch (err) {
    console.error('Error fetching jobs:', err);
  }
};
