const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

console.log(document.getElementById('CreateWindowBtn'))

const CreateWindowBtn = document.getElementById('CreateWindowBtn');

CreateWindowBtn.addEventListener('click', function(event){
    let PopUpWindow = new BrowserWindow({
        width: 400,
        height: 200
    });

    PopUpWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'popup.html'),
        protocol: 'file',
        slashes: true
    }))

    
})
