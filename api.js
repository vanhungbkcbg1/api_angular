/**
 * Created by vanhung on 4/10/2016.
 */
var express = require('express');
var db = require('./db');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
app.use(function (req,res,next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    next();
});

//
app.get('/', function (req, res) {

    res.json({name: "vanhung"});
})

app.get('/sinhviens', function (req, res) {

    db.selectQuery('select * from sinhvien', [], function (rows) {
        res.status(200).json(rows);
    }, function (err) {
        res.status(500).send();
    })
});

app.post("/sinhvien/delete/:id", function (req, res) {
    db.excuteQuery('delete from sinhvien where ids=?', [req.params.id], function (row) {

        if (row.affectedRows) {
            res.status(200).send("thanh cong");
        }
    }, function (err) {

        res.status(500).json(err);
    })
});

app.post("/sinhvien/update/:id/:name", function (req, res) {

    db.excuteQuery('update sinhvien set ')

});

app.get("/sinhviens/:id", function (req, res) {

    db.selectQuery("select * from sinhvien where id=?", [req.params.id], function (row) {

        res.json({error:200,data:row});
    }, function (err) {
        res.json({error:201});
    });
});

app.put("/sinhviens/:id", function (req, res) {

    console.log("ok");
    console.log(req.params.id);
    console.log(req.body);
    res.send("ok");
});

app.put("/sinhviens/:id/:value", function (req, res) {

    console.log("ok");
    console.log(req.params.value);
    console.log(req.params.id);
    console.log(req.body);
    res.send("ok");
});

app.post("/sinhviens", function (req,res) {

    console.log(req.body);
    //console.log(req);
});


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})
