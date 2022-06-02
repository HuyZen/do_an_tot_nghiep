const mongoose = require("mongoose")
const khachhangSchema = new mongoose.Schema({
    Email:String,
    Name:String,
    SoDT:String,
    Thanhtoan:Boolean,
    Vi:String,
    Ngay:Date
})

module.exports = mongoose.model('KhachHang', khachhangSchema)
