import { z } from "zod";

const urlSchema = z.string().url();

function validUrl(url: string) {
  try {
    urlSchema.parse(url);
    return true; // URL is valid
  } catch (e) {
    return false; // URL is invalid
  }
}

function createsArray(urls: string): string[] {
  const arrayOfUrls = urls.replaceAll(" ", "").split("\n");
  const noDuplicates = [...new Set(arrayOfUrls)];
  const noEmptyStrings = noDuplicates.filter((url) => url !== "");
  return noEmptyStrings;
}

function isValidInput(urls: string[]): boolean {
  const wrongUrls = urls.find((url) => !validUrl(url));
  return wrongUrls === undefined ? true : false;
}

export { createsArray, isValidInput };
