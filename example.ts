import {PigLatin, StringReader} from '.';

const cases = [
  'hello',
  'hello world',
  'Hello world',
  'Hello, world!!',
  'eat apples',
  'quick brown fox',
  'Quick Brown Fox',
  'Dr!',
  'D',
  'DR',
  'Dr',
  'ColorMixer uses a Scheduler because of the debounceTime operator. In order to marble test it properly we need to tell it to use the TestScheduler to allow it to act as a virtual clock. We also need to modify the mixingTime to be the number of frames we want instead of milliseconds. The ColorMixer can now be properly tested'
];
const allCases = cases.join('\n');

const reader = new StringReader(allCases);
export const tx = reader.pipe(
  new PigLatin()
)
  .on('data', function(data: any) {
    console.log(data.utf8Slice());
  })
  .on('end', function () {
    console.log('** The End **');
  });

reader.open();

