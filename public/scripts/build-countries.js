import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// project root
const ROOT = path.resolve(__dirname, "../../");

// paths
const RAW_PATH = path.join(ROOT, "public/data/countries-raw.json");
const OUT_PATH = path.join(ROOT, "public/data/countries.json");

// read + parse
const rawObj = JSON.parse(fs.readFileSync(RAW_PATH, "utf8"));

// 🔥 FIX: object → array
const raw = Object.values(rawObj);

const cleaned = raw
  .map((c) => ({
    name: c.name?.common,
    code: c.cca2 || c.cca3 || "",
    lat: Array.isArray(c.latlng) ? c.latlng[0] : null,
    lon: Array.isArray(c.latlng) ? c.latlng[1] : null,
    timezones: Array.isArray(c.timezones) ? c.timezones : [],
  }))
  .filter(
    (c) =>
      c.name &&
      typeof c.lat === "number" &&
      typeof c.lon === "number" &&
      c.timezones.length > 0
  );

fs.writeFileSync(OUT_PATH, JSON.stringify(cleaned, null, 2));

console.log(`✔ Generated ${cleaned.length} countries`);
