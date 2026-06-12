import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const publicDir = resolve(root, "public");
const bgPath = resolve(publicDir, "puntacana.avif");
const logoPath = resolve(publicDir, "logo.avif");
const outPath = resolve(publicDir, "og-image.jpg");

async function main() {
  try {
    const sharp = (await import("sharp")).default;

    let bgBuffer;
    if (existsSync(bgPath)) {
      bgBuffer = await sharp(bgPath)
        .resize(1200, 630, { fit: "cover", position: "center" })
        .blur(5)
        .toBuffer();
      console.log("Background: puntacana.avif + blur(5)");
    } else {
      console.log("puntacana.avif not found, using solid navy fallback.");
      bgBuffer = await sharp({
        create: { width: 1200, height: 630, channels: 3, background: { r: 0, g: 28, b: 84 } },
      }).png().toBuffer();
    }

    const gradientSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#001C54" stop-opacity="0.12"/>
      <stop offset="45%" stop-color="#001C54" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#001C54" stop-opacity="0.72"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
</svg>`);

    const gradientOverlay = await sharp(gradientSvg)
      .resize(1200, 630)
      .png()
      .toBuffer();

    let logoBuffer;
    if (existsSync(logoPath)) {
      logoBuffer = await sharp(logoPath)
        .resize(260, null, { fit: "inside" })
        .toFormat("png")
        .toBuffer();
      console.log("Logo: resized to 260px wide");
    } else {
      console.log("logo.avif not found, skipping logo overlay.");
    }

    const textSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <text x="600" y="380" text-anchor="middle" font-family="Georgia, 'Playfair Display', serif" font-size="62" font-weight="700" fill="#FFFFFF" letter-spacing="4">Darius Viajes</text>
  <text x="600" y="428" text-anchor="middle" font-family="'Inter', sans-serif" font-size="18" font-weight="400" fill="#F6F7F9" opacity="0.75" letter-spacing="6">DESCUBRÍ TU PRÓXIMO DESTINO</text>
</svg>`);

    const textOverlay = await sharp(textSvg)
      .resize(1200, 630)
      .png()
      .toBuffer();

    const composites = [gradientOverlay].map((input) => ({ input, top: 0, left: 0 }));

    if (logoBuffer) {
      composites.push({
        input: logoBuffer,
        top: 55,
        left: Math.round((1200 - 260) / 2),
      });
    }

    composites.push({ input: textOverlay, top: 0, left: 0 });

    await sharp(bgBuffer)
      .composite(composites)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);

    console.log("og-image.jpg generated");
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
