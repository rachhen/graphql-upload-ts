import { Readable } from "node:stream";

/**
 * Safely ignores a Node.js readable stream.
 * @param stream Node.js readable stream.
 */
export const ignoreStream = (stream: Readable) => {
  // Prevent an unhandled error from crashing the process.
  stream.on("error", () => {});

  // Waste the stream.
  stream.resume();
};
