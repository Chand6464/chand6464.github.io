import { ImageMagick, initializeImageMagick } from "./magick.js";

const mimeTypes = {
  AVIF: "image/avif",
  BMP: "image/bmp",
  EPS: "application/postscript",
  GIF: "image/gif",
  ICO: "image/x-icon",
  JPEG: "image/jpeg",
  PNG: "image/png",
  PS: "application/postscript",
  PSD: "image/vnd.adobe.photoshop",
  TIFF: "image/tiff",
  WEBP: "image/webp"
};
let initialization;

self.addEventListener("message", async ({ data }) => {
  try {
    await initialize();
    const output = ImageMagick.read(
      new Uint8Array(data.bytes),
      data.source,
      (image) => image.write(data.target, (bytes) => new Uint8Array(bytes))
    );
    if (!(output instanceof Uint8Array) || output.length === 0) {
      throw new Error(`The local codec could not convert ${data.source} to ${data.target}.`);
    }
    self.postMessage({ id: data.id, output: output.buffer, type: mimeTypes[data.target] }, [output.buffer]);
  } catch (error) {
    self.postMessage({
      id: data.id,
      error: error instanceof Error ? error.message : "The file could not be converted."
    });
  }
});

function initialize() {
  if (!initialization) {
    initialization = (async () => {
      const response = await fetch(new URL("./magick.wasm", import.meta.url));
      if (!response.ok) throw new Error("The local image codec could not be loaded. Please try again.");
      await initializeImageMagick(new Uint8Array(await response.arrayBuffer()));
    })().catch((error) => {
      initialization = null;
      throw error;
    });
  }
  return initialization;
}
