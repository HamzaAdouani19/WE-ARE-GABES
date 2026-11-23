import sharp from "sharp";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(
  projectRoot,
  "public/images/gabes_oasis_chenini_1794999255057.jpg",
);
const output = resolve(projectRoot, "public/og.jpg");

await sharp(source)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 85 })
  .toFile(output);

console.log(`Generated ${output}`);
