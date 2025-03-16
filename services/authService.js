const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const registerUser = async (username, email, password) => {
    const existingUser = await userRepository.findUserByEmail(email);
    if(existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository.createUser({ username, email, password: hashedPassword });
};

const loginUser = async (email, password) => {
    const user = await userRepository.findUserByEmail(email);
    if(!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: "1hr"})
    return token;
}

module.exports = { registerUser, loginUser };