import "@dotenvx/dotenvx";
import { app, BrowserWindow, protocol, session } from "electron";
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

  // Load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open DevTools
  mainWindow.webContents.openDevTools();

  // Force reload the window to ensure the extension is properly loaded.
  mainWindow.webContents.once("did-frame-finish-load", () => {
    mainWindow.webContents.reloadIgnoringCache();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// React Developer Tools are installed before the window is created.

app.whenReady().then(async () => {
  const reactDevToolsPath = path.join(
    __dirname,
    "..",
    "..",
    "src",
    "assets",
    "tools",
    "reactDevTools",
  );

  try {
    if (!app.isPackaged) {
      await session.defaultSession.loadExtension(reactDevToolsPath);
      console.log("React Developer Tools installed.");
    }
  } catch (error) {
    console.error("Failed to load React Developer Tools:", error);
  }

  // Set up protocol and open the window
  protocol.registerHttpProtocol("intracom", (request, callback) => {
    const url = request.url.substring(11);
    const filePath = path.normalize(`${__dirname}/${url}`);
    callback({ path: filePath });
  });

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
