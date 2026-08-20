const ALPHABET="23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
export function createPublicCode(){const bytes=crypto.getRandomValues(new Uint8Array(6));const value=Array.from(bytes,byte=>ALPHABET[byte%ALPHABET.length]).join("");return `${value.slice(0,3)}-${value.slice(3)}`}
export function safeBaseUrl(value:string){const url=new URL(value);if(url.protocol!=="https:"&&url.hostname!=="localhost")throw new Error("The QR domain must use HTTPS");return url.origin}
export function safeDestinationUrl(value:string){const url=new URL(value.trim());if(url.protocol!=="https:"&&url.protocol!=="http:")throw new Error("Destination must be a valid http or https link");return url.toString()}
