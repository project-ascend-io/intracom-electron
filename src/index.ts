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
    const url = request.url.substring(11); // Remove 'intracom://'
    const filePath = path.normalize(`${__dirname}/${url}`);
    callback({ path: filePath });
  });

  // On macOS, you can force protocol re-registration with:
  app.setAsDefaultProtocolClient("intracom");
});

app.on("ready", () => {
  createWindow();

  // Use protocol.handle to register the custom protocol
  protocol.handle("intracom", (request: Request): Response => {
    const url = request.url.substring(11); // Remove 'intracom://'
    const filePath = path.join(__dirname, url);

    try {
      if (fs.existsSync(filePath)) {
        // Return the file content as a Response
        const fileBuffer = fs.readFileSync(filePath);
        return new Response(fileBuffer, {
          status: 200,
          headers: { "Content-Type": "application/octet-stream" }, // Adjust MIME type as needed
        });
      } else {
        console.error("File does not exist:", filePath);
        // Return a 404 response
        return new Response("File Not Found", {
          status: 404,
          statusText: "File Not Found",
        });
      }
    } catch (error) {
      console.error("Error reading file:", error);
      // Return a 500 response for internal errors
      return new Response("Internal Server Error", {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle custom protocol event to open files on macOS
app.on("open-url", (event, url) => {
  event.preventDefault();
  const filePath = url.replace("intracom://", "");
  const fullPath = path.join(__dirname, filePath);

  if (fs.existsSync(fullPath)) {
    // console.log("Opening file:", fullPath);
    exec(`open "${fullPath}"`);
  } else {
    console.error("File does not exist:", fullPath);
  }
});
