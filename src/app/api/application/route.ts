//import { hash } from "bcryptjs";
import { getSession } from "next-auth/react";
import clientPromise from "../../../../lib/mongodb";
import { NextRequest,NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const {jobId,name,experience,email,linkedIn,description} = await req.json();
  const client = await clientPromise;
  const applications = client.db().collection("applications");
  
      await applications.insertOne({jobId,name,experience,email,linkedIn,description});
     return NextResponse.json({ message: "application  created" });

 // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}





// ✅ GET all jobs
export async function GET(req:Request) {
  const session=getSession()
   if (!session) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
   const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");
  const client = await clientPromise;
  const applications = client.db().collection("applications");
  const allJobs = await applications.find({jobId:jobId}).toArray();
  return NextResponse.json(allJobs);
}

// ✅ DELETE a job by ID (expects id in query param)
export async function DELETE(req: NextRequest) {
  const client = await clientPromise;
  const session = await getSession();

  if (session?.user?.email !== "admin101@gmail.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const session = await getSession();

   if (!session) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

  const { id,status} = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
  }

  let updatefield={status:status}
  const application = client.db().collection("application");
  await application.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatefield}
  );

  return NextResponse.json({ message: "Job updated" });
}
