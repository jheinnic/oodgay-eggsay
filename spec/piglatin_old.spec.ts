import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {marbles} from 'rxjs-marbles';
import {PigLatin} from '..';


// describe('Pig Latin', () => {
//   function values()
//   {
//     return {
//       a: 'hello',
//       m: 'ellohay',
//       b: 'hello world',
//       n: 'ellohay orldway',
//       c: 'Hello world',
//       o: 'Ellohay orldway',
//       d: 'Hello, world!!',
//       p: 'Ellohay, orldway!!',
//       e: 'eat apples',
//       q: 'eatay applesay',
//       f: 'quick brown fox',
//       r: 'ickquay ownbray oxfay',
//       g: 'In the west, I gave all animals away.  How did they return home?',
//       s: 'Inay ethay estway, Iay avegay allay animalsay awayay.  Owhay idday eythay eturnray omehay?'
//     };
//   }
//
//   describe('single value inputs', () => {
//     it('should map hello', marbles((m) => {
//       const input = m.cold('a|', values());
//       const expected = m.cold('m|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//
//     it('should map hello world', marbles((m) => {
//       const input = m.cold('b|', values());
//       const expected = m.cold('n|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//
//     it('should map Hello world', marbles((m) => {
//       const input = m.cold('c|', values());
//       const expected = m.cold('o|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//
//     it('should map Hello, world!!', marbles((m) => {
//       const input = m.cold('d|', values());
//       const expected = m.cold('p|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//
//     it('should map eat apples', marbles((m) => {
//       const input = m.cold('e|', values());
//       const expected = m.cold('q|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//
//     it('should map quick brown fox', marbles((m) => {
//       const input = m.cold('f|', values());
//       const expected = m.cold('r|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//
//     it('should map "In the west, I gave all animals away.  How did they return home?"', marbles((m) => {
//       const input = m.cold('g|', values());
//       const expected = m.cold('s|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//   });
//
//   describe('multlple inputs order', () => {
//     it('should preserve input order', marbles((m) => {
//       const input = m.cold('--abcdef|', values());
//       const expected = m.cold('--mnopqr|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//
//     it('should tolerate repetition', marbles((m) => {
//       const input = m.cold('aabbaacc|', values());
//       const expected = m.cold('mmnnmmoo|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//
//     it('should handle delays', marbles((m) => {
//       const input = m.cold('a--b-c---d-a--e---f|', values());
//       const expected = m.cold('m--n-o---p-m--q---r|', values());
//
//       m.expect(pigLatin(input))
//         .toBeObservable(expected);
//     }));
//   });
// });
//
