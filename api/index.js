//                       _oo0oo_
//                      o8888888o
//                      88"   "88
//                     8(| ~_~ |)8
//                    880\  O  /088
//                    88_/`---'\_88
//                  .' \\|     |// '.
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
