import {Transform} from 'stream';
import {StringReader} from './stringreader';

export class PigLatin extends Transform
{
  private static readonly TAIL_SPLITTER = /(^.*[^a-zA-Z])([a-zA-Z]*$)/;

  private static readonly WORD_SPLITTER =
    /([^a-zA-Z]*)((?:(?:(?:[Qq][Uu])|[bcdfghjklmnprstvwxyzBCDFGHJKLMNPRSTVWXYZ])[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWYZ]*)|[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{0,0})((?:[aeiouAEIOU][a-zA-Z]*)|[aeiouAEIOU]{0,0})/g;
  private wrapTail = '';

  _transform(chunk: string, encoding: string, callback: Function): void
  {
    let mainConcat = `${this.wrapTail}${chunk}`;
    const tailMatch = mainConcat.match(PigLatin.TAIL_SPLITTER);
    if (tailMatch) {
      mainConcat = tailMatch[1];
      this.wrapTail = tailMatch[2];
    } else {
      this.wrapTail = '';
    }

    return this.processChunk(mainConcat, callback);
  }

  _flush(callback: Function): void
  {
    return this.processChunk(this.wrapTail, callback);
  }

  private processChunk(chunk: string, callback: Function)
  {
    try {
      this.push(
        chunk.replace(
          PigLatin.WORD_SPLITTER,
          function (subphrase: string, gap: string, prefix: string, suffix: string) {
            let retval = gap;
            if (!!suffix || !!prefix) {
              retval = `${suffix}${prefix}ay`.toLowerCase();
              if (`${prefix}${suffix}`.match(/^[A-Z]/)) {
                retval = retval.replace(/^([a-z])/, function (capital) {
                  return capital.toUpperCase();
                });
              }
              retval = `${gap}${retval}`;
//               console.log(
//                 'subphrase: ', subphrase, 'gap: ', gap,
//                 'prefix: ', prefix, 'suffix: ', suffix,
//                 'retval: ', retval);
//             } else {
//               console.log('subphrase: ', subphrase, 'gap: ', gap, 'retval: ', retval);
            }

            return retval;
          }
        )
      );
    } catch (err) {
      return callback(err);
    }

    return callback();
  }
}

