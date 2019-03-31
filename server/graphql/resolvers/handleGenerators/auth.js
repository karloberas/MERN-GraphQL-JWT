import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
require('dotenv').config();

export async function createUser(args) {
    try {
        // ES6 object destructuring
        const {
            email,
            password,
            confirm
        } = args.userInput; // retrieve values from arguments

        if (!validator.isEmail(email)) throw new Error('Invalid email.');

        // retur the user who matches with the value given
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists!');
        }

        if (password != confirm) {
            throw new Error('Passwords are inconsistent!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword
        }, (err) => { if (err) throw err });

        user.save();

        // if user is registered without errors
        // create token
        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        return { token, password: null, ...user._doc };
    }
    catch (err) {
        throw err;
    }
}

export async function login(args) {
    try {
        if (!validator.isEmail(args.email)) throw new Error('Invalid email.');

        const user = await User.findOne({ email: args.email });
        if (!user) throw new Error('Email does not exist');

        const passwordIsValid = await bcrypt.compare(args.password, user.password);
        if (!passwordIsValid) throw new Error('Password incorrect');

        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        return { token, password: null, ...user._doc };
    }
    catch (err) {
        throw err;
    }
}

export async function verifyToken(args) {
    try {
        const decoded = jwt.verify(args.token, process.env.SECRET);
        const user = await User.findOne({ _id: decoded.id });
        return {...user._doc, password: null}
    }
    catch (err) {
        throw err;
    }
}