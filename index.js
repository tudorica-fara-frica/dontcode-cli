#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("node:fs");

// const testURL = "http://localhost:8080";
const hostURL = "https://dontcode-api.onrender.com";

function logContent(content) {
  console.log(content);
}

function saveLog(content, fileName) {
  if (!content) {
    console.log("Error: Content is missing or undefined.");
  } else {
    fs.writeFileSync(fileName, content, "utf8");
    console.log(`fisierul ${fileName} a fost salvat`);
  }
}

const getContentForCode = async (code) => {
  try {
    const response = await fetch(`${hostURL}/api/v1/${code}`, {
      method: "GET",
    });
    const data = await response.json();
    const content = data.content;
    return content;
  } catch (err) {
    console.log("Error:", err);
    return null;
  }
};

const getContentFromFile = (fileName) => {
  return fs.readFileSync(fileName, "utf8");
};

const updateContent = async (code, content) => {
  try {
    const response = await fetch(`${hostURL}/api/v1/${code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        overwrite: false,
      }),
    });

    const data = await response.json();

    console.log(data.message);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const overwriteContent = async (code, content) => {
  try {
    const response = await fetch(`${hostURL}/api/v1/${code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        overwrite: true,
      }),
    });
    const data = await response.json();
    console.log(data.message);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const prompt = inquirer.createPromptModule();

const q1 = {
  type: "input",
  name: "code",
  message: "Please enter the key for your dontcode:",
};

const q2 = {
  type: "list",
  name: "action",
  message: "What would you like to do with the content?",
  choices: [
    { name: "Display content in the console", value: "display" },
    { name: "Save content to a file", value: "save" },
    { name: "Update the content from a local file", value: "update" },
    { name: "Overwrite the content from a local file", value: "overwrite" },
  ],
};

const q3 = {
  type: "input",
  name: "fileName",
  message: "Please enter the file name (without .txt extension):",
  when: (answers) => ["save", "update", "overwrite"].includes(answers.action),
};

prompt([q1, q2, q3]).then(async (answers) => {
  const code = answers.code;
  if (["display", "save"].includes(answers.action)) {
    const content = await getContentForCode(code);
    if (answers.action === "display") {
      logContent(content);
    }
    if (answers.fileName) {
      const fileName = `${answers.fileName}.txt`;
      saveLog(content, fileName);
    }
  } else {
    const fileName = `${answers.fileName}.txt`;
    if (fs.existsSync(fileName)) {
      const content = getContentFromFile(fileName);
      if (answers.action === "update") {
        await updateContent(answers.code, content);
      } else {
        await overwriteContent(answers.code, content);
      }
    } else {
      console.log(`File not found: ${fileName}`);
    }
  }
});
