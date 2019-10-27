const User = require('../models/User')
const { OAuth2Client } = require('google-auth-library')


const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

exports.findOrCreateUser = async token => {
    //verify auth token
    const goolgeUser = await verifyAuthToken(token)
    //check if the user exists
    const user = await checkIfUserExists(goolgeUser.email)
    //if user exist return them or create new user in db
    return user ? user : createNewUser(goolgeUser)
}

const verifyAuthToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        });
        return ticket.getPayload();
    } catch (err) {
        console.error("Error verifying auth token", err);
    }
};

const checkIfUserExists = async email => await User.findOne({ email }).exec();

const createNewUser = goolgeUser => {
    const { name, email, picture } = goolgeUser
    const user = { name, email, picture }
    return new User(user).save();
}