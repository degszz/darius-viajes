import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const publicDir = resolve(root, "public");
const svgPath = resolve(publicDir, "og-image.svg");
const bgPath = resolve(publicDir, "puntacana.avif");
const pngPath = resolve(publicDir, "og-image.png");

async function main() {
  if (!existsSync(svgPath)) {
    console.log("og-image.svg not found, skipping PNG generation.");
    return;
  }

  try {
    const sharp = (await import("sharp")).default;

    const background = sharp(bgPath).resize(1200, 630, { fit: "cover", position: "center" });
    const overlay = sharp(readFileSync(svgPath)).resize(1200, 630);

    await background
      .composite([{ input: await overlay.png().toBuffer(), top: 0, left: 0 }])
      .png()
      .toFile(pngPath);

    console.log(`og-image.png generated (1200x630) with photo background`);
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") {
      console.log("sharp not installed, skipping PNG generation.");
      console.log("Install with: npm install --save-dev sharp");
    } else {
      console.error("Failed to generate og-image.png:", e.message);
      process.exit(1);
    }
  }
}

main();
