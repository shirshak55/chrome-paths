import got from "got"
import fs from "fs"

async function main() {
	let resp = await got.get(
		"https://chromiumdash.appspot.com/fetch_releases?platform=all",
		{},
	)

	let json = JSON.parse(resp.body)

	let links = []
	for (let version of json) {
		for (let release of version.releases) {
			if (
				release.platform === "win" ||
				release.platform === "mac" ||
				release.platform === "linux"
			) {
				if (process.platform === "darwin" && release.platform === "mac") {
					links.push(release.download_url)
				}
				if (process.platform === "linux" && release.platform === "linux") {
					links.push(release.download_url)
				}
				if (process.platform === "win32" && release.platform === "win") {
					links.push(release.download_url)
				}
			}
		}
	}

	for (let url of links) {
		let ss = url.split("/")
		let fname = ss[ss.length - 1]
		let resp = await got({
			url: url,
			method: "GET",
			responseType: "buffer",
		}).buffer()
		console.log(
			`Saving ${fname} with ${resp.byteLength / (1024 * 1024)} MB`,
		)
		fs.writeFileSync(fname, resp)
	}
}

main().catch((e) => console.log("error", e))