// node scripts/build-tunisia.mjs
import { writeFileSync } from "node:fs";

const URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson";

const res = await fetch(URL);
const all = await res.json();

const tn = all.features.find(
  (f) => f.properties.ISO_A2 === "TN" || f.properties.ADM0_A3 === "TUN"
);
if (!tn) throw new Error("Tunisia not found");

writeFileSync(
  "src/data/tunisia.geo.json",
  JSON.stringify({ type: "FeatureCollection", features: [tn] })
);
console.log("OK: src/data/tunisia.geo.json");