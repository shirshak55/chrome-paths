import {
	getChromeBetaPath,
	getChromeCanaryPath,
	getChromeDevPath,
	getChromePath,
	getAnyChromeStable,
	getAnyChromeLatest,
} from "./dist/index.js"
import { execFile } from "child_process"
import { promisify } from "util"

// don't forget to replace above with following line
// let { getChromeBetaPath, getChromeCanaryPath, getChromeDevPath, getChromePath } from 'chrome-paths'

// Here is one naive example. Uncomment following line to test
// console.log(getChromeBetaPath())
// console.log(getChromeCanaryPath())
// console.log(getChromeDevPath())
// console.log(getChromePath())

// Todo when canary beta are released remove ignoredOnLinux
// variable. And don't forget to update src/main.ts
console.log("Testing Chrome Browser")
async function check(binaryPathFunc, shouldBe) {
	let ignoreOnLinux = ["canary"]
	shouldBe = shouldBe.toLowerCase()

	console.log("Running test for", {
		binaryPath: binaryPathFunc,
		shouldBe,
		platform: process.platform,
		ignoreOnLinux: ignoreOnLinux.includes(shouldBe),
	})

	if (process.platform === "linux" && ignoreOnLinux.includes(shouldBe)) {
		return
	}

	console.log("Checking for path")
	let pth = binaryPathFunc()
	console.log("Path is", pth)
	console.log("Checking for version")

	if (process.platform !== "win32") {
		const { stdout } = await promisify(execFile)(pth, ["--version"])
		console.log("Version is", stdout)

		if (stdout.trim().toLowerCase().includes(shouldBe)) {
			console.log(`Passed: ${pth}`)
		} else {
			throw `Couldn't get ${pth} working`
		}
	} else if (process.platform === "win32") {
		const { stdout } = await promisify(execFile)("ls", [pth])

		if (stdout.trim().toLowerCase().includes(".exe")) {
			console.log(`Passed: ${pth}`)
		} else {
			throw `Couldn't get ${pth} working`
		}
	} else {
		throw "Invalid platform"
	}
}

async function main() {
	await check(() => getChromeBetaPath(), "Beta")
	await check(() => getChromeCanaryPath(), "Canary")
	await check(() => getChromeDevPath(), "Dev")
	await check(() => getChromePath(), "Chrome")
}

main().catch((e) => {
	console.log("Error from main", e)
	// Exit so ci can notice?
	process.exit(1)
})
