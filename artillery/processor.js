module.exports = {
    generateRandomId: (userContext, events, done) => {
        userContext.vars.id = Math.ceil(Math.random() * 10_000);
        return done();
    },
    generatePageSize: (userContext, events, done) => {
        userContext.vars.pageSize = Math.ceil(Math.random() * 100);
        return done();
    },
    generatePage: (userContext, events, done) => {
        userContext.vars.page = Math.ceil(Math.random() * 100);
        return done();
    },
    generateRandomPagination(requestParams, context, ee, next) {
        context.vars.pageSize = Math.ceil(Math.random() * 100);
        context.vars.page = Math.ceil(Math.random() * 100);
        return next();
    }
};