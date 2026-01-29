import { buildVendorBundles } from "../lib/vendorBundles.js";

async function main() {
  await buildVendorBundles();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
