import { z } from "zod";

const zodInputCheck = z.array(z.string().url());

type Urls = string[];

interface FileSize {
  url: string;
  size: string;
}

async function fetchFileSizes(urls: Urls): Promise<FileSize[]> {
  const fileSizes = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/${url}`,
          {
            method: "HEAD",
          }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error(`Error fetching ${url}: ${response.statusText}`);
        }
        const contentLength = response.headers.get("Content-Length");
        console.log(contentLength);
        return {
          url: url,
          size: contentLength
            ? `${(parseInt(contentLength, 10) / 1024).toFixed(2)} MB`
            : "Unknown size",
        };
      } catch (error) {
        return {
          url: url,
          size: `Error: ${(error as Error).message}`,
        };
      }
    })
  );

  return fileSizes;
}

export default fetchFileSizes;

/*
 
 # Usage Example

 fetchFileSizes(urls).then(fileSizes => {
    console.log(fileSizes);
 });

*/
