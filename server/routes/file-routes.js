var fs = require("fs");
var path = require('path');
var async = require('async');
var cmd = require('node-cmd');
exports.fileprint = function(req,res){
  // console.log("req",req.files);
  var filesArray = req.files;
  async.each(filesArray,function(file,eachcallback){
    async.waterfall([
    function (callback) {
      fs.readFile(file.path, (err, data) => {
        if (err) {
          console.log("err ocurred", err);
          }
        else {
          callback(null,data);
        }
        });
    },
    function (data, callback) {
      var writepath = "../images";
      fs.writeFile(writePath + file.originalname, data, (err) => {
      if (err) {
        console.log("error occured", err);
      }
      else {
      callback(null, 'done');
      }
      });
    }
    ], function (err, result) {
      // result now equals 'done'
      //pass final callback to async each to move on to next file
      eachcallback();
    });
    },function(err){
      if(err){
          console.log("error ocurred in each",err);
      }
      else{
        console.log("finished prcessing");
            res.send({
                      "code":"200",
                      "success":"files printed successfully"
                      })
            cmd.run('rm -rf ./fileupload/*');
          }
    });
}