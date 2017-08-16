'use strict';

import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: String,
    nick_name: String,
    password: String,
    id: Number,
    create_time: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 1
    }, //1、普通用户，2、其他
    avatar: {
        type: String,
        default: 'default_avatar.jpg'
    },
    city: String,
    school: String,
})
userSchema.index({
    id: 1
});
const User = mongoose.model('User', userSchema);

export default User