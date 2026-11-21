#!/usr/bin/env node
/**
 * T.O.P by HAI: idempotent GitHub Projects v2 bootstrap.
 * Run with a token that can create/edit Projects for HOMELANDAI.
 * Requires GitHub CLI 'gh' (preinstalled on GitHub-hosted Ubuntu runners).
 *
 * Does not store tokens in files. Uses GH_TOKEN in subprocess environment.
 */
import { execFileSync } from "node:child_process";

const owner = process.env.PROJECT_OWNER || "HOMELANDAI";
const repo = process.env.PROJECT_REPO || "Taste-Of-Paradise";
const fullRepo = `${owner}/${repo}`;
const title = process.env.PROJECT_TITLE || "T.O.P by HAI — Taste of Paradise | Implementation";
const token = process.env.GH_PROJECTS_TOKEN || process.env.GH_TOKEN;

if (!token) {
  console.error("Missing GH_PROJECTS_TOKEN (or GH_TOKEN). No project has been created.");
  process.exit(2);
}

function gh(...args) {
  try {
    return execFileSync("gh", args, {
      encoding: "utf8",
      env: { ...process.env, GH_TOKEN: token, GITHUB_TOKEN: token },
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 10 * 1024 * 1024
    }).trim();
  } catch (e) {
    console.error(`GitHub CLI failed: gh ${args.map(a => JSON.stringify(a)).join(" ")}`);
    console.error(e.stderr?.toString() || e.message);
    throw e;
  }
}

function json(...args) {
  const result = gh(...args);
  return result ? JSON.parse(result) : {};
}

function getProjects() {
  const result = json("project", "list", "--owner", owner, "--limit", "100", "--format", "json");
  return Array.isArray(result) ? result : (result.projects || []);
}

function getFields(number) {
  const result = json("project", "field-list", String(number), "--owner", owner, "--format", "json", "--limit", "100");
  return Array.isArray(result) ? result : (result.fields || []);
}

function ensureSelect(number, name, options) {
  if (getFields(number).some(f => f.name === name)) {
    console.log(`Reusing existing field: ${name}`);
    return;
  }
  gh("project", "field-create", String(number), "--owner", owner, "--name", name,
    "--data-type", "SINGLE_SELECT", "--single-select-options", options.join(","));
  console.log(`Created field ${name}`);
}

function getItems(number) {
  const result = json("project", "item-list", String(number), "--owner", owner, "--limit", "200", "--format", "json");
  return Array.isArray(result) ? result : (result.items || []);
}

let project = getProjects().find(p => p.title === title);
if (!project) {
  console.log(`Creating GitHub Projects board: ${title}`);
  project = json("project", "create", "--owner", owner, "--title", title, "--format", "json");
} else {
  console.log(`Existing GitHub Projects board found: ${project.url || project.number}`);
}
const number = project.number;
if (!number) throw new Error("GitHub CLI did not return a project number.");

const description = [
  "Taste of Paradise by HomelandAI — complete ten-phase software and rooftop production program.",
  "Cook. Vote. Collect.",
  "Board source: GitHub Issues in " + fullRepo,
  "Phase 0 Discovery → Phase 9 Launch; see docs/project/MASTER-IMPLEMENTATION-PLAN.md."
].join("\n");

gh("project", "edit", String(number), "--owner", owner,
  "--description", description,
  "--readme", [
    "## T.O.P by HAI implementation",
    "Milestone gates P0–P9 cover strategy, design, Supabase infrastructure, Recipe Vault, taste testers,",
    "Sear Stage, Menu Lab, Twitch/Maestro, loyalty, sponsors, NCRD/AUKI, QA, pilot and launch.",
    "Use **Phase** to group tasks and **Priority** to sequence work.",
    "All issues require documented acceptance tests and evidence before moving to Done.",
    "Repository: https://github.com/" + fullRepo
  ].join("\n"));
ensureSelect(number, "Phase", Array.from({ length: 10 }, (_, n) => `P${n}`));
ensureSelect(number, "Priority", ["P0 - Critical", "P1 - High", "P2 - Planned"]);
ensureSelect(number, "Domain", [
  "Governance", "Design", "Platform", "Content", "Community",
  "Live", "Loyalty", "Partnerships", "QA", "Launch"
]);

try {
  gh("project", "link", String(number), "--owner", owner, "--repo", fullRepo);
  console.log("Project linked to repository.");
} catch (e) {
  console.warn("Repository link may already exist or need extra permissions. Continuing to add issues.");
}

const issues = json("issue", "list", "--repo", fullRepo, "--state", "open",
  "--limit", "100", "--json", "number,title,url");
const issueList = Array.isArray(issues) ? issues : [];
let current = getItems(number);
let knownUrls = new Set(current.map(i => i.content?.url || i.content?.html_url).filter(Boolean));
let added = 0, updated = 0, failed = [];
const domains = {
  P0: "Governance", P1: "Design", P2: "Platform", P3: "Content",
  P4: "Community", P5: "Live", P6: "Loyalty", P7: "Partnerships",
  P8: "QA", P9: "Launch"
};

for (const issue of issueList) {
  const match = issue.title.match(/^\[(P[0-9])\]/);
  if (!match) {
    console.log(`Skipping non-phased issue #${issue.number}`);
    continue;
  }
  const phase = match[1];
  const priority = Number(phase.slice(1)) <= 2 ? "P0 - Critical" : "P1 - High";
  try {
    if (!knownUrls.has(issue.url)) {
      gh("project", "item-add", String(number), "--owner", owner, "--url", issue.url);
      added++;
      knownUrls.add(issue.url);
    }
    for (const [field, value] of [
      ["Phase", phase], ["Priority", priority], ["Domain", domains[phase]]
    ]) {
      gh("project", "item-edit", String(number), "--owner", owner,
        "--url", issue.url, "--field", field, "--value", value);
    }
    updated++;
    console.log(`Linked #${issue.number} ${phase}: ${issue.title}`);
  } catch (e) {
    failed.push(`#${issue.number}: ${e.message}`);
  }
}

const url = project.url || `https://github.com/users/${owner}/projects/${number}`;
console.log(`Project URL: ${url}`);
console.log(`Added ${added} items and assigned phase/priority/domain to ${updated} items.`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const { appendFileSync } = await import("node:fs");
  appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    `## T.O.P GitHub Project\n\nProject: [${title}](${url})\n\n- New issues added: ${added}\n- Issues updated: ${updated}\n- Failures: ${failed.length}\n`);
}
if (failed.length) {
  console.error("Incomplete project setup:", failed.join("\n"));
  process.exitCode = 1;
}
