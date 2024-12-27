import { existsSync } from "node:fs"
import path from "node:path"
import which from "which"
import process, { platform } from "node:process"

/**
 * Retrieves Chrome path for Linux.
 * @param name Chrome binary name.
 * @returns Chrome path for Linux or null if not found.
 */
function getChromeLinux(
	name: "google-chrome" | "google-chrome-stable" | "chromium-browser"
): string | null {
	try {
		const chromePath = which.sync(name)
		return chromePath
	} catch (e) { }

	return null
}

/**
 * Retrieves Chrome path for Windows.
 * @param chromeDirName Chrome directory name.
 * @returns Chrome path for Windows or null if not found.
 */
function getChromeWindows(
	chromeDirName: "Google\\Chrome" | "Chromium"
): string | null {
	const paths = []
	const suffix = `\\${chromeDirName}\\Application\\chrome.exe`
	const prefixes = [
		process.env.LOCALAPPDATA,
		process.env.PROGRAMFILES,
		process.env["PROGRAMFILES(X86)"],
	].filter((v) => !!v)

	for (let prefix of prefixes) {
		const chromePath = path.join(prefix!, suffix)
		paths.push(chromePath)
		if (existsSync(chromePath)) {
			return chromePath
		}
	}

	return null
}

/**
 * Retrieves Chrome path for macOS.
 * @param defaultPath Default Chrome path.
 * @returns Chrome path for macOS or null if not found.
 */
function getChromeDarwin(defaultPath: string): string | null {
	if (existsSync(defaultPath)) {
		return defaultPath
	}

	return null
}

/**
 * Chrome paths object.
 */
const chromePaths = {
	chrome: {
		linux: () => getChromeLinux("google-chrome"),
		darwin: () =>
			getChromeDarwin(
				"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
			),
		win32: () => getChromeWindows("Google\\Chrome"),
	},
	chromium: {
		linux: () => getChromeLinux("chromium-browser"),
		darwin: () =>
			getChromeDarwin(
				"/Applications/Chromium.app/Contents/MacOS/Chromium"
			),
		win32: () => getChromeWindows("Chromium"),
	},
}

/**
 * Retrieves the executable path for Chrome.
 * @returns Chrome executable path.
 */
export function getChromePath(): string {
	const chrome = chromePaths.chrome

	if (platform && platform in chrome) {
		const pth = chrome[platform as keyof typeof chrome]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Google Chrome", chromePaths)
}

/**
 * Retrieves the executable path for Chromium.
 * @returns Chromium executable path.
 */
export function getChromiumPath(): string {
	const chromium = chromePaths.chromium

	if (platform && platform in chromium) {
		const pth = chromium[platform as keyof typeof chromium]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Chromium", chromePaths)
}

/**
 * Throws an error if the platform is invalid or Chrome is not found.
 * @param additionalInfo Additional information for the error.
 * @param otherDetails Other details for debugging.
 */
function throwInvalidPlatformError(
	additionalInfo: string = "",
	otherDetails?: any
): never {
	throw {
		name: "chrome-paths",
		message: `Couldn't find the browser. ${additionalInfo}`,
		additionalInfo,
		otherDetails,
	}
}

/**
 * Throws the error if it is not related to Chrome path issues.
 * @param obj Error object.
 */
function throwIfNotChromePathIssue(obj: any) {
	if (
		Object.prototype.toString.call(obj) === "[object Object]" &&
		obj &&
		obj.name &&
		obj.name === "chrome-paths"
	) {
		return
	}

	throw obj
}
