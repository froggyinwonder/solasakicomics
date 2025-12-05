const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "..", "writeups");
const output = path.join(__dirname, "..", "writeups.json");

function readingTime(text) {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200); // ~200 WPM
}

function parseMeta(content) {
  const match = content.match(/---([\s\S]*?)---/);
  const body = content.replace(match[0], "").trim();

  const metaLines = match[1].trim().split("\n");
  const meta = {};
  metaLines.forEach(line => {
    const [key, ...rest] = line.split(":");
    meta[key.trim()] = rest.join(":").trim();
  });

  return { meta, body };
}

const files = fs.readdirSync(folder);
const list = [];

files.forEach(file => {
  if (!file.endsWith(".md")) return;

  const full = fs.readFileSync(path.join(folder, file), "utf8");
  const { meta, body } = parseMeta(full);

  list.push({
    slug: file.replace(".md", ""),
    title: meta.title,
    subtitle: meta.subtitle,
    date: meta.date,
    readingTime: readingTime(body),
  });
});

fs.writeFileSync(output, JSON.stringify(list, null, 2));
console.log("✔ writeups.json updated");
