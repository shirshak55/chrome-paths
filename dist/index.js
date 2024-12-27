import { existsSync } from "node:fs";
import path from "node:path";
import which from "which";
import process, { platform } from "node:process";
function getChromeLinux(name) {
    try {
        const chromePath = which.sync(name);
        return chromePath;
    }
    catch (e) { }
    return null;
}
function getChromeWindows(chromeDirName) {
    const paths = [];
    const suffix = `\\${chromeDirName}\\Application\\chrome.exe`;
    const prefixes = [
        process.env.LOCALAPPDATA,
        process.env.PROGRAMFILES,
        process.env["PROGRAMFILES(X86)"],
    ].filter((v) => !!v);
    for (let prefix of prefixes) {
        const chromePath = path.join(prefix, suffix);
        paths.push(chromePath);
        if (existsSync(chromePath)) {
            return chromePath;
        }
    }
    return null;
}
function getChromeDarwin(defaultPath) {
    if (existsSync(defaultPath)) {
        return defaultPath;
    }
    return null;
}
const chromePaths = {
    chrome: {
        linux: () => getChromeLinux("google-chrome"),
        darwin: () => getChromeDarwin("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
        win32: () => getChromeWindows("Google\\Chrome"),
    },
    chromium: {
        linux: () => getChromeLinux("chromium-browser"),
        darwin: () => getChromeDarwin("/Applications/Chromium.app/Contents/MacOS/Chromium"),
        win32: () => getChromeWindows("Chromium"),
    },
};
export function getChromePath() {
    const chrome = chromePaths.chrome;
    if (platform && platform in chrome) {
        const pth = chrome[platform]();
        if (pth) {
            return pth;
        }
    }
    throwInvalidPlatformError("Google Chrome", chromePaths);
}
export function getChromiumPath() {
    const chromium = chromePaths.chromium;
    if (platform && platform in chromium) {
        const pth = chromium[platform]();
        if (pth) {
            return pth;
        }
    }
    throwInvalidPlatformError("Chromium", chromePaths);
}
function throwInvalidPlatformError(additionalInfo = "", otherDetails) {
    throw {
        name: "chrome-paths",
        message: `Couldn't find the browser. ${additionalInfo}`,
        additionalInfo,
        otherDetails,
    };
}
function throwIfNotChromePathIssue(obj) {
    if (Object.prototype.toString.call(obj) === "[object Object]" &&
        obj &&
        obj.name &&
        obj.name === "chrome-paths") {
        return;
    }
    throw obj;
}
