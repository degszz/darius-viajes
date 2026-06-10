import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const svgPath = resolve(root, "public", "og-image.svg");
const pngPath = resolve(root, "public", "og-image.png");

async function main() {
  if (!existsSync(svgPath)) {
    console.log("og-image.svg not found, skipping PNG generation.");
    return;
  }

  try {
    const sharp = (await import("sharp")).default;
    const svgBuffer = readFileSync(svgPath);
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png()
      .toFile(pngPath);
    console.log(`og-image.png generated (1200×630)`);
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") {
      console.log("sharp not installed, skipping PNG generation.");
      console.log("Install with: npm install --save-dev sharp");
      console.log("og-image.svg is available as fallback.");
    } else {
      console.error("Failed to generate og-image.png:", e.message);
      process.exit(1);
    }
  }
}

main();
