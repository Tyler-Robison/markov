/** Command-line tool to generate Markov text. */


const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");
const { argv } = require("process");



function handleData(data) {
    const mm = new markov.MarkovMachine(data);
    const markovStr = mm.makeText()
    console.log(markovStr)
}

async function getWebData(URL) {
    try {
        const resp = await axios.get(URL);
        const data = resp.data
        handleData(data)
    } catch (err) {
        console.error(`error fetching ${URL} error: ${err}`);
        process.kill(1)
    }
}

function getFileData(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${file}: ${err}`);
            process.kill(1)
        }
        handleData(data)
    })
}

const method = argv[2]
const path = argv[3]

function handleCmdInput(method, path) {
    if (method === 'file') {
        getFileData(path)
    } else if (method === 'url') {
        getWebData(path)
    } else {
        console.log(`${method} is not a valid method, use file or url`)
    }
}

handleCmdInput(method, path)