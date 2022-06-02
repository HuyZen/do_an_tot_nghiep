var KhachHang = require("../models/KhachHang")

module.exports = function(app)
{
    app.get("/",function(req, res){
        res.render("layout");
    });

    app.post("/dangky", function(req, res){
        if(!req.body.Email || !req.body.Name || !req.body.SoDT){
            res.json({ketqua:0, maloi:"Thieu tham so kia ban oi"});
        }else{
            var KhachHangMoi = new KhachHang({
                Email: req.body.Email,
                Name: req.body.Name,
                SoDT: req.body.SoDT,
                ThanhToan: false,
                Vi: "",
                Ngay: Date.now()
            });
            KhachHangMoi.save(function(err){
                    if(err){
                        res.json({ketqua:0, maloi:"Mongoose save error!"})
                    }else{
                        res.json({ketqua:1, maloi:KhachHangMoi})
                }
            });
        }
    });
}

