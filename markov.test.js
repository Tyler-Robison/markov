
const markov = require("./markov");
const { toBeOneOf } = require('jest-extended')
expect.extend({ toBeOneOf });


describe("Markov Obj Tests", function () {

    let mm;
    let data;
    let markovStr;
    beforeEach(() => {
        data = 'the cat in the hat';
        mm = new markov.MarkovMachine(data);
        markovStr = mm.makeText()
    });


    test("mm is instance of MarkovMachine", function () {

        expect(mm).toBeInstanceOf(markov.MarkovMachine);
        expect(data).toEqual(expect.any(String))
    });

    test("makeText produces a string of text", function () {

        expect(markovStr).toEqual(expect.any(String))
    });

    test("makeChains produces the correct chain", function () {

        const correctChain = { "the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null] }
        expect(mm.chainObj).toEqual(correctChain)
    });

    test("word array contains correct words", function () {

        const correctArr = ['the', 'cat', 'in', 'the', 'hat']
        expect(mm.words).toEqual(correctArr)
    });

    test("markovStr contains only valid words", function () {

        // This test sometimes passes even if you input bad data
        const markovArr = markovStr.split(' ')
        for (let i = 0; i < markovArr.length; i++) {
            expect(markovArr[i]).toBeOneOf(['the', 'cat', 'in', 'hat'])
        }
    });


});