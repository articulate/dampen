# dampen
[![npm version](https://img.shields.io/npm/v/dampen.svg)](https://www.npmjs.com/package/dampen)
[![npm downloads](https://img.shields.io/npm/dm/dampen.svg)](https://www.npmjs.com/package/dampen)
[![Build Status](https://travis-ci.org/articulate/dampen.svg?branch=master)](https://travis-ci.org/articulate/dampen)
[![Coverage Status](https://coveralls.io/repos/github/articulate/dampen/badge.svg?branch=master)](https://coveralls.io/github/articulate/dampen?branch=master)

Debounce any redux action-creator.

```js
const dampen = require('dampen')

const update = dampen(250, payload =>
  ({ type: 'UPDATE', payload })
)

// elsewhere...

dispatch(update('one'))
dispatch(update('two'))
dispatch(update('three'))

// only { type: 'UPDATE', payload: 'three' }
// will be dispatched after 250ms
```

Requires [`redux-thunk`](https://github.com/reduxjs/redux-thunk) or [native support for thunks](https://github.com/flintinatux/puddles) to function properly.
