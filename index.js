const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const menuTemplate = [
  {
    label: 'The Hidden Button',
    submenu: [
      {
        label: 'New Window',
        accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
        click (item, focusedWindow) {
          createMainWindow()
        }
      },
      {
        label: 'Change Window URL',
        accelerator: 'F5',
        click (item, focusedWindow) {
          focusedWindow.reload()
        }
      },
      {
        label: 'Pin Window (Always on Top)',
        accelerator: process.platform === 'darwin' ? 'Command+P' : 'Ctrl+P',
        click (item, focusedWindow) {
          focusedWindow.isAlwaysOnTop() ? focusedWindow.setAlwaysOnTop(false) : focusedWindow.setAlwaysOnTop(true) 
        }
      },
      {
        label: 'Previous',
        accelerator: 'Backspace',
        click (item, focusedWindow) {
          focusedWindow.webContents.history.length - 2 >= 0 ? focusedWindow.loadURL(focusedWindow.webContents.history[focusedWindow.webContents.history.length - 2]) : null
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          focusedWindow ? focusedWindow.toggleDevTools() : null
        }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(menuTemplate)
let mainWindow = Array, counter = 0

app.on('ready', () => {
  createMainWindow()
})

app.on('activate', () => {
  if (mainWindow.length < 1) {
    createMainWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function createMainWindow() {
  mainWindow[counter] = new electron.BrowserWindow({
    autoHideMenuBar: true
  })
  mainWindow[counter].setMenu(menu)
  mainWindow[counter].loadFile('./src/index.html')
  mainWindow[counter].on('close', () => {
    mainWindow[counter] = null
  })
  counter++
}
