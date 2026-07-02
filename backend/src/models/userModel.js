export const createUserDocument = ({ username, email, password }) => ({
    username,
    email,
    password,
    createdAt: new Date()
});