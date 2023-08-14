import { app, BrowserWindow, crashReporter, globalShortcut, webContents, session, MenuItem, Menu  } from "electron"
const electronLocalshortcut = require('electron-localshortcut');
import * as path from "path"

let mainWindow: Electron.BrowserWindow | null;
let adminWindow: Electron.BrowserWindow | null;
adminWindow = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        height: 1000,
        width: 1000,
        autoHideMenuBar: true,
        fullscreenable: true
    });
    const template = 
        {
          label: 'Clear Cache',
          submenu: [
            {
              label: 'Clear Cache',

             click() {
                mainWindow.webContents.session.clearStorageData()
              }
            }
          ]
        }
    const clearCache = new MenuItem(template)
    let menu = Menu.getApplicationMenu()
    menu.append(clearCache)
    Menu.setApplicationMenu(menu)

    mainWindow.loadURL('http://localhost:3000/')

    electronLocalshortcut.register(mainWindow, 'Ctrl+I', () => {
        mainWindow.webContents.goBack()
    });

    electronLocalshortcut.register(mainWindow, 'Alt', () => {
        mainWindow.setMenuBarVisibility(false)
    });


    electronLocalshortcut.register(mainWindow, 'Ctrl+P', () => {
        if(adminWindow === null)
            createAdminWindow();
    });


    mainWindow.on("closed", () => {
        mainWindow = null;
    });

}

function createAdminWindow() {
    adminWindow = new BrowserWindow({
        height: 1000,
        width: 1000,
        autoHideMenuBar: true,
        fullscreenable: true
    });

    adminWindow.loadURL('http://localhost:3000/admin')

    electronLocalshortcut.register(adminWindow, 'Ctrl+I', () => {
        adminWindow.webContents.goBack()
    });

    electronLocalshortcut.register(adminWindow, 'Alt', () => {
        adminWindow.setMenuBarVisibility(false)
    });

    adminWindow.on("closed", () => {
        adminWindow = null;
    });

}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if(mainWindow === null) {
        createWindow();
    }
});