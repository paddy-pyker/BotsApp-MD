const axios = require('axios');
const fss = require('fs')

axios.get(process.env.URL, {responseType: "stream"} )
    .then(response => {
        response.data.pipe(fss.createWriteStream("auth_info_multi.json"));
    })
    .catch(error => {
        console.log(error);
    });