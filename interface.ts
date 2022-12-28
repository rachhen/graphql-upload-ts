import { ReadStream, WriteStream, ReadStreamOptions } from "fs-capacitor";
import { IncomingMessage, ServerResponse } from "node:http";

export interface FileUpload {
  /**
   * File name.
   */
  filename: string;

  /**
   * File MIME type. Provided by the client and can’t be trusted.
   */
  mimetype: string;

  /**
   * File stream transfer encoding.
   */
  encoding: string;

  /**
   * A private implementation detail that shouldn’t be used outside
   * [`graphql-upload`](https://npm.im/graphql-upload).
   */
  capacitor: WriteStream;

  /**
   * Creates a [Node.js readable stream](https://nodejs.org/api/stream.html#readable-streams)
   * of the file’s contents, for processing and storage.
   * @see [Node.js `Readable` stream constructor docs](https://nodejs.org/api/stream.html#new-streamreadableoptions).
   * @see [Node.js stream backpressure guide](https://nodejs.org/en/docs/guides/backpressuring-in-streams).
   */
  createReadStream(options?: ReadStreamOptions): ReadStream;
}

export type ProcessRequestResult =
  | { [key: string]: unknown }
  | { [key: string]: unknown }[];

export type ProcessRequestFunction = (
  request: IncomingMessage,
  response: ServerResponse,
  options: ProcessRequestOptions
) => Promise<ProcessRequestResult>;

export interface ProcessRequestOptions {
  /**
   * Maximum allowed non file multipart form field
   * size in bytes; enough for your queries. Defaults to `1000000` (1 MB).
   */
  maxFieldSize?: number;

  /**
   * Maximum allowed file size in bytes. Defaults to `Infinity`.
   */
  maxFileSize?: number;

  /**
   * Maximum allowed number of files. Defaults to `Infinity`.
   */
  maxFiles?: number;
}

export interface GraphqlUploadExpressOptions extends ProcessRequestOptions {
  processRequest?: ProcessRequestFunction;
}
