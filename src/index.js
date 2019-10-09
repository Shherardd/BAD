const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron : path.join(__dirname, '../node_modules', '.bin', 'electron')
    });

}


let mainWindow;
let nuevaVentana;



app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable : false,
        title: 'BAD',
        webPreferences: {
            nodeIntegration: true
        }
    });
    //mainWindow.webContents.openDevTools()
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/login.html'),
        protocol: 'file',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu (mainMenu);

    mainWindow.on('close', () => {
        app.quit();
    })
});

function crearNuevaVentana () {
    nuevaVentana = new BrowserWindow({
        width: 600,
        height: 400,
        title: 'Nueva Ventana'
    })
    nuevaVentana.setMenu(null);
    /*nuevaVentana.loadURL(url.format({
        pathname: path.join(__dirname, 'views/nueva_ventana.html'),
        protocol: 'file',
        slashes: true
    }));*/
    nuevaVentana.loadURL('https://www.google.com')
    nuevaVentana.on('closed', () => {
        nuevaVentana = null;
    })
}

const templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Nuevo',
                accelerator: 'Ctrl+N',
                click(){
                    crearNuevaVentana();
                }
            }
        ]
    },
    {
        label:'Editar'
    },
    {
        label: 'Opciones',
        submenu: [
            {
                label: 'Cerrar Sesion',
                click(){
                    mainWindow.loadURL(url.format({
                        pathname: path.join(__dirname, 'views/login.html'),
                        protocol: 'file',
                        slashes: true
                    }));
                }
            }
        ]
    }
]

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label:'DevTools',
        submenu:[
            {
                label: 'Show',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                    //mainWindow.webContents.openDevTools()
                }
            },
            {
                label: 'hide',
                click(item, focusedWindow){
                    focusedWindow.closeDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })

}