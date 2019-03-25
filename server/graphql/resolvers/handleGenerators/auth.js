import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export async function createUser(args) {
    try {
        // ES6 object destructuring
        const {
            email,
            password,
            confirm
        } = args.userInput; // retrieve values from arguments

        // retur the user who matches with the value given
        const existingUser = User.findOne({ email });
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