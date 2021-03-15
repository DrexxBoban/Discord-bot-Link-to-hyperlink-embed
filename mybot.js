//  Copyright (C) <2021>  <Boban Banjevic>
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.

//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.

//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <https://www.gnu.org/licenses/>.

const Discord = require('discord.js');
const client = new Discord.Client();

//Connection//

client.on('ready', () => {
    console.log('Connected as ' + client.user.tag)

    //Message Received//

    client.on('message', (receivedMessage) => {
        if (receivedMessage.author == client.user){
            return
        }

        //If message received starts with !//

        if(receivedMessage.content.startsWith("!")){
            processCommand(receivedMessage)
        }
    })

    //Message separated in 3 parts - Name|URL|Description//

    function processCommand(receivedMessage){

        let fullCommand = receivedMessage.content.substr(1)
        let splitCommand = fullCommand.split(" ")
        let primaryCommand = splitCommand[0]

        let arr = new Array();
        arr = splitCommand;
        let indexLink=0;

        ///Goes through the array and loop till it starts with passed values, get index//

        for(i=0; i<arr.length;i++){
            if(arr[i].startsWith("http://") || arr[i].startsWith("https://")){
                indexLink=indexLink+i;
                break;
            }
        }

        let firstArr = arr.slice(1,indexLink);
        let string = firstArr.join(" ");
        let secondArr = arr.slice(indexLink+1);
        let string1 = secondArr.join(" ")

        let arguments = string
        let arguments1 = splitCommand.slice(indexLink,indexLink+1);
        let desc = string1

        ///If a description is an empty string, don't add the separator "-" in front//

        if(desc != ""){
            desc = desc.replace (/^/,' - ');
        }

        //If command starts with a link word//

        if(primaryCommand == "link"){
            helpCommand(arguments, receivedMessage, arguments1, desc)
        }
    }

    //Pass values embed to description in the format [Name](URL)" - Description"//

    function helpCommand(arguments, receivedMessage, arguments1, desc){
        const embed = {     
            "description": `[${arguments}](${arguments1}) ${desc}`,
            "url": `${arguments1}`,
            "color": 2784274,
          };

        //Send response from the bot and deleted coded message from user, else nothing//

        if(arguments.length !== 0){
            receivedMessage.channel.send({embed})
            setTimeout(() => receivedMessage.delete(), 500);
        }else{
            ;
        }
    }

})

//Type Your bot's Token here once you create it at discord.com/developers//

client.login("Type in bot's Token")
