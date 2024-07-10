import { getServerSession } from "next-auth";
// import connectDB from "path to db function";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // await connectDB();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
      return NextResponse.json({
        error: true,
        status: 404,
        message: "You are not authenticated",
      });
    }
    // GET TASKS FROM DB
    const tasks: unknown = [];

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      tasks,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const res = await request.json();
    const session = await getServerSession();
    
    const user = session?.user;

    if (!session || !user) {
      console.log('unauthenticated')
      return NextResponse.json({
        error: true,
        status: 404,
        message: "You are not authenticated",
      });
    }

    // SET CUSTOM FIELDS ON SESSION
    session.custom = 6
    // CREATE TASK
    const task = {};
    console.log({ss: session})

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Success",
      task,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      status: 400,
      message: (error as Error).message || "Something Wen't wrong",
    });
  }
}
