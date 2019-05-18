function link(p, a, context) {
    return context.prisma.vote({ id: p.id }).link()
}

function user(p, a, context) {
    return context.prisma.user({ id: p.id }).user()
}

module.exports = {
    link,
    user
}