import fs from "fs";
import { execSync } from "child_process";
import moment from "moment";

// ✅ Set your GitHub identity here
const gitUser = "Raghuram Pusala";
const gitEmail = "pusalaraghu24@gmail.com"; // Must match your GitHub profile email

execSync(`git config user.name "${gitUser}"`);
execSync(`git config user.email "${gitEmail}"`);

const startDate = moment("2024-01-01");
const endDate = moment("2025-06-13");

while (startDate.isSameOrBefore(endDate)) {
  const fileName = `daily/${startDate.format("YYYY-MM-DD")}.md`;
  const content = `# DSA Practice - ${startDate.format("YYYY-MM-DD")}\n\n**Question:**\n\n**Answer:**\n`;
  fs.writeFileSync(fileName, content);

  // Set environment variables explicitly for Windows
  const env = {
    ...process.env,
    GIT_AUTHOR_DATE: startDate.format(),
    GIT_COMMITTER_DATE: startDate.format()
  };

  execSync(`git add .`);
  execSync(`git commit -m "DSA log for ${startDate.format("YYYY-MM-DD")}"`, { env });

  startDate.add(1, "day");
}

execSync("git push");
