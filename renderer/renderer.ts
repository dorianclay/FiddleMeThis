/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./main.css";

document.addEventListener("dragenter", (event) => {
  event.preventDefault();
  event.stopPropagation();
});

document.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.stopPropagation();
});

document.addEventListener("drop", async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const pathArr: string[] = [];
  for (const f of event.dataTransfer.files) {
    // Using the path attribute to get absolute file path
    pathArr.push(f.path); // assemble array for main.js
  }

  try {
    const data = await window.dropbox.drop(pathArr);
    if (data.sessionData) {
      console.log(
        `Successfully parsed SAZ index file with ${data.sessionData.length} lines`,
      );
    }
    console.log(`${data.error ? "Error! " : ""}${data.message}`);
  } catch (err) {
    console.error(err);
  }
});

import './app'