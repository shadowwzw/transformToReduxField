const fs = require('fs')
const compNames = ["TextBox", "SelectBox"]
const file = fs.readFileSync('./input.txt') + ""
const result = compNames.reduce( (accumulator, currentValue) => {
  const file2 = accumulator.replace(/(<Field)( [ \S\n]*?label[ \S\n]*?>)([ \S\n]*?)(<[ \S\n]*?\/Field)(>)/gu, "$1UI $2 $4UI$5")
  let file3 = file2.replace(new RegExp(`<(${currentValue})([ \\S\\n]*?)\\/>`, "gu"), `<Field component=\{${currentValue}\} props={{$2}}/>`)
  for(let i = 20; i > 0; i --){
    file3 = file3.replace(/(<Field component=\{.+\} props=\{\{)([ \n]*[a-zA-Z0-9]*)=\{?([ "\-.a-zA-Z0-9А-Яа-я]*)\}?([ \n]*[ \n\S]*?)(\}\}[ \S\n]*?\/>)/gu, "$1$4 $2: $3, $5")
  }
  return file3
}, file)

fs.writeFileSync("./output.txt", result)