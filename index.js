const express = require('express');
const {readFile, readFileSync} = require('fs').promises;

const app = express();

app.get('/', async (req, response) => {
  // readFile('./home.html', 'utf8', (err, html) => {
  //   if (err) {
  //     response.status(500).send('Sorry out of order');
  //   }
  //   response.send(html);
  response.send(await readFile('./home.html', 'utf8'));
});

app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'));





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