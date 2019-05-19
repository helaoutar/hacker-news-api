const QueryResolver = {
  info: () => `This is the API of a Hackernews Clone`,
  feed: async (p, a, context) => {
    const where = a.filter
      ? {
          OR: [{ description_contains: a.filter }, { url_contains: a.filter }]
        }
      : {};

    const links = await context.prisma.links({
      where,
      skip: a.skip,
      first: a.first,
      orderBy: a.orderBy
    })

    const count = await context.prisma
      .linksConnection({
        where
      })
      .aggregate()
      .count()

    return {
      links,
      count
    };
  }
};

module.exports = QueryResolver;
