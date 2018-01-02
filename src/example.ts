import $ from './spawn-proxy';

$.ls['-al']({
  stdio: ['ignore', process.stdout, process.stderr],
});
