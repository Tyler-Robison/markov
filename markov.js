/** Textual markov chain generator */
const _ = require('lodash');

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.nullArr = [...this.words]
    this.nullArr.push(null)
    this.chainObj = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // Pushed null to word arr, loop through words.length - 1

    for (let i = 0; i < this.nullArr.length - 1; i++) {
      if (!this.chainObj[this.nullArr[i]]) {
        this.chainObj[this.nullArr[i]] = [this.nullArr[i + 1]]
      } else {
        this.chainObj[this.nullArr[i]].push(this.nullArr[i + 1])
      }
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let randomWord = _.sample(this.words)
    let markovArr = []
    markovArr.push(randomWord)

    while (markovArr.length < numWords) {
      let followingWords = this.chainObj[randomWord]
      randomWord = _.sample(followingWords)
      if (randomWord) {
        markovArr.push(randomWord)
      } else {
        break
      }
    }
    const markovStr = markovArr.join(' ')
    // console.log(markovStr)
    return markovStr
  }
}

const mm = new MarkovMachine("And I would eat them in a boat!");
const mm2 = new MarkovMachine("the cat in the hat is in the hat");
const mm3 = new MarkovMachine("I do not like them, Sam, you see.");


mm2.makeText(10);


module.exports = {MarkovMachine};