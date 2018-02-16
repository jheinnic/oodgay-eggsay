"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/from");
require("rxjs/add/operator/map");
require("rxjs/add/operator/reduce");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/concatMap");
var async_1 = require("rxjs/scheduler/async");
var ParseMode;
(function (ParseMode) {
    ParseMode[ParseMode["BetweenWords"] = 0] = "BetweenWords";
    ParseMode[ParseMode["InPrefix"] = 1] = "InPrefix";
    ParseMode[ParseMode["InPrefixPostQ"] = 2] = "InPrefixPostQ";
    ParseMode[ParseMode["InSuffix"] = 3] = "InSuffix";
})(ParseMode || (ParseMode = {}));
var VOWELS = /^[aAeEiIoOuU]$/;
var CONST_WITH_Q = /^[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]$/;
var CONST_NO_Q = /^[b-df-hj-npr-tv-zB-DF-HJ-NPR-TV-Z]$/;
var ALPHA = /^[a-zA-Z]$/;
var JUST_Q = /^[qQ]$/;
var JUST_U = /^[uU]$/;
var AY = 'ay';
var BLANK = '';
function pigLatin(input, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return input.concatMap(function (phrase) { return Observable_1.Observable.from(phrase, async_1.async)
        .reduce(function (acc, token) {
        var retVal;
        switch (acc.mode) {
            case ParseMode.BetweenWords:
                {
                    if (token.match(VOWELS)) {
                        retVal = {
                            mode: ParseMode.InSuffix,
                            prefix: BLANK,
                            result: acc.result + token
                        };
                    }
                    else if (token.match(JUST_Q)) {
                        retVal = {
                            mode: ParseMode.InPrefixPostQ,
                            prefix: token,
                            result: acc.result
                        };
                    }
                    else if (token.match(CONST_NO_Q)) {
                        retVal = {
                            mode: ParseMode.InPrefix,
                            prefix: token,
                            result: acc.result
                        };
                    }
                    else {
                        retVal = {
                            mode: ParseMode.BetweenWords,
                            prefix: BLANK,
                            result: acc.result + token
                        };
                    }
                    break;
                }
            case ParseMode.InPrefix:
                {
                    if (token.match(VOWELS)) {
                        retVal = {
                            mode: ParseMode.InSuffix,
                            prefix: acc.prefix,
                            result: acc.result + token
                        };
                    }
                    else if (token.match(CONST_WITH_Q)) {
                        retVal = {
                            mode: ParseMode.InPrefix,
                            prefix: acc.prefix + token,
                            result: acc.result
                        };
                    }
                    else {
                        retVal = {
                            mode: ParseMode.BetweenWords,
                            prefix: BLANK,
                            result: acc.result + acc.prefix + AY + token
                        };
                    }
                    break;
                }
            case ParseMode.InPrefixPostQ:
                {
                    if (token.match(JUST_U)) {
                        retVal = {
                            mode: ParseMode.InSuffix,
                            prefix: acc.prefix + token,
                            result: acc.result
                        };
                    }
                    else {
                        throw Error('Post-Q language violation');
                    }
                    break;
                }
            case ParseMode.InSuffix:
                {
                    if (token.match(ALPHA)) {
                        retVal = {
                            mode: acc.mode,
                            prefix: acc.prefix,
                            result: acc.result + token
                        };
                    }
                    else {
                        retVal = {
                            mode: ParseMode.BetweenWords,
                            prefix: BLANK,
                            result: acc.result + acc.prefix + AY + token
                        };
                    }
                    break;
                }
            default:
                throw Error("Unknown parse mode: " + acc.mode);
        }
        return retVal;
    }, {
        mode: ParseMode.BetweenWords,
        prefix: BLANK,
        result: BLANK
    })
        .map(function (parseState) {
        if (parseState.mode !== ParseMode.BetweenWords) {
            parseState.result = "" + parseState.result + parseState.prefix + AY;
        }
        var retval = phrase + " => " + parseState.result;
        console.log(retval);
        return retval;
    }); });
}
exports.pigLatin = pigLatin;
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
//# sourceMappingURL=piglatin.js.map