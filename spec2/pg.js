"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var piglatin_1 = require("./piglatin");
piglatin_1.pigLatin(Observable_1.Observable.of('day')).subscribe(console.log);
