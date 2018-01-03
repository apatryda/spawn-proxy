# spawn-proxy

A simple wrapper over `child_process.spawn()`
## Example usage

### TypeScript

```typescript
import { spawnProxy: $ } from 'spawn-proxy';

$.ls['-al']({
  stdio: ['ignore', process.stdout, process.stderr],
}).then(
  () => console.log('done'),
  error => console.log({ error })
);

```

### JavaScript

```javascript
const { spawnProxy: $ } = require('spawn-proxy');

$.ls['-al']({
  stdio: ['ignore', process.stdout, process.stderr],
}).then(
  () => console.log('done'),
  error => console.log({ error })
);

```
