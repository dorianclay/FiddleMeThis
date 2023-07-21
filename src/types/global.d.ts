import FileResponse from "./FileResponse";

export {};

declare global {
  interface Window {
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
    };
    dropbox: {
      drop: (paths: string[]) => Promise<FileResponse>;
    };
  }
}
