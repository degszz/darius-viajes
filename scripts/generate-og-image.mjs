import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const publicDir = resolve(root, "public");
const svgPath = resolve(publicDir, "og-image.svg");
const bgPaths = [
  resolve(publicDir, "puntacana.avif"),
  resolve(publicDir, "janeiro.avif"),
  resolve(publicDir, "altamar.avif"),
];
const outPath = resolve(publicDir, "preview.jpg");

async function main() {
  if (!existsSync(svgPath)) {
    console.log("og-image.svg not found, skipping.");
    return;
  }

  try {
    const sharp = (await import("sharp")).default;

    let bgBuffer = null;
    let bgUsed = "";

    for (const p of bgPaths) {
      if (existsSync(p)) {
        try {
          bgBuffer = await sharp(p)
            .resize(1200, 630, { fit: "cover", position: "center" })
            .toFormat("png")
            .toBuffer();
          bgUsed = p;
          break;
        } catch {
          continue;
        }
      }
    }

    if (!bgBuffer) {
      console.log("No photo background available, using solid navy fallback.");
      bgBuffer = await sharp({
        create: { width: 1200, height: 630, channels: 3, background: { r: 11, g: 37, b: 69 } },
      }).png().toBuffer();
    } else {
      console.log(`Background: ${bgUsed}`);
    }

    const overlay = await sharp(readFileSync(svgPath)).resize(1200, 630).png().toBuffer();

    await sharp(bgBuffer)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 85, progressive: false, mozjpeg: true })
      .toFile(outPath);

    console.log("preview.jpg generated (1200x630)");
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") {
      console.log("sharp not installed, skipping generation.");
    } else {
      console.error("Failed to generate og-image:", e.message);
      process.exit(1);
    }
  }
}

main();
