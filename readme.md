# Chrome Paths

[![npm version](https://img.shields.io/npm/v/chrome-paths.svg)](https://www.npmjs.com/package/chrome-paths)
[![Downloads](https://img.shields.io/npm/dm/chrome-paths.svg)](https://npmjs.com/chrome-paths)
[![Install size](https://packagephobia.now.sh/badge?p=chrome-paths)](https://packagephobia.now.sh/result?p=chrome-paths)
![Test Chrome Paths](https://github.com/shirshak55/chrome-paths/workflows/Test%20Chrome%20Paths/badge.svg)

Possible paths or binary names of [Chrome](https://www.google.com/chrome) in the current platform.

### Why?

-   Well Documented
-   Well Tested
-   Used by popular players
-   Written with Love <3
-   Fully open sourced

### Usage

###### Javascript

```javascript
import {
	getChromeBetaPath,
	getChromeCanaryPath,
	getChromeDevPath,
	getChromePath,
	getAnyChromeStable,
	getAnyChromeLatest,
} from "./dist/index.js"

console.log(getChromeBetaPath())
console.log(getChromeCanaryPath())
console.log(getChromeDevPath())
console.log(getChromePath())
// console.log(getAnyChromeStable())
// console.log(getAnyChromeLatest())
```

The output will look like this according to your installation:

```javascript
// On macOS
// /Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta
// /Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary
// /Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev
// /Applications/Google Chrome.app/Contents/MacOS/Google Chrome

// On Windows
// C:\Program Files (x86)\Google\Chrome Beta\Application\chrome.exe
// C:\Program Files (x86)\Google\Chrome Canary\Application\chrome.exe
// C:\Program Files (x86)\Google\Chrome Dev\Application\chrome.exe
// C:\Program Files (x86)\Google\Chrome\Application\chrome.exe

// On Linux
// /usr/bin/google-chrome-beta
// /usr/bin/google-chrome-canary
// /usr/bin/google-chrome-dev
// /usr/bin/google-chrome-stable
```

###### Typescript

```typescript
import {
	getChromeBetaPath,
	getChromeCanaryPath,
	getChromeDevPath,
	getChromePath,
} from "chrome-paths"

console.log(getChromeBetaPath())
console.log(getChromeCanaryPath())
console.log(getChromeDevPath())
console.log(getChromePath())
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```bash
$ npm install chrome-paths

// or

$ yarn add chrome-paths

// or

$ pnpm add chrome-paths
```


If you use deno you can use following command:
```bash
deno add jsr:@browser/chrome-paths
```

## API

```javascript
import {
	getChromeBetaPath,
	getChromeCanaryPath,
	getChromeDevPath,
	getChromePath,
	getAnyChromeStable,
	getAnyChromeLatest,
}  from "./dist/index.js"
```

-  getAnyChromeStable or getAnyChromeLatest might be more useful if you don't want any specific version.

## Used By

-   Please send PR if you are using chrome-paths. We will be accepting first 10 request.

## License

[MIT License](./LICENSE)

© 2024 Shirshak Bajgain
