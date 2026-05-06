import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export async function GET() {
  const octokit = new Octokit({ auth: process.env.REPO_PAT });
  
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: process.env.REPO_ORG,
      repo: process.env.REPO_NAME,
      path: "submissions",
      ref: "universe", // Your branch
    });

    // GitHub returns an array of file objects
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}