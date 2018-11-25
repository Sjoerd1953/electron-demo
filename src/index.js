const electron = require('electron').remote;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let PopUpWindow

const CreateWindowBtn = document.getElementById('CreateWindowBtn');

CreateWindowBtn.addEventListener('click', function(event){
    PopUpWindow = new BrowserWindow({
        width: 400,
        height: 200,
        show: false
    });

    PopUpWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'popup.html'),
        protocol: 'file',
        slashes: true
    }))

    //Wait for window build-up to be completed
    PopUpWindow.once('ready-to-show', () => {
        PopUpWindow.show()
    })
})