function postedBy(p, a, context) {
    return context.prisma.link({ id: p.id }).postedBy()
}


function votes(p, a, context) {
    return context.prisma.link({ id: p.id }).votes()
}

module.exports = {
    postedBy,
    votes
}