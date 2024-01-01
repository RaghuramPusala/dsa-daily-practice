import fs from "fs";
import { execSync } from "child_process";
import moment from "moment";

// CONFIG — CHANGE THIS TO YOUR ACTUAL EMAIL
const gitUser = "Raghuram Pusala";
const gitEmail = "pusalaraghu24@gmail.com"; // Your GitHub email

execSync(`git config user.name "${gitUser}"`);
execSync(`git config user.email "${gitEmail}"`);

const startDate = moment("2024-01-01");
const endDate = moment("2025-06-13");

const skipChance = 0.20;
const multiCommitChance = 0.10;

while (startDate.isSameOrBefore(endDate)) {
  const date = startDate.format("YYYY-MM-DD");

  if (Math.random() > skipChance) {
    const fileName = `daily/${date}.md`;
    const content = `# DSA Practice - ${date}\n\n**Question:**\n\n**Answer:**\n`;

    fs.writeFileSync(fileName, content);
    execSync(`git add .`);

    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: `${date}T12:00:00`,
      GIT_COMMITTER_DATE: `${date}T12:00:00`
    };

    execSync(`git commit -m "DSA log for ${date}"`, { env });

    if (Math.random() < multiCommitChance) {
      fs.appendFileSync(fileName, `\n\n🟢 Extra note for ${date}`);
      execSync(`git add .`);
      const env2 = {
        ...process.env,
        GIT_AUTHOR_DATE: `${date}T15:00:00`,
        GIT_COMMITTER_DATE: `${date}T15:00:00`
      };
      execSync(`git commit -m "Second DSA update for ${date}"`, { env: env2 });
    }
  }

  startDate.add(1, "day");
}

execSync("git push");
