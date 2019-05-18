function links(p, a, context) {
    return context.prisma.user({ id: p.id }).links()
}

module.exports = {
    links
}