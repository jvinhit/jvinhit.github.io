import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../..'
);
const articlePath = path.resolve(
  repoRoot,
  process.argv[2] ?? 'src/content/posts/react-01-ui-as-value.mdx'
);
const markdown = fs.readFileSync(articlePath, 'utf8');
const failures = [];

const sourceBlocks = [
  ...markdown.matchAll(/\*\*`([^`]+)`\*\*\n\n```(ts|tsx)\n([\s\S]*?)\n```/g),
];
const typedFenceCount = markdown.match(/^```(?:ts|tsx)$/gm)?.length ?? 0;

if (sourceBlocks.length !== typedFenceCount) {
  failures.push(
    `${typedFenceCount - sourceBlocks.length} TypeScript block(s) lack a path annotation`
  );
}

for (const [, relativePath, , snippet] of sourceBlocks) {
  const sourcePath = path.resolve(repoRoot, relativePath);

  if (!sourcePath.startsWith(`${repoRoot}${path.sep}`)) {
    failures.push(`source path escapes the repository: ${relativePath}`);
    continue;
  }

  if (!fs.existsSync(sourcePath)) {
    failures.push(`missing snippet source: ${relativePath}`);
    continue;
  }

  const source = fs.readFileSync(sourcePath, 'utf8').trimEnd();
  if (source !== snippet.trimEnd()) {
    failures.push(`snippet drift: ${relativePath}`);
  }
}

const internalLinks = [...markdown.matchAll(/\]\(\/blog\/([^/)]+)\/\)/g)].map(
  (match) => match[1]
);

if (internalLinks.length < 2 || internalLinks.length > 4) {
  failures.push(`expected 2–4 internal links, found ${internalLinks.length}`);
}

for (const slug of internalLinks) {
  const target = path.join(repoRoot, 'src/content/posts', `${slug}.mdx`);
  if (!fs.existsSync(target)) {
    failures.push(`missing internal-link target: ${slug}`);
  }
}

const diagramLines = [
  ...markdown.matchAll(/```text\n([\s\S]*?)\n```/g),
].flatMap((match) => match[1].split('\n'));
const widestDiagramLine = Math.max(
  0,
  ...diagramLines.map((line) => [...line].length)
);

if (widestDiagramLine > 78) {
  failures.push(`ASCII diagram line is ${widestDiagramLine} columns wide`);
}

const prose = markdown
  .replace(/^---[\s\S]*?---/m, '')
  .replace(/```[\s\S]*?```/g, '')
  .replace(/https?:\/\/\S+/g, '');
const proseWords = prose.match(/[\p{L}\p{N}_-]+/gu)?.length ?? 0;

if (proseWords < 2200 || proseWords > 2800) {
  failures.push(`prose word count ${proseWords} is outside 2,200–2,800`);
}

const exerciseCount = markdown.match(/^### Bài \d+/gm)?.length ?? 0;
if (exerciseCount < 2 || exerciseCount > 3) {
  failures.push(`expected 2–3 exercises, found ${exerciseCount}`);
}

const failureModeCount = markdown.match(/^### 6\.\d+/gm)?.length ?? 0;
if (failureModeCount < 2 || failureModeCount > 4) {
  failures.push(`expected 2–4 failure modes, found ${failureModeCount}`);
}

if (markdown.includes('TODO(verify)')) {
  failures.push('article still contains TODO(verify)');
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    [
      `Validated ${path.relative(repoRoot, articlePath)}`,
      `${proseWords} prose words`,
      `${sourceBlocks.length} source-backed snippets`,
      `${internalLinks.length} internal links`,
      `${failureModeCount} failure modes`,
      `${exerciseCount} exercises`,
      `widest ASCII line: ${widestDiagramLine}/78`,
    ].join(' · ')
  );
}
