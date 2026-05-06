import { Octokit } from "@octokit/rest"
import { randomUUID } from "node:crypto"

export default async function addtodb(pgn) {
  const pat = process.env.REPO_PAT;
  const name = process.env.REPO_NAME;
  const org = process.env.REPO_ORG;

  // 1. Initialize Octokit
  const octokit = new Octokit({ auth: pat });

  try {
    // 2. DEBUG: Let's see if we can even reach the repo
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`✅ Authenticated as: ${user.login}`);

    const { data: repo } = await octokit.rest.repos.get({ owner: org, repo: name });
    console.log(`✅ Target Repo Found: ${repo.full_name}`);
    console.log(`✅ Default Branch is: ${repo.default_branch}`);

    // 3. The actual Upload
    const fileName = `submissions/sub-${randomUUID()}.txt`;
    
    // Using .rest.repos to be safe with newer Octokit versions
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: org,
      repo: name,
      path: fileName,
      message: "feat: add submission",
      content: Buffer.from(pgn).toString("base64"),
      branch: repo.default_branch, // Dynamically use the branch we just confirmed
    });
    
    console.log("🚀 Upload Success!");
    return { success: true };

  } catch (error) {
    console.error("❌ GitHub Error Details:");
    console.error("Status:", error.status);
    console.error("Message:", error.message);
    
    if (error.status === 404) {
      console.error("Hint: 404 usually means the Token lacks 'repo' scope or the Repo/Owner names are mismatched.");
    }
    
    return { success: false, error: error.message };
  }
}