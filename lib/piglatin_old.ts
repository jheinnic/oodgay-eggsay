import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import {Scheduler} from 'rxjs/Scheduler';
import {async} from 'rxjs/scheduler/async';

enum ParseMode
{
  BetweenWords,
  InPrefix,
  InPrefixPostQ,
  InSuffix
}

interface ParseState
{
  mode: ParseMode;
  ucSuffix?: boolean;
  prefix: string;
  result: string;
}

const VOWELS = /^[aAeEiIoOuU]$/;
const CONST_WITH_Q = /^[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]$/;
const LC_CONST_NO_Q = /^[b-df-hj-npr-tv-z]$/;
const UC_CONST_NO_Q = /^[B-DF-HJ-NPR-TV-Z]$/;
const ALPHA = /^[a-zA-Z]$/;
const LC_JUST_Q = 'q';
const UC_JUST_Q = 'Q';
const JUST_U = /^[uU]$/;
const AY = 'ay';
const BLANK = '';

export function pigLatin(input: Observable<string>): Observable<string>
{
  return input.concatMap(
    (phrase: string) => Observable.from(phrase)
      .reduce((acc: ParseState, token: string) => {
          let retVal;
          switch (acc.mode) {
            case ParseMode.BetweenWords:
            {
              if (token.match(VOWELS)) {
                retVal = {
                  mode: ParseMode.InSuffix,
                  ucSuffix: false,
                  prefix: BLANK,
                  result: acc.result + token
                };
              } else if (token === LC_JUST_Q) {
                retVal = {
                  mode: ParseMode.InPrefixPostQ,
                  ucSuffix: false,
                  prefix: token,
                  result: acc.result
                };
              } else if (token === UC_JUST_Q) {
                retVal = {
                  mode: ParseMode.InPrefixPostQ,
                  ucSuffix: true,
                  prefix: token.toLowerCase(),
                  result: acc.result
                };
              } else if (token.match(LC_CONST_NO_Q)) {
                retVal = {
                  mode: ParseMode.InPrefix,
                  ucSuffix: false,
                  prefix: token,
                  result: acc.result
                };
              } else if (token.match(UC_CONST_NO_Q)) {
                retVal = {
                  mode: ParseMode.InPrefix,
                  ucSuffix: true,
                  prefix: token.toLowerCase(),
                  result: acc.result
                };
              } else {
                retVal = {
                  mode: ParseMode.BetweenWords,
                  ucSuffix: false,
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
                  ucSuffix: false,
                  prefix: acc.prefix,
                  result: acc.result + (acc.ucSuffix ? token.toUpperCase() : token)
                };
              } else if (token.match(CONST_WITH_Q))
              {
                retVal = {
                  mode: ParseMode.InPrefix,
                  ucSuffix: acc.ucSuffix,
                  prefix: acc.prefix + token.toLowerCase(),
                  result: acc.result
                };
              } else {
                retVal = {
                  mode: ParseMode.BetweenWords,
                  ucSuffix: false,
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
                  mode: ParseMode.InPrefix,
                  ucSuffix: acc.ucSuffix,
                  prefix: acc.prefix + 'u',
                  result: acc.result
                };
              } else {
                throw Error('Post-Q language violation');
              }

              break;
            }
            case ParseMode.InSuffix:
            {
              if (token.match(ALPHA)) {
                retVal = {
                  mode: acc.mode,
                  ucSuffix: false,
                  prefix: acc.prefix,
                  result: acc.result + token.toLowerCase()
                };
              } else {
                retVal = {
                  mode: ParseMode.BetweenWords,
                  ucSuffix: false,
                  prefix: BLANK,
                  result: acc.result + acc.prefix + AY + token.toLowerCase()
                } ;
              }

              break;
            }
            default:
              throw Error(`Unknown parse mode: ${acc.mode}`);
          }

          return retVal;
        }, {
          mode: ParseMode.BetweenWords,
          ucSuffix: false,
          prefix: BLANK,
          result: BLANK
        } as ParseState
      )
      .map(parseState => {
        if (parseState.mode !== ParseMode.BetweenWords) {
          parseState.result = `${parseState.result}${parseState.prefix}${AY}`;
        }
        // console.log(parseState.result);
        return parseState.result;
      }));
}

