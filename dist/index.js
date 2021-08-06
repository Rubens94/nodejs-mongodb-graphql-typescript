const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const { port, database } = require('./config');
const app = express();
MongoClient.connect(database, { useNewUrlParser: true }, (err, db) => {
    if (err)
        throw err;
    require('./src/app')(app, db);
    app.listen(port, () => console.log(`Server on Port ${port}`));
});
//# sourceMappingURL=index.js.map