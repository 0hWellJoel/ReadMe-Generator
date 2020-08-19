const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");
const path = require("path");

const questions =[
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
  ];

  function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
  }
  
  function init() {
    inquirer.prompt(questions).then((inquirerResponses) => {
      console.log("Searching...");
  
      api
        .getUser(inquirerResponses.github)
        .then(({ data }) => {
          writeToFile("README.md", generateMarkdown({ ...inquirerResponses, ...data }));
        })
    })
  }
  
  init();