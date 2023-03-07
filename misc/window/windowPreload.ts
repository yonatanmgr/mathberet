import { contextBridge, ipcRenderer } from 'electron';
import titlebarContext from './titlebarContext';

contextBridge.exposeInMainWorld('api', {
  titlebar: titlebarContext,
  send: (channel: string, data: string) => {
    // whitelist channels
    const validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: () => void) => {
    const validChannels = [
      'gotLoadedDataX',
      'Home',
      'Picture',
      'gotAllPictures',
      'gotPicture',
      'Shortcuts',
      'gotAllBlocks',
      'openArchive',
      'gotPageStyle',
      'gotUserTheme',
      'gotArchive',
      'gotUserColor',
      'openFiles',
      'newFile',
      'Save',
      'fromMain',
      'Text',
      'Graph',
      'Math',
      'Group',
      'gotNotebooks',
      'toggleNotebooks',
      'Search',
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  getNotebooks: () => {
    ipcRenderer.send('getNotebooks');
  },
  delete: (file: string) => {
    ipcRenderer.send('delete', file);
  },
  newFile: () => {
    ipcRenderer.send('newFile');
  },
  openFiles: () => {
    ipcRenderer.send('openFiles');
  },
  move: (oldDir: string, newDir: string) => {
    ipcRenderer.send('move', oldDir, newDir);
  },
  save: (data: string, file: string, newName: string) => {
    ipcRenderer.send('save', data, file, newName);
  },
  load: (file: string) => {
    ipcRenderer.send('load', file);
  },
  saveX: (data: string) => {
    ipcRenderer.send('saveX', data);
  },
  loadX: () => {
    ipcRenderer.send('loadX');
  },
  maximize: () => {
    ipcRenderer.send('maximize');
  },
  unmaximize: () => {
    ipcRenderer.send('unmaximize');
  },
  minimize: () => {
    ipcRenderer.send('minimize');
  },
  close: () => {
    ipcRenderer.send('close');
  },
  setUserColor: (color: string) => {
    ipcRenderer.send('setUserColor', color);
  },
  setPageStyle: (style: string) => {
    ipcRenderer.send('setPageStyle', style);
  },
  toggle: () => {
    ipcRenderer.send('dark-mode');
  },
  getUserColor: () => {
    ipcRenderer.send('getUserColor');
  },
  getPageStyle: () => {
    ipcRenderer.send('getPageStyle');
  },
  getUserTheme: () => {
    ipcRenderer.send('getUserTheme');
  },
  getPicture: (id: string) => {
    ipcRenderer.send('getPicture', id);
  },
  getAllPictures: (path: string) => {
    ipcRenderer.send('getAllPictures', path);
  },
  getArchive: () => {
    ipcRenderer.send('getArchive');
  },
  startSearch: () => {
    ipcRenderer.send('startSearch');
  },
});
