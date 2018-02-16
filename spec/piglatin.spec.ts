import {PigLatin} from '..';
import {StringReader} from '../lib/stringreader';

describe('PigLatin', () => {
  it('test asynchronously', (done: DoneFn) => {
    setTimeout(function () {
      done();
    }, 10);
  });

  describe('single value inputs', () => {
    function assertTx(inputStr: string, expectedStr: string, done: DoneFn)
    {
      const tx = new PigLatin();
      const input = new StringReader(inputStr);
      const expected = Buffer.from(expectedStr);
      let bytes = new Buffer('');

      input.pipe(tx)
        .on('data', (chunk: Buffer) => {
          bytes = Buffer.concat([bytes, chunk]);
        })
        .on('end', () => {
          console.log(bytes.toString());
          expect(bytes)
            .toEqual(expected);
          done();
        });

      input.open();
    }

    it('should map "brown" to "ownbray"', (done: DoneFn) => {
      assertTx('brown', 'ownbray', done);
    });

    it('should map "brown fox" to "ownbray fox"', (done: DoneFn) => {
      assertTx('brown fox', 'ownbray oxfay', done);
    });

    it('should map "hello" to "ellohay"', (done: DoneFn) => {
      assertTx('hello', 'ellohay', done);
    });

    it('should map "hello world" to "ellohay orldway"', (done: DoneFn) => {
      assertTx('hello world', 'ellohay orldway', done);
    });

    it('should map "Hello world" to "Ellohay orldway"', (done: DoneFn) => {
      assertTx('Hello world', 'Ellohay orldway', done);
    });

    it('should map "Hello, world!!" to "Ellohay, orldway!!"', (done: DoneFn) => {
      assertTx('Hello, world!!', 'Ellohay, orldway!!', done);
    });

    it('should "eat apples" to "eatay applesay"', (done: DoneFn) => {
      assertTx('eat apples', 'eatay applesay', done);
    });

    it('should map "quick brown fox" to "ickquay ownbray oxfay"', (done: DoneFn) => {
      assertTx('quick brown fox', 'ickquay ownbray oxfay', done);
    });

    it('should map "I\'m OK, so you\'re OK" to "Iay\'may Okay, osay ouyay\'eray Okay"', (done: DoneFn) => {
      assertTx('I\'m OK, so you\'re OK', 'Iay\'may Okay, osay ouyay\'eray Okay', done);
    });

    it('should map "In the west, you and I grew animals away easily.  How did they return so strong?" ' +
      'to "Inay ethay estway, ouyay anday Iay ewgray animalsay awayay easilyay.  Owhay idday eythay'
      + ' eturnray osay ongstray?"',
      (done: DoneFn) => {
        assertTx(
          'In the west, you and I grew animals away easily.  How did they return so strong?',
          'Inay ethay estway, ouyay anday Iay ewgray animalsay awayay easilyay.  Owhay idday eythay'
          + ' eturnray osay ongstray?',
          done);
    });

    //   const input = m.cold('g|', values());
    //   const expected = m.cold('s|', values());
    //
    //   m.expect(pigLatin(input))
    //     .toBeObservable(expected);
    // }));
  });
});

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
//       s:
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
