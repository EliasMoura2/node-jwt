if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const app = require('./app')

app.set('port', process.env.PORT || 3000);
const port = app.get('port');

async function init(){
    await app.listen(port, ()=>{
        console.log(`Server listening on port = ${port}`);
    });
}

init();