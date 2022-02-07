export
const String = require("../lib/db");
const inputSanitization = require("../sidekick/input-sanitization");
const BOOK = String.book
const TRANSMIT = require('../core/transmission')
const cheerio = require("cheerio");
const fs = require("fs")
const axios = require("axios");

module.exports = {
    name: "book",
    description: BOOK.DESCRIPTION,
    extendedDescription: BOOK.EXTENDED_DESCRIPTION,
    demo: {
        isEnabled: true,
        text: [
            ".book 9781430258636",
            ".book 978-18-78707-52-9",
            ".book 0-7645-3537-4"
        ],
    },
    async handle(client, chat, BotsApp, args) {
        try {

            if (args.length === 0)
                return  await  TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:BOOK.NO_INPUT})


            const isbn = args[0].replace(/-/g,'')
            console.log(isbn)

            var regex=/^[0-9]+X?$/;
            if (!isbn.match(regex) || !(isbn.length == 10 || isbn.length == 13))
            {
                return  await  TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:BOOK.INVALID_INPUT})
            }

            await  TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:BOOK.SEARCHING_BOOK})

            const url = "http://libgen.is/search.php?req=" + isbn;

            let download_url = ""   //main url of book to be downloaded to disk
            let filename = "" // name of downloaded file

            try {
                const { data } = await axios.get(url);
                const $ = cheerio.load(data);
                let foundbooks = new Map();

                $('a').attr('href',function(index,currentvalue){

                    if(currentvalue.includes('http://library.lol/main/')){

                        const book_metadata = $(`a[href=${currentvalue}]`)[0].parent.prev.prev
                        const type = book_metadata.children[0].data
                        const size = book_metadata.prev.prev.children[0].data
                        const pages = book_metadata.prev.prev.prev.prev.prev.prev.children[0].data

                        const book = {
                            url: "",
                            type: "",
                            size: 0,
                            pages:""
                        }

                        book.url = currentvalue;
                        book.type = type
                        book.pages = pages
                        book.size = size.includes("Mb")?parseFloat(size.replace("Mb","")):size.includes("Kb")?parseFloat(size.replace("Kb",""))/1024:null

                        if(book.type === "pdf")
                            foundbooks.set(book.url,book)
                    }

                })

                if(foundbooks.size == 0)  return  await  TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:BOOK.BOOK_NOT_FOUND})

                foundbooks = new Map([...foundbooks.entries()].sort((a, b) => a[1].size - b[1].size));
                const book_url = [...foundbooks][0][0]
                const book_pages = [...foundbooks][0][1].pages


                const data2 = await axios.get(book_url);
                const temp = cheerio.load(data2.data);


                temp('a').attr('href',function(index,currentvalue){

                    if(currentvalue.includes('https://cloudflare-ipfs.com/'))
                        download_url = currentvalue

                })

                filename = temp('h1').text().replace(/\W+/g,'_') + ".pdf"

                await  TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:BOOK.DOWNLOADING_BOOK})

                axios({
                    method: "get",
                    url: download_url,
                    responseType: "stream"

                }).then(function (response) {
                    response.data.pipe(fs.createWriteStream(filename));
                });

                await  TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:BOOK.UPLOADING_BOOK})

                await  TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{document:{url:filename},fileName:filename,pageCount:book_pages}).catch(err => inputSanitization.handleError(err, client, BotsApp));

                return await inputSanitization.deleteFiles(filename)


            }catch (err) {
                await inputSanitization.handleError(err, client, BotsApp);
                await inputSanitization.deleteFiles(filename)
            }


        } catch (err) {
            await inputSanitization.handleError(err, client, BotsApp);
        }
    }
}