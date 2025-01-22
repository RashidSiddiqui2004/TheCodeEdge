// import { AuthorBadge } from "@/enums/AuthorBadges";
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import bcyrpt from 'bcryptjs';

// // Function is explicitly named as post, get, patch, delete in next.js
// // route is handled implicitly in next.js as just the folder structure handles the routes

// export async function POST(request: Request) {

//     await dbConnect();

//     try {
//         const { username, email, password } = await request.json();

//         const existingUsersByUsername = await UserModel.findOne({
//             username,
//             isVerified: true,
//         })

//         if (existingUsersByUsername) {
//             return Response.json(
//                 {
//                     success: false,
//                     message: "Username already taken!"
//                 },
//                 {
//                     status: 400
//                 }
//             )
//         }

//         const existingUsersByEmail = await UserModel.findOne({
//             email,
//             isVerified: true
//         });

//         const verifyCode = Math.floor(10000000 + Math.random() * 900000).toString();

//         if (existingUsersByEmail !== null) {
//             if (existingUsersByEmail.isVerified) {
//                 return Response.json(
//                     {
//                         success: false,
//                         message: "User already exists with this email!"
//                     },
//                     {
//                         status: 400
//                     }
//                 )
//             }
//             else {
//                 const hashedPassword = await bcyrpt.hash(password, 10);
//                 existingUsersByEmail.password = hashedPassword;
//                 existingUsersByEmail.verifyCode = verifyCode;
//                 existingUsersByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
//                 await existingUsersByEmail.save();
//             }
//         }
//         else {
//             const hashedPassword = await bcyrpt.hash(password, 10);
//             const expiryDate = new Date()
//             expiryDate.setHours(expiryDate.getHours() + 1);

//             const newUser = new UserModel({
//                 username,
//                 email,
//                 password: hashedPassword,
//                 verifyCode,
//                 isVerified: false,
//                 verifyCodeExpiry: expiryDate,
//                 bio: "I am amazing coder...",
//                 authorBadge: AuthorBadge.Reader
//             })

//             try {
//                 await newUser.save();
//                 console.log("User saved successfully");
//             } catch (error) {
//                 console.error("Error saving user:", error);
//             }

//         }


//         return Response.json({
//             success: true,
//             message: "User registered successfully."
//         }, { status: 201 })

//     }
//     catch (error) {
//         console.log("Error registering user!");

//         return Response.json(
//             {
//                 success: false,
//                 message: "Error registering user"
//             },
//             {
//                 status: 500
//             }
//         )

//     }
// }