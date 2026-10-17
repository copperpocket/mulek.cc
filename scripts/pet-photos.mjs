// Adds pet photos to the site with every bit of metadata removed: GPS location, camera, dates,
// software, thumbnails and color profiles. The repo is public, so originals never go in it.
//
//   1. Put new photos in photos-inbox/<pet>/ (gitignored), e.g. photos-inbox/salem/IMG_1234.jpg.
//      JPEG, PNG and WebP work; export iPhone HEIC photos as JPEG first.
//   2. Run: yarn pet-photos
//
// Each photo is turned upright, resized to fit 900x1200, and saved as a brand-new JPEG with no
// metadata in public/images/pets/<pet>/<pet>-<n>.jpg, then checked. Each original then moves to
// photos-inbox/.added/<pet>/, so running the script again never adds it twice (delete them whenever
// you like). Every photo already on the site is checked too, and the script stops if any still has
// metadata. Finally it rebuilds src/data/pet-photos.json, the list the site picks from.

import { readdir, mkdir, writeFile, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const INBOX = "photos-inbox";
const OUTPUT = "public/images/pets";
const MANIFEST = "src/data/pet-photos.json";
const IMAGE = /\.(jpe?g|png|webp)$/i;

const ADDED = path.join(INBOX, ".added");

// Folders starting with "." (like .added) are skipped
const listDirs = async (dir) =>
  existsSync(dir)
    ? (await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory() && !e.name.startsWith(".")).map((e) => e.name)
    : [];
const listImages = async (dir) => (existsSync(dir) ? (await readdir(dir)).filter((f) => IMAGE.test(f)).sort() : []);

// Anything that could carry information beyond the pixels
async function leftoverMetadata(file) {
  const m = await sharp(file).metadata();
  return ["exif", "xmp", "iptc", "icc", "tifftagPhotoshop"].filter((key) => m[key]);
}

let added = 0;
for (const pet of await listDirs(INBOX)) {
  const name = pet.toLowerCase();
  const outDir = path.join(OUTPUT, name);
  await mkdir(outDir, { recursive: true });
  const taken = new Set(await listImages(outDir));
  let n = 1;
  for (const file of await listImages(path.join(INBOX, pet))) {
    while (taken.has(`${name}-${n}.jpg`)) n++;
    const out = path.join(outDir, `${name}-${n}.jpg`);
    // sharp writes no metadata unless asked to; .rotate() applies the photo's orientation first
    await sharp(path.join(INBOX, pet, file))
      .rotate()
      .resize({ width: 900, height: 1200, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    taken.add(`${name}-${n}.jpg`);
    // Move the original out of the way so it's never added twice
    await mkdir(path.join(ADDED, pet), { recursive: true });
    await rename(path.join(INBOX, pet, file), path.join(ADDED, pet, file));
    console.log(`added ${out.replaceAll("\\", "/")} (from ${pet}/${file})`);
    added++;
  }
}

// Check every photo on the site, new or old
const manifest = {};
let problems = 0;
for (const pet of await listDirs(OUTPUT)) {
  const files = await listImages(path.join(OUTPUT, pet));
  for (const file of files) {
    const found = await leftoverMetadata(path.join(OUTPUT, pet, file));
    if (found.length) {
      console.error(`METADATA FOUND in ${OUTPUT}/${pet}/${file}: ${found.join(", ")}`);
      problems++;
    }
  }
  if (files.length) manifest[pet] = files.map((file) => `/images/pets/${pet}/${file}`);
}
if (problems) {
  console.error(`${problems} photo(s) still have metadata. Delete them and add them again through ${INBOX}/.`);
  process.exit(1);
}

await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
const total = Object.values(manifest).reduce((sum, list) => sum + list.length, 0);
console.log(`${added} added. ${total} photo(s) on the site, all metadata-free. Updated ${MANIFEST}.`);
