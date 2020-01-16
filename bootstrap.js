const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let win;

function createWindow() {
    win = new BrowserWindow({
        height:800,
        width:1000,
        icon:'./Icon.png',
        resizable:false,
        darkTheme:true,
        transparent:true,
        frame:false,
        webPreferences: {
            nodeIntegration: true,
            devTools:false
        }
    });
    win.show();

    win.loadURL(url.format({
        pathname: path.join(__dirname,'pic.html'),
        protocol:'file',
        slashes:true
    }));
    //win.openDevTools();
    win.on('closed',()=>{
        win = null;
    });

    win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });

}

app.on('ready',createWindow);
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin')
    app.quit();
});
app.on('activate',()=>{
    if(win === null)
    createWindow();
});
