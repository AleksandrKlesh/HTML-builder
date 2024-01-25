'use strict'

const fs = require("fs");
const path = require("path");
let template = '';


fs.readdir(path.join(__dirname, "components"), {withFileTypes: true}, (err, files) => {
  if (err) {
    throw err;
  }
  fs.readFile(path.join(__dirname, "template.html"), (err, data) => {
    template = data.toString();
    files.map((file) => {
      const fileName = `{{${file.name.split(".")[0]}}}`;
      template = template.slice(0, template.indexOf(fileName)) + "LOOFDSKFOPAKSDKOVFMSDLK" + (template
            .slice(template.indexOf(fileName) + fileName.length - 4, -1));
      // template.slice(0, template.indexOf(`{{${file.name.split(".")[0]}}}`));
      console.log(template);
    })
  })
})
