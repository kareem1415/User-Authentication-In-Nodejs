const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"]

    },
    email: {
        type: String,
        required: [true, "please add a name "],
        unique: true,
        trim: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "please entre password"],
        minLength: [6, "the Password must be up to 6"],
        // maxLength: [23, "the Pasword must be min 23"]
    },
    photo: {
        type: String,
        // required: [true, "please add a photo"],
        default: 'https://res.cloudinary.com/dawztouev/image/upload/v1672659687/samples/cloudinary-icon.png',
    },

    phone: {
        type: String,
        // required: [true, "please add a phone"],
        match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, "Please enter a valid number"]
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must be less then 250 characters"],
        default: "bio"
    },
    
},
{
    timestamps: true,
}
);

// Encrypt password before saving to DB
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPressword = await bcrypt.hash(this.password, salt)
    this.password = hashedPressword
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User