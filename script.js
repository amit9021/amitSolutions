const fs = require("fs-extra");
const { promisify } = require("util");
const path = require("path");

async function init() {
  // Remove existing docs directory
  await promisify(fs.remove)("./docs");

  // Move build to docs
  await promisify(fs.move)("./build", "./docs");

  // Ensure CNAME file exists in docs directory for custom domain
  const cnamePath = path.join("./docs", "CNAME");
  const cnameContent = "amit-solutions.co.il";

  try {
    await promisify(fs.writeFile)(cnamePath, cnameContent);
    console.log(
      "✅ CNAME file created/updated for custom domain: amit-solutions.co.il"
    );
  } catch (error) {
    console.error("❌ Error creating CNAME file:", error);
  }

  // Ensure .nojekyll file exists to prevent Jekyll processing
  const nojekyllPath = path.join("./docs", ".nojekyll");

  try {
    await promisify(fs.writeFile)(nojekyllPath, "");
    console.log("✅ .nojekyll file created/updated");
  } catch (error) {
    console.error("❌ Error creating .nojekyll file:", error);
  }
}

init();
