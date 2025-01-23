

type Urls = string[];

interface FileSize {
    url: string;
    size: string;
}

async function fetchFileSizes(urls : Urls) : Promise<FileSize[]> {
   const fileSizes = await Promise.all(urls.map(async (url) => {
       try {
           const response = await fetch(url, { method: 'HEAD' }); // Use HEAD to get headers only
           if (!response.ok) {
               throw new Error(`Error fetching ${url}: ${response.statusText}`);
           }
           const contentLength = response.headers.get('Content-Length');
           return {
               url: url,
               size: contentLength ? `${(parseInt(contentLength, 10) / 1024).toFixed(2)} MB` : 'Unknown size'
           };
       } catch (error) {
           return {
               url: url,
               size: `Error: ${(error as Error).message}`
           };
       }
   }));

   return fileSizes;
}

export default fetchFileSizes;

/*
 
 # Usage Example

 fetchFileSizes(urls).then(fileSizes => {
    console.log(fileSizes);
 });

*/