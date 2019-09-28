const { app, BrowserWindow, Menu } = require('electron');
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
        title: 'data2info'
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
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
        width: 400,
        height: 330,
        title: 'Nueva Ventana'
    })
    nuevaVentana.setMenu(null);
    nuevaVentana.loadURL(url.format({
        pathname: path.join(__dirname, 'views/nueva_ventana.html'),
        protocol: 'file',
        slashes: true
    }));
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
    }
]