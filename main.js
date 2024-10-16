const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const BASE_URL = "http://localhost:4200";

let win;

function createBaseWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 500,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  win.setAlwaysOnTop(true);
  // win.loadFile('dist/sticky-notes/browser/index.html');
  win.loadURL(BASE_URL);
}

function createWindow() {
  let newWin = new BrowserWindow({
    width: 400,
    height: 500,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  return newWin;
}

ipcMain.on('console', (event, arg) => {
  console.log(arg);
})

ipcMain.on('new-note', (event, arg) => {
  const newNote = createWindow();

  newNote.setAlwaysOnTop(true);
  // newNote.loadFile('dist/sticky-notes/browser/index.html');
  newNote.loadURL(`${BASE_URL}/note`)

  newNote.webContents.send('id-transfer', "testing");
})

ipcMain.on('toggle-on-top', (event, arg) => {
  senderWindow = BrowserWindow.fromId(event.sender.id);
  senderWindow.setAlwaysOnTop(!senderWindow.isAlwaysOnTop());
})

ipcMain.on('minimize', (event, arg) => {
  BrowserWindow.fromId(event.sender.id).minimize();
})

ipcMain.on('close', (event, arg) => {
  event.sender.close();
})

app.whenReady().then(createBaseWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createBaseWindow();
  }
});
