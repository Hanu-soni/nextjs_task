//import { hash } from "bcryptjs";
import { getSession } from "next-auth/react";
import clientPromise from "../../../../../lib/mongodb";
import { NextRequest,NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const { title,jobDescription,experience,location,category} = await req.json();
  const client = await clientPromise;
  const jobs = client.db().collection("jobs");
  const session=await getSession();
  console.log(session);
      await jobs.insertOne({title,jobDescription,experience,location,category});
     return NextResponse.json({ message: "Job  created" });

 // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}





// ✅ GET all jobs
export async function GET() {

  // const session=await getSession();
  // if(!session){
  //   return NextResponse.json({status:401,message:'unauthorized'})
  // }
  const client = await clientPromise;
  const jobs = client.db().collection("jobs")
  const allJobs = await jobs.find({}).toArray();
  return NextResponse.json(allJobs);
}

// ✅ DELETE a job by ID (expects id in query param)
export async function DELETE(req: NextRequest) {
  const client = await clientPromise;
  const session = await getSession();

  // if (session?.user?.email !== "admin101@gmail.com") {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  //const { searchParams } = new URL(req.url)
  const {id} = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
  }

  const jobs = client.db().collection("jobs");
  await jobs.deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ message: "Job deleted" });
}

// ✅ PUT update a job (expects JSON body with `id` and updated fields)
export async function PUT(req: Request) {
  const client = await clientPromise;
  //const session = await getSession();

  // if (session?.user?.email !== "admin101@gmail.com") {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
//debugger
  const { ...updateFields } = await req.json();
  console.log(updateFields,".....65")
  if (!updateFields._id) {
    return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
  }


  let updateObject={title:updateFields.title ,
  jobDescription: updateFields.jobDescription ,
  experience: updateFields.experience ,
  location: updateFields.location ,
  category: updateFields.category ,
  }
  const jobs = client.db().collection("jobs");
  await jobs.updateOne(
    { _id: new ObjectId(updateFields._id) },
    { $set: updateObject }
  );

  return NextResponse.json({ message: "Job updated" });
}
