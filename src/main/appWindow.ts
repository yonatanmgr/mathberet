import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@misc/window/titlebarIPC';
import * as fs from 'fs';
const { resolve } = require('path');
const os = require('os');
import onboardingContent from './Onboarding';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 700,
    minHeight: 400,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => appWindow.show());

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

ipcMain.on('getOS', () => {
  let OS = '';
  switch (os.platform()) {
    case "darwin":
      OS = "mac";
      break;
    case "win32":
      OS = "windows"
      break;
    case "linux":
      OS = "linux"
      break;
  
    default:
      break;
  }
  appWindow.webContents.send('gotOS', OS);
});

ipcMain.on('saveX', (event, data, filePath) => {
  const filesPath = path.join(app.getPath('documents'), 'Mathberet', 'files');

  if (fs.existsSync(filesPath)) {
    fs.writeFileSync(path.join(filePath), data, 'utf-8');
  } else {
    fs.mkdirSync(filesPath, { recursive: true });
    fs.writeFileSync(path.join(filePath), data, 'utf-8');
  }
});

ipcMain.on('loadX', (event, filePath) => {

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      error
        ? console.error('Error Reading file: ', error)
        : appWindow.webContents.send('gotLoadedDataX', data);
    });
  } else {
    console.error('File not found!');
  }
});

ipcMain.on('openFiles', () => {
  shell
    .openPath(path.join(app.getPath('documents'), 'Mathberet', 'files'))
    .catch((error) => {
      console.error(error);
    });
});

ipcMain.on('move', (event, oldDir, newDir) => {
  fs.renameSync(oldDir, newDir);
});

ipcMain.on('delete', (event, path, isFolder) => {
  isFolder ? fs.rmSync(path, { recursive: true, force: true }) : fs.rmSync(path);
});

ipcMain.on('load', (event, file) => {
  fs.readFile(file, 'utf-8', (error, data) => {
    appWindow.webContents.send('fromMain', data);
  });
});

ipcMain.on('newFile', (event, filePath) => {
  fs.writeFileSync(filePath, '{}');
});

ipcMain.on('newFolder', (event, folderPath) => {
  fs.mkdirSync(folderPath);
});


let firstTime = true;

function buildTree(dir: string, root: any) {
  const stats = fs.statSync(dir);
  let name = path.basename(dir).split('.')[0];
  let key = dir;

  if (firstTime) {
    name = 'root';
    key = 'root';
    firstTime = false;
  }

  if (!stats.isDirectory()) {
    root[key] = {
      index: key,
      data: name,
      children: [],
      path: dir,
      isFolder: false,
    };

    return key;
  }

  const children = fs
    .readdirSync(dir)
    .map((child) => buildTree(path.join(dir, child), root));

  root[key] = {
    index: key,
    isFolder: true,
    data: name,
    children,
    path: dir,
  };

  return key;
}

ipcMain.on('getNotebooks', () => {
  const filesPath = path.join(app.getPath('documents'), 'Mathberet', 'files');

  if (!fs.existsSync(filesPath)) {
    fs.mkdirSync(filesPath, {recursive: true});
    fs.writeFileSync(path.join(filesPath, "Welcome to Mathberet!.json"), JSON.stringify(onboardingContent))
  }

  const root = {};
  buildTree(filesPath, root);
  firstTime = true;
  appWindow.webContents.send('gotNotebooks', { filesPath, root });
});

ipcMain.on('getPicture', (event, id) => {
  const allPics = fs.readdirSync(path.join(__dirname, '..', 'attachments'), {
    withFileTypes: true,
  });
  let foundPath, b64;
  for (const picture of allPics) {
    if (picture.name.split('.')[0] == id.toString()) {
      foundPath = path.join(__dirname, '..', 'attachments', picture.name);
      b64 = fs.readFileSync(foundPath, 'base64');
      break;
    }
  }
  appWindow.webContents.send('gotPicture', `data:image/png;base64,${b64}`);
  return;
});


ipcMain.on('getArchive', () => {
  const filesPath = path.join(__dirname, '..', 'files');

  const groupsToFilter: [] = [];
  function getAllGroups() {
    const allGroups = [];
    const allFiles = fs.readdirSync(filesPath, { withFileTypes: true });
    for (const file of allFiles) {
      if (file.isDirectory()) {
        const subFiles = fs.readdirSync(path.join(filesPath, file.name), {
          withFileTypes: true,
        });
        for (const subfile of subFiles) {
          if (subfile.name.split('.')[1] == 'json') {
            const readFile = fs.readFileSync(
              path.join(filesPath, file.name, subfile.name),
              'utf-8',
            );
            for (const block of JSON.parse(readFile)) {
              if (block.type == 'Group') {
                allGroups.push(block);
              }
            }
          }
        }
      } else {
        if (file.name.split('.')[1] == 'json') {
          const readFile = fs.readFileSync(
            path.join(filesPath, file.name),
            'utf-8',
          );
          for (const block of JSON.parse(readFile)) {
            if (block.type == 'Group') {
              allGroups.push(block);
            }
          }
        }
      }
    }
    return allGroups;
  }

  const allGroups = getAllGroups();

  function removeDups(arr: any[]) {
    const uniqueIds: any[] = [];
    const unique = arr.filter((element) => {
      const isDuplicate = uniqueIds.includes(element);
      if (!isDuplicate) {
        uniqueIds.push(element);
        return true;
      }
      return false;
    });
    return unique.map(
      (groupTitle) => (groupTitle = { groupName: groupTitle, subGroups: [] }),
    );
  }

  const finalArr = [];
  for (const group of removeDups(groupsToFilter)) {
    if (group.groupName != 'קבוצה') {
      for (const subGroup of allGroups) {
        if (subGroup.groupTitle == group.groupName) {
          group.subGroups.push(subGroup);
        }
      }
      finalArr.push(group);
    }
  }

  appWindow.webContents.send('gotArchive', finalArr);
});

ipcMain.on('startSearch', (event, args) => {
  const filesPath = path.join(__dirname, '..', 'files');
  function getAllBlocks() {
    const allGroups = [];
    const allFiles = fs.readdirSync(filesPath, { withFileTypes: true });
    for (const file of allFiles) {
      if (file.isDirectory()) {
        const subFiles = fs.readdirSync(path.join(filesPath, file.name), {
          withFileTypes: true,
        });
        for (const subfile of subFiles) {
          const readFile = fs.readFileSync(
            path.join(filesPath, file.name, subfile.name),
            'utf-8',
          );
          allGroups.push({
            filePath: path.join(filesPath, file.name, subfile.name),
            fileName: subfile.name.replace('.json', ''),
            blocks: JSON.parse(readFile),
          });
        }
      } else {
        const readFile = fs.readFileSync(
          path.join(filesPath, file.name),
          'utf-8',
        );
        allGroups.push({
          filePath: path.join(filesPath, file.name),
          fileName: file.name.replace('.json', ''),
          blocks: JSON.parse(readFile),
        });
      }
    }
    return allGroups;
  }
  const allGroups = getAllBlocks();
  appWindow.webContents.send('gotAllBlocks', allGroups);
});

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  registerTitlebarIpc(appWindow);
}
