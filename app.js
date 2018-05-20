const electron = require("electron")
const {app, BrowserWindow} = require("electron")
const path                 = require ("path")
const url                  = require("url")
const https                = require("https")

let mainWindow = null

function createWindow(){

    mainWindow = new BrowserWindow({
        width: 640,
        height: 480
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,"pokedex.html"),
        protocol: "file:",
        slashes:  true
    }))

}

function loadPokemon(){
    requestResource("pokemon-species/1",pokemon=>{
    
        mainWindow.webContents.send("pokemonSpeciesLoaded",pokemon)

    })
}

function requestResource(resource, callback){

    https.get(`https://pokeapi.co/api/v2/${resource}/`, response =>{

        response.setEncoding("utf8")

        let data =""

        response.on("data",chunk=> {
            data+=(chunk)
        })

        response.on("end",()=>{
            callback(JSON.parse(data))
        })

    }).on("error", error => console.error(error))


}

app.on("ready",createWindow)
app.on("ready",loadPokemon)
