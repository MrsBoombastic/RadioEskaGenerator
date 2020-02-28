const run = async () => {
    const fetch = require("node-fetch")
    const parser = require('node-html-parser');
    let hash = ""
    let url = ""
    async function findURL(input) {
        const lines = input.split("\n");
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes("var streamUrl =")) {
                return lines[i].replace(/\s/g,'').replace('varstreamUrl=\'', '').replace(`?'.replace('.aac','.mp3');`, '').replace('.aac', '.mp3')
            }
        }
    }
    await fetch('http://www.eskago.pl/radio/vox-fm')
        .then(res => res.text())
        .then(body => {
            hash = parser.parse(body).querySelector("#icsu").rawAttributes.value
            url = findURL(body)
        });
    const data = JSON.parse('{"' + decodeURI(hash).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    await console.log(data.hash, data.rip, data)
console.log(`${url}?timestamp=${data.timestamp}&hash=${data.hash}&rip=${data.rip}&chstr=${data.chstr}`)
}
run()