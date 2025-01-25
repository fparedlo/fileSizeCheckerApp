import type { FileSize, Urls } from "@/types/app.types";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com";

async function fetchFileSizes(urls: Urls): Promise<FileSize[]> {
	const fileSizes = await Promise.all(
		urls.map(async (url) => {
			try {
				const response = await fetch(`${CORS_PROXY}/${url}`, {
					method: "HEAD",
				});
				if (!response.ok) {
					throw new Error(`Error fetching ${url}: ${response.statusText}`);
				}
				const contentLength = response.headers.get("Content-Length");
				return {
					url: url,
					size: contentLength
						? `${(Number.parseInt(contentLength, 10) / 1024).toFixed(2)} kB`
						: "Unknown size",
				};
			} catch (error) {
				return {
					url: url,
					size: `Error: ${(error as Error).message}`,
				};
			}
		}),
	);

	return fileSizes;
}

export default fetchFileSizes;
