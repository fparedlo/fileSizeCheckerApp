import type { FileSize, Urls } from "@/types/app.types";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com";

const delay = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

async function fetchFileSizes(urls: Urls): Promise<FileSize[]> {
	const fileSizes: FileSize[] = [];

	for (const url of urls) {
		try {
			const response = await fetch(`${CORS_PROXY}/${url}`, {
				method: "HEAD",
			});
			if (!response.ok) {
				throw new Error(`${response.statusText}`);
			}
			const contentLength = response.headers.get("Content-Length");
			fileSizes.push({
				url: url,
				size: contentLength
					? `${(Number.parseInt(contentLength, 10) / 1024).toFixed(2)} kB`
					: "Unknown size",
			});
		} catch (error) {
			fileSizes.push({
				url: url,
				size: `${(error as Error).message}`,
			});
		}

		// Wait for 3 seconds before the next request
		await delay(3000);
	}

	return fileSizes;
}

export default fetchFileSizes;
