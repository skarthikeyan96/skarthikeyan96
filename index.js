// index.js
const Mustache = require("mustache");
const fs = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";


let DATA = {
  banner:
    "https://user-images.githubusercontent.com/23126394/116805261-bfdc2900-ab42-11eb-8db5-a92053be76d3.png",
  name: "Karthikeyan",
  company: "Bang the table",
  date: new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  }),
};

/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */
async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync("README.md", output);
  });
}

async function renderReadme(){
  await generateReadMe()
}

renderReadme()
