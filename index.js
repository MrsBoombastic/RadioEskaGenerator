const fetch = require("node-fetch")
const parser = require('node-html-parser');

function findURL(input) {
    const lines = input.split("\n");
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("var streamUrl =")) {
            return lines[i].replace(/\s/g, '').replace('varstreamUrl=\'', '').replace(`?'.replace('.aac','.mp3');`, '').replace('.aac', '.mp3')
        }
    }
}

// Linijkę niżej podmienić można stację vox-fm na inną
fetch('http://www.eskago.pl/radio/vox-fm')
    .then(res => res.text())
    .then(body => {
        console.log(`${findURL(body)}?${parser.parse(body).querySelector("#icsu").rawAttributes.value}`)
    });