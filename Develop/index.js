const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your Github username?",
      name: "username"
    },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title"
    },
    {
      type: "input",
      message: "Please enter a description of your project.",
      name: "description"
    },
    {
      type: "input",
      message: "Please detail the installation guidelines.",
      name: "install"
    },
    {
      type: "input",
      message: "Please detail the intended usage of your project.",
      name: "usages"
    },
    {
      type: "input",
      message: "Please indicate the license details.",
      name: "licenses"
    },
    {
      type: "input",
      message: "Please note who contributed to the project.",
      name: "contributes"
    },
    {
      type: "input",
      message: "Please describe what kind of tests were performed.",
      name: "testing"
    }
  ])
}; 

async function githubInfo(username){
  const queryUrl = `https://api.github.com/users/${username}?client_id=22779517f8aa3cdaf282&
  client_secret=387369c36a454088eceea49ebb5101734049ddd3`;
  
  const data = await axios
    .get(queryUrl)
    .then(function(response) { return response.data })
  return data;
};

function generateFile(answers, email, avatar_url) {
  return `# ${answers.title}[![Website monip.org](https://img.shields.io/website-up-down-green-red/http/monip.org.svg)](http://monip.org/)

 
  ## Table of Contents
  
  - [Description](#description)
  - [Installing and Updating](#installing-and-updating)
  - [Usage](#usage)
  - [License](#license)
  - [Tests](#running-tests)
  - [Contributing](#contributing)
  - [GitHub Details](#github-details)
      - [GitHub profile picture](#github-profile-picture)
      - [GitHub email](#github-email)
  
  ## Description
  
  ${answers.description}
  
  ## Installation and Updating
  
  ${answers.install}
  
  ## Usage
  
  ${answers.usages}
  
  ## Licenses
  
  ${answers.licenses}
  
  ## Tests
  
  ${answers.testing}
  
  ## Contributes
  
  ${answers.contributes}
  
  ## GitHub Information 
  
  GitHub Avatar: ${avatar_url}
  
  GitHub email: ${email}`
}; 

async function init() {
  try {
    const answers = await promptUser();
    const {email, avatar_url} = await githubInfo(answers.username)
    const file = generateFile(answers, email, avatar_url); 
    await writeFileAsync("readme.md", file); 

    console.log("Successfully generated README.md file!");
  } catch(err) {
    console.log(err);
  }
}

init();

