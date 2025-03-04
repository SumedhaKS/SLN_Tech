const { contextBridge, ipcRenderer } = require("electron");

console.log("preload script is running!!!")

contextBridge.exposeInMainWorld('versions',{
    node : ()=> process.versions.node,
    chrome : ()=> process.versions.chrome,
    electron : ()=> process.versions.electron,
    ping : ()=> ipcRenderer.invoke('ping'),
   
})
