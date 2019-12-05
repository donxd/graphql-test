const {
    buildSchema,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const users = require('./dataUsers.json');

const toolsStructure = {
    name: 'tools',
    fields: {
        icon: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
    },
};

const tools = new GraphQLObjectType(toolsStructure);

const userStructure = {
    name: 'User',
    fields: {
        career: {
            type: GraphQLString,
        },
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        nameShort: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        linkedin: {
            type: GraphQLString,
        },
        github: {
            type: GraphQLString,
        },
        image: {
            type: GraphQLString,
        },
        cf: {
            type: GraphQLString,
        },
        tools: {
            type: new GraphQLList(tools),
        },
        // tools: () => ({...toolsStructure.fields}),
        // tools: () => ({
        //     icon: {
        //         type: GraphQLString,
        //     },
        //     name: {
        //         type: GraphQLString,
        //     },
        // }),
    },
};

const user = new GraphQLObjectType(userStructure);


function filterByArgs (userS, args, fields) {
    for (let i in fields) {
        if (args[i]!==undefined) {
            if (args[i]!==userS[i]) return false;
        }
    }
    return true;
}

const queryStructure = {...userStructure.fields};
delete queryStructure.tools;

// queryStructure.tools = toolsStructure.fields;
// queryStructure.tools = toolsStructure; //x
// queryStructure.tools = tools;

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            users: {
                type: new GraphQLList(user),
                resolve: () => users,
            },
            user: {
                type: user,
                args: queryStructure,
                // resolve: (r, {id}) => users.filter(userS => userS.id === id)[0] // fail
                // resolve: (r, {id}) => users.filter(userS => userS.id === id) // fail
                // resolve: (r, {id}) => {
                resolve: (r, args) => Promise.resolve(users.filter(userS => filterByArgs(userS, args, userStructure.fields)))
                    .then(filtered => filtered.length ? filtered[0] : null)
            },
        },
    })
});

// module.exports = buildSchema(`
//   type Query {
//     user: {
//         career: String,
//         id: String,
//         name: String,
//         nameShort: String,
//         email: String,
//         linkedin: String,
//         github: String,
//         image: String,
//         cf: String
//     }
//   }
// `);