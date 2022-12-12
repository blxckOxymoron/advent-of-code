const data = await Deno.readTextFile("./6/data.txt");

let markerFound = false;
let messageFound = false;

for (let i = 0; i < data.length - 4; i++) { // len 6 => 0123, 1234, 2345
  const marker = data.slice(i, i + 4);
  if (!markerFound && onlyDistinct(marker)) {
    console.log("Marker:", marker, "at", i + 4);
    // Marker: crjs at 1198
    markerFound = true;
  }

  const message = data.slice(i, i + 14);
  if (!messageFound && onlyDistinct(message)) {
    console.log("Message:", message, "at", i + 14);
    // Message: vcqnlwmrfgjhbd at 3120
    messageFound = true;
  }

  if (markerFound && messageFound) break;
}

function onlyDistinct(c: string) {
  return c.split("").sort().findIndex((v, i, o) => v === o[i + 1]) === -1;
}
