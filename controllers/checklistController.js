var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'checkin',
});

connection.connect(function(err) {
    if (err) {
        console.log('Connection could not be established');
    } else {
        connection.query("SET SESSION wait_timeout = 604800");
        console.log('Connected to database');
    }
});


let Controller = function(){}
var lessonName = [];
var groups = [];
var dates = [];
Controller.index = function(req,res,next){
	
//    var groups = [];
//    var dates = [];
    connection.query("SELECT * FROM groups", function (err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            groups = results;
            
        }
        console.log("groups in loop: ", groups.length);
        
        connection.query("SELECT * FROM schedules", function (err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            dates = results;
            
        }
        res.render('checklist', {groups: groups, dates: dates, lessons: lessonName});
        });
    });
    
  
    
};
Controller.schedule = function(req, res, next) {
    var lessonID = [];
    var groupID;
    var groupName = req.body.group;
    var date = req.body.date;
    console.log(dateTrue);
    connection.query("SELECT * from groups WHERE Name = ?", [groupName], function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            for (var i in results) {
                groupID = results[i].ID;
                
            }
            console.log("groupID: ", groupID);
            connection.query("SELECT Lesson_ID FROM schedules WHERE Group_ID = ? AND Date = ?", [groupID, date], function(err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('resulst are: ', results);
                    for (var i in results) {
                        lessonID.push(results[i].Lesson_ID);
                        //console.log(lessonID);
                    }
                }
                connection.query("SELECT Name FROM lessons WHERE ID IN (?)",
                    [lessonID], function(err, results, fields) {
                   if (err) {
                       console.log(err);
                   } else {   
                       for (var i in results) {
                           lessonName.push(results[i].Name);
                       }
                       console.log('results are: ', lessonName);
                       //res.redirect(301, '/');
                   } 
                });
            });
        }
    });
   
};

Controller.lessons = function(req, res, next) {
    console.log("lessons controller: ", lessonName);
   res.render('checklist', {groups: groups, dates: dates, lessons: lessonName});

};

module.exports = Controller;