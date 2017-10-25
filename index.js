const fs = require('fs')
const compNames = [
  "TextBox",
  "SelectBox",
  "Autocomplete",
  "CheckBox",
  "DateBox",
  "DatePicker",
  "RadioGroup",
  "TimeBox",
  "MultiValueAutocomplete",
  "MultiValueSelectBox",
  "MultiValueTextBox"
]
const file = fs.readFileSync('./input.txt') + ""
const file0 = file.replace(/(<Field)([ \n][ \S\n]*?label[ \S\n]*?>)([ \S\n]*?)(<[ \S\n]*?\/Field)(>)/gu, "$1UI $2 $4UI$5")
console.log("Wait...")
console.time("lead time")
const result = compNames.reduce( (accumulator, currentValue) => {
  console.log(`${currentValue} started`)
  let file3 = accumulator.replace(new RegExp(`<(${currentValue})([ \\S\\n]*?)>([ \\S\\n]*?)<\/${currentValue}>`, "gu"), `<Field component=\{${currentValue}\} props={{$2}}>$3</Field>`)
  file3 = file3.replace(new RegExp(`<(${currentValue})([ \\S\\n]*?)\\/>`, "gu"), `<Field component=\{${currentValue}\} props={{$2}}/>`)
  for(let i = 20; i > 0; i --){
    console.log(`${currentValue} iteration = ${i}`)
    file3 = file3.replace(/(<Field component=\{.+\} props=\{\{)([ \n]*[a-zA-Z0-9]*)=\{([(),:\[\] "\-.a-zA-Z0-9А-Яа-я]*)\}([ \n]*[ \n\S]*?)(\}\}[ \S\n]*?\/>)/gu, "$1$4 $2: $3, $5")
    file3 = file3.replace(/(<Field component=\{.+\} props=\{\{)([ \n]*[a-zA-Z0-9]*)="([(),:\[\] "\-.a-zA-Z0-9А-Яа-я]*)"([ \n]*[ \n\S]*?)(\}\}[ \S\n]*?\/>)/gu, "$1$4 $2: '$3', $5")
    file3 = file3.replace(/(<Field component=\{.+\} props=\{\{)([ \n]*[a-zA-Z0-9]*)="([(),:\[\] '\-.a-zA-Z0-9А-Яа-я]*)'([ \n]*[ \n\S]*?)(\}\}[ \S\n]*?\/>)/gu, "$1$4 $2: '$3', $5")
  }
  file3 = file3.replace(/(<Field([\s\n][\S\n]*[\s\n])*props=\{\{)([\S\s\n]*?),?([\s]?\}\})/gu, `$1$3$4`)
  file3 = file3.replace(/(<FieldUI)([^\n]*)(<Field[\s\n]*component=\{)/gu, `$1$2\n$3`)
  return file3
}, file0)

fs.writeFileSync("./output.txt", result)
console.log("Complete!")
console.timeEnd("lead time")