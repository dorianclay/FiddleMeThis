import fs from "fs";
import os from "node:os";
import path from "path";
import { access, mkdir, readFile } from "node:fs/promises";
import extract from "extract-zip";
import { parseDocument } from "htmlparser2";
import { Document, Element } from "domhandler";

const tempDir = path.join(os.tmpdir(), "FiddleMeThis");

const usedTemp = false;

export const unzip = async (file: path.ParsedPath): Promise<string> => {
  await createTempDir();
  const unzipDir = path.join(tempDir, file.name);

  await extract(path.format(file), { dir: unzipDir });

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
  if (!usedTemp) {
    return;
  }

  try {
    fs.rmSync(tempDir, { recursive: true });
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log(`Cleaned ${tempDir}`);
  }
};

export const parseSazIndex = async (indexFile: string): Promise<string[][]> => {
  console.log("parsing saz file...");

  const fileContents = await readFile(indexFile);

  const dom: Document = parseDocument(fileContents.toString());
  const tableElements: Element[] =
    dom.lastChild.lastChild.firstChild.lastChild.children;

  const sessionData = [
    [
      "#",
      "Result",
      "Protocol",
      "Host",
      "URL",
      "Body",
      "Caching",
      "Content-Type",
      "Process",
      "Comments",
      "Custom",
    ],
  ];

  for (const row of tableElements) {
    const rowData: string[] = [];
    let links = true;
    for (const cell of row.children) {
      if (links) {
        links = false;
      } else {
        rowData.push(cell.firstChild?.data);
      }
    }
    sessionData.push(rowData);
  }

  return sessionData;
};
