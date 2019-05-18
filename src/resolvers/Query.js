const QueryResolver = {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (p, a, context) => {
        const where = a.filter ? {
            OR: [{ description_contains: a.filter }, { url_contains: a.filter }]
        } : {}

        return context.prisma.links({
            where
        }) 
    }
}

module.exports = QueryResolver