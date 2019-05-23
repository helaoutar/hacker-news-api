const { APP_SECRET, getUserID } = require("../utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MutationResolver = {
  post: (p, a, context) => {
    const id = getUserID(context);
    return context.prisma.createLink({
      url: a.url,
      description: a.description,
      postedBy: { connect: { id } }
    });
  },
  signup: async (p, a, context) => {
    const password = await bcrypt.hash(a.password, 10);
    const user = await context.prisma.createUser({ ...a, password });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      user,
      token
    };
  },
  login: async (p, a, context) => {
    const user = await context.prisma.user({ email: a.email });
    if (!user) {
      throw new Error("No such user found!");
    }

    const valid = await bcrypt.compare(a.password, user.password);
    if (!valid) {
      throw new Error("Invalid Password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user
    };
  },
  vote: async (p, a, context) => {
    const userId = getUserID(context);

    const linkExists = await context.prisma.$exists.vote({
      user: { id: userId },
      link: { id: a.linkId }
    });

    if (linkExists) {
      throw new Error("Already voted for this link");
    }

    return await context.prisma.createVote({
      user: { connect: { id: userId } },
      link: { connect: { id: a.linkId } }
    });
  }
};

module.exports = MutationResolver;
