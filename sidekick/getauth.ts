const axios = require('axios');
const fss = require('fs')

if(!fss.existsSync( "auth_info_multi.json")){

    axios.get(process.env.URL, {responseType: "stream"} )
    .then(response => {
        response.data.pipe(fss.createWriteStream("auth_info_multi.json"));
    })
    .catch(error => {
        console.log(error);
    });
}

