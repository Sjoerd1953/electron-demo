//Insert Electron modules
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const Menu = electron.Menu;
const shell = electron.shell;

//Insert Node.js modules
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3')



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let MainWindow;
let MainWindowMenu;

// ----------------------------------------- Functions ----------------------------------------------------
function createWindow () {
    // Create the browser window.
    MainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    })

    // and load the index.html of the app.
    MainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file',
        slashes: 'true'
    }))

    // Emitted when the window is closed.
    MainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        MainWindow = null
    })
}

function createDatabase (dbname){
    //Connect to database. If database doesn't exist it is created
    let db = new sqlite3.Database('./database/' + dbname + '.db')
    //Create tables. Only if tables do not exist
    db.serialize(function ()
        {
        db.run("CREATE TABLE IF NOT EXISTS Individuals("
                + "Id INTEGER PRIMARY KEY AUTOINCREMENT,"
                + "ChildOf INTEGER,"
                + "Title TEXT,"
                + "Prefix_FN TEXT,"
                + "FirstName TEXT,"
                + "Patronymical TEXT,"
                + "Prefix_LN TEXT,"
                + "LastName TEXT)"
                );

        db.run("CREATE TABLE IF NOT EXISTS Families("
                + "Id INTEGER PRIMARY KEY AUTOINCREMENT,"
                + "Father INTEGER,"
                + "Mother INTEGER,"
                + "FOREIGN KEY(Father) REFERENCES Individuals(Id),"
                + "FOREIGN KEY(Mother) REFERENCES Individuals(Id))"
                );
        }    
    )
    db.close
}
//-----------------------------------------------------------------------------------------------------------

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
    createWindow()

    //Wait for window build-up to be completed
    MainWindow.once('ready-to-show', () => {
        MainWindow.show()
    })

    // Add menu
    MainWindowMenu = Menu.buildFromTemplate(MainWindowMenuTemplate)
    Menu.setApplicationMenu(MainWindowMenu)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (MainWindow === null) {
        createWindow()
    }
})

// Create menu template for MainWindow
const MainWindowMenuTemplate = [
    {
    label:'Menu',
        submenu:[
            {
                label:'Create Database',                
                click(){createDatabase('Gendata')}  
            },
            {
                label:'Open eigen website',
                click(){shell.openExternal('http://van-staveren.net')}
            },
            {type:'separator'},
            {
                label:'Exit',
                click(){app.quit()}
            }
        ]
    },
    {
        label: 'Development',
            submenu:[
            {
                label:'Development console',
                click(){MainWindow.webContents.openDevTools()}
            }    

            ]
    }        
]