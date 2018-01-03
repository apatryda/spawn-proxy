import $ from './spawn-proxy';

$.ls['-al']({
  stdio: ['ignore', process.stdout, process.stderr],
}).then(
  () => console.log('done'),
  error => console.log({ error })
);
