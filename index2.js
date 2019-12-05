const express = require('express');
const {graphql, buildSchema} = require('graphql');
const expressGraphql = require('express-graphql');

const app = express();

const PORT = process.env.PORT || 3000;

const schema = buildSchema(`
    type User {
        name: String!
        nameShort: String!
        email: String!
        linkedin: String!
        github: String!
        image: String!
        cf: String!
    }
`);

app.listen(PORT, () => {
    console.log('listening : ', PORT);
});

app.use('/q', expressGraphql(req => ({
    schema,
    graphiql: true,
    context: req.sesion,
})));