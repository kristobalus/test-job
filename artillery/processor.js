module.exports = {
    generateRandomId: (userContext, events, done) => {
        userContext.vars.id = Math.ceil(Math.random() * 10_000);
        return done();
    }
};