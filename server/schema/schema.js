const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;
const _ = require("lodash");

// dummy data
const books = [
  {
    name: "This is a book",
    genre: "Yeah",
    id: "1",
    authorId: "1"
  },
  {
    name: "This is another book",
    genre: "Nah",
    id: "2",
    authorId: "2"
  },
  {
    name: "This is a damn book",
    genre: "Damn",
    id: "3",
    authorId: "3"
  },
  {
    name: "This is my second book",
    genre: "Yeah",
    id: "4",
    authorId: "1"
  },
  {
    name: "Jones BBQ and Foot Massage",
    genre: "Nah",
    id: "5",
    authorId: "2"
  },
  {
    name: "...",
    genre: "Damn",
    id: "6",
    authorId: "3"
  }
];

const authors = [
  {
    name: "Ragan Martinez",
    age: 24,
    id: "1"
  },
  {
    name: "David Nguyen",
    age: 25,
    id: "2"
  },
  {
    name: "Jack Mo",
    age: 24,
    id: "3"
  }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {
          id: parent.authorId
        });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {
          authorId: parent.id
        });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // code to get data from db
        return _.find(books, {
          id: args.id
        });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return _.find(authors, {
          id: args.id
        });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
