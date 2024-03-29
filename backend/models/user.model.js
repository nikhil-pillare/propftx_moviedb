const mongoose = require("mongoose")

const UserShchema = new mongoose.Schema({
    email: String,
    password:String,
    username:String,
    avatar:String
},
{
    versionKey: false
}
)

const UserModel= mongoose.model("User", UserShchema)

module.exports= UserModel