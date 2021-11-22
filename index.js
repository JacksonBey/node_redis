const express = require('express');
const {readFile, readFileSync} = require('fs').promises;
// const fetch =import('node-fetch');
const fetch = require('node-fetch');
const redis = require('redis');






const app = express();

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

// set response
const setData = (pokeName, data) => {
  return `<div>
            <h1>${pokeName}</h1>
            <img src='${data.sprites?.front_default}' ></img>
          </div>`
}

// cache middleware
const cache = (req, res, next) => {
  const {pokeName} = req.params;
  client.get(pokeName, (err, data) => {
    if(err) throw err;
    if(data){
      res.send(setData(pokeName, JSON.parse(data)));
    } else {
      next();
    }
  });
}

// this function gets a random pokemon's name from pokeapi
const getPokemonName = async (req, res, next) => {
    try{
      const {pokeName} = req.params;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
      const data = await response.json();
      //set data to redis
      client.setex(pokeName,3600, JSON.stringify(data));

      res.send(setData(pokeName, data));

    } catch(err){
        console.error(err);
        res.status(500)
    }
};


app.get("/pokemon/:pokeName",cache, getPokemonName);



app.listen(3000, () => {
  console.log('listening on port 3000');
})








// app.get('/', async (req, response) => {
//   // readFile('./home.html', 'utf8', (err, html) => {
//   //   if (err) {
//   //     response.status(500).send('Sorry out of order');
//   //   }
//   //   response.send(html);
//   response.send(await readFile('./home.html', 'utf8'));
// });

// app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'));





// const {EventEmitter} = require('events');
// const eventEmitter = new EventEmitter();



// const MyModule = require('./my-module');

// eventEmitter.on('messageLogged', function() {
//   console.log('Listener Called');
// });

// eventEmitter.emit('messageLogged')
// eventEmitter.emit('messageLogged')

// readFile('./hello.txt', 'utf8', (err, txt) => {
//     // if(err) {
//     //     console.log(err);
//     //     return;
//     // }
//     console.log(txt);
// });

// async function hello(){
//   const file = await readFile('./hello.txt', 'utf8');
// }

// console.log(MyModule)