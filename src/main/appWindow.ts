import { app, BrowserWindow, ipcMain, shell, nativeTheme } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@misc/window/titlebarIPC';
import * as fs from 'fs';
import Store from 'electron-store';
const { resolve } = require('path');

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
    icon: path.resolve('assets/images/appIcon.ico'),
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

const schema = {
  theme: { type: 'string', default: 'light' },
  color: { type: 'number', maximum: 360, minimum: 1, default: 203 },
  pageStyle: { type: 'string', default: 'transparent' },
};
fs.readdir(app.getPath('userData'), (err, res) => {
  if (err) {
    fs.mkdirSync(app.getPath('userData'));
    if (
      fs.readFileSync(
        path.join(app.getPath('userData'), 'config.json'),
        'utf8',
      ) == ''
    ) {
      fs.writeFileSync(path.join(app.getPath('userData'), 'config.json'), '{}');
    }
  } else if (
    fs.readFileSync(
      path.join(app.getPath('userData'), 'config.json'),
      'utf8',
    ) == ''
  ) {
    fs.writeFileSync(path.join(app.getPath('userData'), 'config.json'), '{}');
  }
});

// const store = new Store({ schema });
// nativeTheme.themeSource = store.get('theme');

// ipcMain.on('delete', (event, file) => {
//   shell.trashItem(path.resolve(file))
//   .catch((error) => {console.error(error)});
// });

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
  // fs.existsSync(filesPath)
  //   ? null
  //   : fs.mkdirSync(filesPath, { recursive: true });

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
    .openPath(path.resolve(path.join(__dirname, '..', 'files')))
    .catch((error) => {
      console.error(error);
    });
});

ipcMain.on('move', (event, oldDir, newDir) => {
  fs.renameSync(oldDir, newDir);
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

// ipcMain.on('setUserColor', (event, color) => {
//   store.set('color', color);
// });

// ipcMain.on('setPageStyle', (event, style) => {
//   store.set('pageStyle', style);
// });

// ipcMain.on('getPageStyle', (event, args) => {
//   appWindow.webContents.send('gotPageStyle', store.get('pageStyle'));
// });
// ipcMain.on('getUserTheme', (event, args) => {
//   appWindow.webContents.send('gotUserTheme', store.get('theme'));
// });

// ipcMain.on('getUserColor', (event, args) => {
//   appWindow.webContents.send('gotUserColor', store.get('color'));
// });

// ipcMain.on('dark-mode', () => {
//   if (nativeTheme.shouldUseDarkColors) {
//     nativeTheme.themeSource = 'light';
//     store.set('theme', 'light');
//   } else {
//     nativeTheme.themeSource = 'dark';
//     store.set('theme', 'dark');
//   }
// });

let firstTime = true;

function buildTree(dir: string, root: any) {
  const stats = fs.statSync(dir);
  let name = path.basename(dir).split('.')[0];

  if (firstTime) {
    name = 'root';
    firstTime = false;
  }

  if (!stats.isDirectory()) {
    root[name] = {
      index: name,
      data: name,
      children: [],
      path: dir,
      isFolder: false,
    };
    return name;
  }

  const children = fs
    .readdirSync(dir)
    .map((child) => buildTree(path.join(dir, child), root));

  root[name] = {
    index: name,
    isFolder: true,
    data: name,
    children,
    path: dir,
  };

  return name;
}

ipcMain.on('getNotebooks', () => {
  const filesPath = path.join(app.getPath('documents'), 'Mathberet', 'files');
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

// ipcMain.on('getAllPictures', (event, file) => {
//   let allPics = fs.readdirSync(path.join(__dirname, "..", "attachments"), {withFileTypes: true});
//   let allPicsArr = []
//   let foundPath;
//   for (const picture of allPics) {
//     foundPath = path.join(__dirname, "..", "attachments", picture.name);
//     let b64 = fs.readFileSync(foundPath, "base64")
//     allPicsArr.push({"Path": foundPath, "Base64": `data:image/png;base64,${b64}`})
//   }
//   let res;
//   if (file == '') {
//     res = JSON.parse(
//       fs.readFileSync(
//         path.join(__dirname, '..', 'allAttachments.json'),
//         'utf-8',
//       ),
//     );
//   } else {
//     res = JSON.parse(
//       fs.readFileSync(
//         path.join(__dirname, '..', 'allAttachments.json'),
//         'utf-8',
//       ),
//     ).filter((pic: { filePath: unknown }) => pic.filePath == file);
//   }
//   appWindow.webContents.send('gotAllPictures', res);
// });

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

  // for (const group of allGroups) {
  //   groupsToFilter.push(group.groupTitle);
  // }

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
