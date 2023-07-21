import fs from "fs";
import zlib from "zlib";
import os from "node:os";
import path from "path";
import { access, mkdir } from "node:fs/promises";
import extract from "extract-zip";

const tempDir = path.join(os.tmpdir(), "FiddleMeThis");

export const unzip = async (file: path.ParsedPath): Promise<string> => {
  await createTempDir();
  const unzipDir = path.join(tempDir, file.name);

  await extract(path.format(file), { dir: unzipDir });
  console.log("Extraction complete");

  return unzipDir;
};

const createTempDir = async () => {
  try {
    await access(tempDir);
  } catch {
    try {
      await mkdir(tempDir);
    } catch (err) {
      console.error(err.message);
    }
  }
};

export const cleanTemp = () => {
  console.log(`Cleaning ${tempDir}`);
  fs.rmSync(tempDir, { recursive: true });
};
