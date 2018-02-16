"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var jasmine_marbles_1 = require("jasmine-marbles");
var piglatin_1 = require("./piglatin");
piglatin_1.pigLatin(Observable_1.Observable.of('day')).subscribe(console.log);
describe('Pig Latin', function () {
    var values = {
        a: 'hello',
        m: 'ellohay',
        b: 'hello world',
        n: 'ellohay orldway',
        c: 'Hello world',
        o: 'Ellohay orldway',
        d: 'Hello, world!!',
        p: 'Ellohay, orldway!!',
        e: 'eat apples',
        q: 'eatay applesay',
        f: 'quick brown fox',
        r: 'ickquay ownbray oxfay'
    };
    describe('single values', function () {
        it('should map hello to ellohay', function () {
            var input = jasmine_marbles_1.hot('^a|', values);
            var expected = jasmine_marbles_1.hot('^m|', values);
piglatin_1.pigLatin(Observable_1.Observable.of('day')).subscribe(console.log);
            console.log('am');
            expect(piglatin_1.pigLatin(input, jasmine_marbles_1.getTestScheduler()))
                .toBeObservable(expected);
            console.log('am');
            input.subscribe(console.log);
            expected.subscribe(console.log);
        });
        it('should map hello to ellohay', function () {
            var input = jasmine_marbles_1.cold('b|', values);
            var expected = jasmine_marbles_1.cold('n|', values);
            console.log('bn');
            expect(piglatin_1.pigLatin(input, jasmine_marbles_1.getTestScheduler()))
                .toBeObservable(expected);
            console.log('bn');
        });
        it('should map hello to ellohay', function () {
            var input = jasmine_marbles_1.hot('^c|', values);
            var expected = jasmine_marbles_1.hot('^o|', values);
            console.log('co');
            expect(piglatin_1.pigLatin(input, jasmine_marbles_1.getTestScheduler()))
                .toBeObservable(expected);
            console.log('co');
        });
        it('should map hello to ellohay', function () {
            var input = jasmine_marbles_1.hot('^d|', values);
            var expected = jasmine_marbles_1.hot('^p|', values);
            console.log('dp');
            expect(piglatin_1.pigLatin(input, jasmine_marbles_1.getTestScheduler()))
                .toBeObservable(expected);
            console.log('dp');
        });
        it('should map hello to ellohay', function () {
            var input = jasmine_marbles_1.cold('e|', values);
            var expected = jasmine_marbles_1.cold('q|', values);
            console.log('eq');
            expect(piglatin_1.pigLatin(input, jasmine_marbles_1.getTestScheduler()))
                .toBeObservable(expected);
            console.log('eq');
        });
        it('should map hello to ellohay', function () {
            var input = jasmine_marbles_1.hot('^f|', values);
            var expected = jasmine_marbles_1.hot('^r|', values);
            console.log('fr');
            expect(piglatin_1.pigLatin(input, jasmine_marbles_1.getTestScheduler()))
                .toBeObservable(expected);
            console.log('fr');
        });
    });
    describe('multlple inputs order', function () {
        it('should preserve input order', function () {
            var input = jasmine_marbles_1.hot('^--abcdef|', values);
            var expected = jasmine_marbles_1.hot('^--ABCDEF|', values);
            expect(piglatin_1.pigLatin(input))
                .toBeObservable(expected);
        });
        it('should tolerate repetition', function () {
            var input = jasmine_marbles_1.hot('^aabbaacc|', values);
            var expected = jasmine_marbles_1.hot('^AABBAACC|', values);
            expect(piglatin_1.pigLatin(input))
                .toBeObservable(expected);
        });
        it('should handle delays', function () {
            var input = jasmine_marbles_1.hot('a--b-c---d-a--e---f|', values);
            var expected = jasmine_marbles_1.hot('^A--B-C---D-A--E---F|', values);
            expect(piglatin_1.pigLatin(input))
                .toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=piglatin.spec.js.map
