const userModel = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.logIn = asyncHandler(async (req, res, next)=>{
    const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(!user){
        res.json('connot find this user')
    }
    res.status(200).json({data: user});
    next();
});
// exports.signIn = asyncHndler(async(req, res) => {
//     const user = await User.findOne(em);

//     if (!user) {
//         res.json('not found')
//     }
//     res.status(404).json({data: user});
// });
/////////////
// async function signIn(req, res) {
//     const { email, password } = req.body;

//     try {
//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Check if the password is correct
//         if (user.password !== password) {
//             return res.status(401).json({ error: 'Incorrect password' });
//         }

//         // If everything is correct, send back user data
//         res.json({ user });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }


