function newLinkSubscription(p, a, context) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
}

function newVoteSubscription(p, a, context) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
}

const newLink = {
    subscribe: newLinkSubscription,
    resolve: p => p
}

const newVote = {
    subscribe: newVoteSubscription,
    resolve: p => p
}

module.exports = {
    newLink,
    newVote
}