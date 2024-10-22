import "@dotenvx/dotenvx";
import { app, BrowserWindow, protocol } from "electron";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    minWidth: 600,
    minHeight: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  protocol.registerHttpProtocol("intracom", (request, callback) => {
    const url = request.url.substring(11);
    const filePath = path.normalize(`${__dirname}/${url}`);
    callback({ path: filePath });
  });

  // On macOS, you can force protocol re-registration with:
  app.setAsDefaultProtocolClient("intracom");
});

app.on("ready", () => {
  createWindow();
  protocol.handle("intracom", (request: Request): Response => {
    const url = request.url.substring(11);
    const filePath = path.join(__dirname, url);

    try {
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return new Response(fileBuffer, {
          status: 200,
          headers: { "Content-Type": "application/octet-stream" }, // Adjust MIME type as needed
        });
      } else {
        console.error("File does not exist:", filePath);
        return new Response("File Not Found", {
          status: 404,
          statusText: "File Not Found",
        });
      }
    } catch (error) {
      console.error("Error reading file:", error);
      return new Response("Internal Server Error", {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("open-url", (event, url) => {
  event.preventDefault();
  const filePath = url.replace("intracom://", "");
  const fullPath = path.join(__dirname, filePath);

  if (fs.existsSync(fullPath)) {
    exec(`open "${fullPath}"`);
  } else {
    console.error("File does not exist:", fullPath);
  }
});
