/** Textual markov chain generator */
const fs = require('fs')
class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.chains = this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		let chains = {};
		let words = this.words;
		for (let i = 0; i < words.length; i++) {
			if (chains[words[i]]) {
				chains[words[i]] = [ ...chains[words[i]], words[i + 1] ];
			} else {
				chains[words[i]] = [ words[i + 1] ];
			}
		}

		return chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let words = this.words;
		let chains = this.chains;
    
		let currentWord = words[Math.floor(Math.random() * words.length)];
		let text = [];
    text.push(currentWord)
		for (let i = 0; i < numWords; i++) {
			if (currentWord) {
        currentWord = chains[currentWord][Math.floor(Math.random() * chains[currentWord].length)]
        text.push(currentWord);
			} else if (currentWord == undefined) {
        return 
      }
    }
    console.log(text)
		return text;
	}
}

let mm = new MarkovMachine( fs.readFileSync('./eggs.txt').toString())
mm.makeText()