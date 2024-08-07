// import userModel from "../models/user.model.js";
// import jsonwebtoken from "jsonwebtoken";
// import responseHandler from "../handlers/response.handler.js";

// const signup = async (req, res) => {
//   try {
//     const { username, password, displayName } = req.body;

//     const checkUser = await userModel.findOne({ username });

//     if (checkUser)
//       return responseHandler.badrequest(res, "username already used");

//     const user = new userModel();

//     user.displayName = displayName;
//     user.username = username;
//     user.setPassword(password);

//     await user.save();

//     const token = jsonwebtoken.sign(
//       { data: user.id },
//       process.env.TOKEN_SECRET,
//       { expiresIn: "24h" }
//     );

//     responseHandler.created(res, {
//       token,
//       ...user._doc,
//       id: user.id,
//     });
//   } catch {
//     responseHandler.error(res);
//   }
// };

// const signin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await userModel
//       .findOne({ username })
//       .select("username password salt id displayName");

//     if (!user) return responseHandler.badrequest(res, "User not exist");

//     if (!user.validPassword(password))
//       return responseHandler.badrequest(res, "Wrong password");

//     const token = jsonwebtoken.sign(
//       { data: user.id },
//       process.env.TOKEN_SECRET,
//       { expiresIn: "24h" }
//     );

//     user.password = undefined;
//     user.salt = undefined;

//     responseHandler.created(res, {
//       token,
//       ...user._doc,
//       id: user.id,
//     });
//   } catch {
//     responseHandler.error(res);
//   }
// };

// const updatePassword = async (req, res) => {
//   try {
//     const { password, newPassword } = req.body;

//     const user = await userModel
//       .findById(req.user.id)
//       .select("password id salt");

//     if (!user) return responseHandler.unauthorize(res);

//     if (!user.validPassword(password))
//       return responseHandler.badrequest(res, "Wrong password");

//     user.setPassword(newPassword);

//     await user.save();

//     responseHandler.ok(res);
//   } catch {
//     responseHandler.error(res);
//   }
// };

// const getInfo = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user.id);

//     if (!user) return responseHandler.notfound(res);

//     responseHandler.ok(res, user);
//   } catch {
//     responseHandler.error(res);
//   }
// };

// export default {
//   signup,
//   signin,
//   getInfo,
//   updatePassword,
// };

import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    console.log("Signup request received:", req.body);

    const checkUser = await userModel.findOne({ username });

    if (checkUser) {
      console.log("Username already used:", username);
      return responseHandler.badrequest(res, "Username already used");
    }

    const user = new userModel();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    if (!process.env.TOKEN_SECRET) {
      console.error(
        "TOKEN_SECRET is not defined in the environment variables."
      );
      return responseHandler.error(res);
    }

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });

    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Signup error:", error);
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Signin request received:", req.body);

    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName");

    if (!user) {
      console.log("User not exist:", username);
      return responseHandler.badrequest(res, "User does not exist");
    }

    if (!user.validPassword(password)) {
      console.log("Wrong password for user:", username);
      return responseHandler.badrequest(res, "Wrong password");
    }

    if (!process.env.TOKEN_SECRET) {
      console.error(
        "TOKEN_SECRET is not defined in the environment variables."
      );
      return responseHandler.error(res);
    }

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.ok(res, {
      token,
      ...user._doc,
      id: user.id,
    });

    console.log("User signed in successfully:", user);
  } catch (error) {
    console.error("Signin error:", error);
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    console.log("Update password request received:", req.body);

    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) {
      console.log("User not found for ID:", req.user.id);
      return responseHandler.unauthorize(res);
    }

    if (!user.validPassword(password)) {
      console.log("Wrong current password for user ID:", req.user.id);
      return responseHandler.badrequest(res, "Wrong password");
    }

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);

    console.log("Password updated successfully for user ID:", req.user.id);
  } catch (error) {
    console.error("Update password error:", error);
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    console.log("Get info request received for user ID:", req.user.id);

    const user = await userModel.findById(req.user.id);

    if (!user) {
      console.log("User not found for ID:", req.user.id);
      return responseHandler.notfound(res);
    }

    responseHandler.ok(res, user);

    console.log("User info retrieved successfully for user ID:", req.user.id);
  } catch (error) {
    console.error("Get info error:", error);
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword,
};
