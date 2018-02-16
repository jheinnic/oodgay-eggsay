"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/from");
require("rxjs/add/operator/map");
require("rxjs/add/operator/reduce");
require("rxjs/add/operator/mergeMap");
var ParseMode;
(function (ParseMode) {
    ParseMode[ParseMode["AtBeginning"] = 0] = "AtBeginning";
    ParseMode[ParseMode["InConsonants"] = 1] = "InConsonants";
    ParseMode[ParseMode["PostQ"] = 2] = "PostQ";
    ParseMode[ParseMode["InWord"] = 3] = "InWord";
})(ParseMode || (ParseMode = {}));
var VOWELS = ['a', 'e', 'i', 'o', 'u'];
function pigLatin(input) {
    return input.mergeMap(function (phrase) { return Observable_1.Observable.from(phrase.split(/\s+/))
        .mergeMap(function (word) {
        return Observable_1.Observable.from(word.split(''))
            .reduce(function (acc, token) {
            switch (acc.mode) {
                case ParseMode.AtBeginning:
                    {
                        if (VOWELS.includes(token.toLowerCase())) {
                            return {
                                mode: ParseMode.InWord,
                                prefix: '',
                                suffix: token
                            };
                        }
                        else if (token === 'q') {
                            return {
                                mode: ParseMode.PostQ,
                                prefix: token,
                                suffix: ''
                            };
                        }
                        return {
                            mode: ParseMode.InConsonants,
                            prefix: token,
                            suffix: ''
                        };
                    }
                case ParseMode.InConsonants:
                    {
                        if (VOWELS.includes(token.toLowerCase())) {
                            return {
                                mode: ParseMode.InWord,
                                prefix: acc.prefix,
                                suffix: token
                            };
                        }
                        else {
                            return {
                                mode: ParseMode.InConsonants,
                                prefix: acc.prefix + token,
                                suffix: ''
                            };
                        }
                    }
                case ParseMode.PostQ:
                    {
                        if (token !== 'u' && token !== 'U') {
                            throw Error('Undefined behavior');
                        }
                        else {
                            return {
                                mode: ParseMode.InWord,
                                prefix: acc.prefix + token,
                                suffix: ''
                            };
                        }
                    }
                case ParseMode.InWord:
                    {
                        return {
                            mode: ParseMode.InWord,
                            prefix: acc.prefix,
                            suffix: acc.suffix + token
                        };
                    }
                default:
                    throw Error('Illegal lack of state');
            }
        }, {
            mode: ParseMode.AtBeginning,
            prefix: '',
            suffix: ''
        })
            .reduce(function (pigWord, parseState) {
            return pigWord + parseState.suffix + parseState.prefix + 'ay';
        }, '');
    })
        .reduce(function (outPhrase, pigWord) { return outPhrase + ' ' + pigWord; }, ''); });
}
var cases = [
    'hello',
    'hello world',
    'Hello world',
    'Hello, world!!',
    'eat apples',
    'quick brown fox'
];
pigLatin(Observable_1.Observable.from(cases))
    .subscribe(function (input) {
    console.log(input);
});
//# sourceMappingURL=piglatin2.js.map