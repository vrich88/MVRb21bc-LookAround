// require models and authorization
const { User } = require("../models");
const { signToken } = require("../utils/auth");
// define resolvers
const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).select("-password");
                return user;
            }
            throw new Error("You need to login first");
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            const pw = await user.isCorrectPassword(password);
            if (user && pw) {
                const token = signToken(user);
                return { token, user };
            }
            throw new Error("Incorrect email or password");
        },
        addBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return user;
            }
            throw new Error("No");
        },
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return user;
            }
            throw new Error("No");
        },
    }
};
// export resolvers
module.exports = resolvers;