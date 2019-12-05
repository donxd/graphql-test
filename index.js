const express = require('express');
const {graphql, buildSchema} = require('graphql');
const expressGraphql = require('express-graphql');
const schema = require('./schema');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('listening : ', PORT);
});

// app.get('/q', expressGraphql(req => ({
app.use('/q', expressGraphql(req => ({
    schema,
    graphiql: true,
    context: req.sesion,
})));

    // user: String,
    // user2(idd: Int!): Int
const vScheme = buildSchema(`
  type Query {
    user2(idd: String!): String
  }
`);

const dataUsers = [
    {
        id: '111',
        name: 'Juanito'
    },
    {
        id: '11687330',
        name: 'perro'
    }
];

const vRoot = {
    user: () => {
        // return [].filter(user => user.id === id);
        // return ['juanito', 'pedrito'].filter(user => user === id);
        return 'asdlkasdasd';
    },
    // user2: (id) => { return id*2; },
    // user2: (id) => { return id*2; },
    // user2: ({id}) => { return 'aaaa8888'+id },
    // user2: id => { console.log('pars : ', id); return 'aaaa8888'; },
    // user2: ({idd}) => { return 'aaaa8888'+idd; }, //ok
    // user2: ({idd}) => Promise.resolve([].filter(user => user.id===idd)).then(filtered => filtered.length ? filtered[0].name : 'empty'), //ok
    user2: ({idd}) => Promise.resolve(dataUsers.filter(user => user.id===idd)).then(filtered => filtered.length ? filtered[0].name : 'empty'), //ok
};

app.use('/gph', expressGraphql({
    schema: vScheme,
    rootValue: vRoot,
    graphiql: true,
}));

// module.exports = app;