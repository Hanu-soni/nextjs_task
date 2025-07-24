"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [role, setRole] = useState(null);
  const params = useParams();

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`/api/application?jobId=${params.id}`);
      setApplications(res.data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };


  const updateStatus=async(status,id)=>{
    try{
      const res = await axios.put(`/api/application`,{status:status,id:id});
      if(res.status===200){
        toast.success('status updated');
      }
    }catch(err){
       toast.error('status not updated');
    }
  }

  useEffect(() => {
    fetchJobs();
    const storedRole = sessionStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <div className="p-4">
      {applications.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No applicants found for this job.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((user) => (
            <div key={user._id} className="bg-white shadow-md rounded p-4">
              <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Experience:</strong> {user.experience}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={user.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Profile
                </a>
              </p>
              <p className="text-sm text-gray-800 mt-2">{user.description}</p>

              <div className="flex justify-end gap-2 mt-4">
                {role === "admin" ? (
                  <>
                    <button onClick={()=>updateStatus('approved',applications._id)} className="px-3 py-1 bg-green-600 text-white rounded">
                      Approve
                    </button>
                    <button onClick={()=>updateStatus('rejected',applications._id)}  className="px-3 py-1 bg-red-600 text-white rounded">
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      user.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : user.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status || "Pending"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
