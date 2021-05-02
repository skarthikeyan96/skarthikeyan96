// index.js
const Mustache = require("mustache");
const fs = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";
const fetch = require("node-fetch");
const orderBy = require("lodash/orderBy");
const takeRight = require("lodash/takeRight")
const reverse =require("lodash/reverse")
/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
const fetchBlog = async() => {
  await fetch('https://dev.to/api/articles?username=imkarthikeyan')
  .then((response) => { 
      response.json().then((data) => {
        setblogData(data);;
      }).catch((err) => {
          console.log(err);
      }) 
  });
};



const setblogData = (posts) => {
  const Posts = orderBy(posts, ["published_timestamp"], ["asc"]).map((post) => {
    return {
      'id': post.id,
      'title': post.title,
      'url': post.url,
      'reaction_count': post.public_reactions_count
    };
  });
  DATA.blog = reverse(takeRight(Posts,5))
};

let DATA = {
  banner:
    "https://user-images.githubusercontent.com/23126394/114269492-08f9fb00-9a25-11eb-89e0-a46912340a0b.png",
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
  await fetchBlog();

  await generateReadMe()
}

renderReadme()
