const { app, BrowserWindow } = require('electron')
const { resolve } = require('path')

let win
function create () {
  const options = {
    width: 1000,
    height: 800
  }

  BrowserWindow.addDevToolsExtension(
    resolve(
      '/Users/mickey', // Home Dir
      'Library/Application\ Support/Google/Chrome', // Chrome location
      'Profile\ 1', // Chrome profile
      'Extensions',
      'fmkadmapgofadopljbjfkapdkoienihi', // React dev tools id
      '3.4.1_0'
    )
  )

  win = new BrowserWindow(options)
  win.loadFile('app/index.html')
  win.webContents.openDevTools()
  win.on('closed', () => { win = null })
}

app.on('ready', create)

  /*
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
  */

  /*
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    create()
  }
})
*/
