
"use client"


interface Job {
  _id: string;
  title: string;
  jobDescription: string;
  experience: string;
  location: string;
  category: string;
}


import { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';
// import JobWrap from '../jobs/jobwrap';
// import JobsPage from '../jobs/joblist';
import { Metadata } from 'next';
import { fetchJobs } from '@/components/apis_isr/fetchjob';




export default function AdminDashboard() {
  const [sessionValue, setSessionValue] = useState<string | null>(null);

 
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    jobDescription: '',
    experience: '',
    location: '',
    category: ''
  });
   const [applyformData, setapplyFormData] = useState({
    name:'',
    experience:'',
    email:'',
    linkedIn:'',
    description:''
  });
  const [errors, setErrors] = useState({ title:'',
      jobDescription:'',
      experience:'',
      location:'',
      category:''});
  const [isEditing, setIsEditing] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [showApply,setShowApply]=useState(false)

  useEffect(() => {
    fetchJobs(setJobs);
  }, []);


   useEffect(() => {
    const value = sessionStorage.getItem('role');
    setSessionValue(value);
  }, []);

  

  const validate = () => {
    const errs = {
      title:'',
      jobDescription:'',
      experience:'',
      location:'',
      category:''
    };
    if (!formData.title) errs.title = 'Title is required';
    if (!formData.jobDescription) errs.jobDescription = 'Description is required';
    if (!formData.experience) errs.experience = 'Experience is required';
    if (!formData.location) errs.location = 'Location is required';
    if (!formData.category) errs.category = 'Category is required';
    //if (!applyformData.name) errs.category = 'name is required';
    //if (!formData.category) errs.category = 'Category is required';
    //if (!formData.category) errs.category = 'Category is required';
    // if (!formData.category) errs.category = 'Category is required';
    // if (!formData.category) errs.category = 'Category is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
  //  if (!validate()) return;
    console.log(formData,".....61")
    try {
      // if(sessionStorage.getItem('role')==='admin'){  
      // }

      console.log(sessionStorage.getItem('role'),".......51")

      if (isEditing) {
        await axios.put(`/api/jobs/create`, formData);
      } else {
        await axios.post('/api/jobs/create', formData);
      }
     

      fetchJobs();
      resetForm();
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  const handleSaveApplication = async () => {
    //if (!validate()) return;

    try {
      // if(sessionStorage.getItem('role')==='admin'){  
      // }
      //debugger
     // console.log(sessionStorage.getItem('role'),".......51")

     
        //await axios.post(`/api/application?jobId=${editingJobId}`);
        await axios.post(`/api/application`,{...applyformData,jobId:editingJobId},);

      } 
     catch (err) {
      console.error('Error saving job:', err);
    }
  };


  const handleDelete = async (_id:string) => {
    try {
      //let data={id:id};
      await axios.delete('/api/jobs/create', {
      data: { _id },
    });
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const handleEdit = (job:Job) => {
    setFormData(job);
    setIsEditing(true);
    setEditingJobId(job._id);
    setShowForm(true);
  };



  const resetForm = () => {
    setFormData({
      title: '',
      jobDescription: '',
      experience: '',
      location: '',
      category: ''
    });
    setErrors({
  title: '',
  jobDescription: '',
  experience: '',
  location: '',
  category: ''
}
);
    setIsEditing(false);
    setEditingJobId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        {
          sessionValue==='admin' && <h1 className="text-2xl font-bold">Admin Job Dashboard</h1>
        }
        {
         sessionValue==='user' && <h1 className="text-2xl font-bold">User Dashboard</h1>
        }
       {
       sessionValue==='admin' &&  <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Job
        </button>
       }
         <button
          onClick={() =>{
            sessionStorage.clear();
            router.push('/signin')
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          log out
        </button>
        
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded shadow-md mb-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div>
              <label className="block font-medium">Experience</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
            </div>
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
            <div>
              <label className="block font-medium">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium">Job Description</label>
              <textarea
                value={formData.jobDescription}
                onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {errors.jobDescription && <p className="text-red-500 text-sm">{errors.jobDescription}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={resetForm} className="px-4 py-2 rounded border">Cancel</button>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              {isEditing ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      )}


      {
        showApply &&

        <div className="bg-white p-6 rounded shadow-md mb-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={applyformData?.name}
                onChange={(e) => setapplyFormData({ ...applyformData, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {/* {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>} */}
            </div>
            <div>
              <label className="block font-medium">Experience</label>
              <input
                type="text"
                value={applyformData.experience}
                onChange={(e) => setapplyFormData({ ...applyformData, experience: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {/* {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>} */}
            </div>
            <div>
              <label className="block font-medium">email</label>
              <input
                type="email"
                value={applyformData?.email}
                onChange={(e) => setapplyFormData({ ...applyformData, email: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {/* {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}
            </div>
            <div>
              <label className="block font-medium">linkedIn</label>
              <input
                type="text"
                value={applyformData.linkedIn}
                onChange={(e) => setapplyFormData({ ...applyformData,linkedIn : e.target.value })}
                className="w-full border p-2 rounded"
              />
              {/* {errors.linkedIn && <p className="text-red-500 text-sm">{errors.linkedIn}</p>} */}
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium">candidate Description</label>
              <textarea
                value={applyformData.description}
                onChange={(e) => setapplyFormData({ ...applyformData, description: e.target.value })}
                className="w-full border p-2 rounded"
              />
              {/* {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>} */}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={resetForm} className="px-4 py-2 rounded border">Cancel</button>
            <button onClick={()=>setShowApply(false)} className="px-4 py-2 rounded border">Back</button>
            <button
              typeof='submit'
              onClick={handleSaveApplication}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
        
      }

      {/* JOB CARDS */}
      {
        jobs.map((job)=>(
          <div key={job._id} className="bg-white shadow-md rounded p-4">
            <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
            <p className="text-sm text-gray-600 mb-1"><strong>Experience:</strong> {job.experience}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {job.category}</p>
            <p className="text-sm text-gray-800 mt-2">{job.jobDescription}</p>

            <div className="flex justify-end gap-2 mt-4">
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
            </div>
        </div>
          
        ))
      }
       
    </div>
  );
}
