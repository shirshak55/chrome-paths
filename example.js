import {
	getChromeBetaPath,
	getChromeCanaryPath,
	getChromeDevPath,
	getChromePath,
	getAnyChromeStable,
	getAnyChromeLatest,
} from "./dist/index.js"
// don't forget to replace above with following line
// let { getChromeBetaPath, getChromeCanaryPath, getChromeDevPath, getChromePath } from 'chrome-paths'

// Here is one naive example. Uncomment following line to test
// console.log(getChromeBetaPath())
// console.log(getChromeCanaryPath())
// console.log(getChromeDevPath())
// console.log(getChromePath())

// Here is another example with try catch
// This find chrome function just ignore the error
function findChrome(func) {
	try {
		let path = func()
		console.log("Found path", path)
	} catch (e) {
		console.log("Error on finding path", e)
	}
}

findChrome(() => getChromeBetaPath())
findChrome(() => getChromeCanaryPath())
findChrome(() => getChromeDevPath())
findChrome(() => getChromePath())
findChrome(() => getAnyChromeStable())
findChrome(() => getAnyChromeLatest())
