import React from 'react'
import { Job } from '../../../app/types/index';
import axios from 'axios';

interface JobCardProps {
    job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {



    return (
        <div key={job._id} className="bg-white shadow-md rounded p-4">
            <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
            <p className="text-sm text-gray-600 mb-1"><strong>Experience:</strong> {job.experience}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {job.category}</p>
            <p className="text-sm text-gray-800 mt-2">{job.jobDescription}</p>

            {/* <div className="flex justify-end gap-2 mt-4">
              {
                sessionStorage.getItem('role')==='admin'?
                <>
                <button
                onClick={() => handleEdit(job)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
               <button
                onClick={() =>router.push(`/applications/${job._id}`)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                applicants
              </button>
                </>
                :
                <>
                 <button
                onClick={() =>{
                  setShowApply(true);
                  setEditingJobId(job._id)
                  
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Apply
              </button>
                </>
              }
            </div> */}
        </div>
    )
}
