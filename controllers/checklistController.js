var _ = require('lodash');
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
var lessonID = [];
var groupName;
var groups = [];
var groupID;
var studID = [];
var selGroup;
var dates = [];
var selDate;
var attendance = [];


Controller.index = function(req,res,next){
	
    connection.query("SELECT * FROM groups", function (err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            groups = results;
            
        }
        
        connection.query("SELECT Date FROM schedules", function (err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            dates = results;
            
        }

        var uniqdates = _.uniqBy(dates, 'Date');
        res.render('checklist', {groups: groups, dates: uniqdates, lessons: lessonName});
        });
    });
    
  
    
};
Controller.schedule = function(req, res, next) {
    
    var groupName = req.body.group;
    var date = req.body.date;
    selGroup = groupName;
    selDate = date;
    connection.query("SELECT * from groups WHERE Name = ?", [groupName], function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            for (var i in results) {
                groupID = results[i].ID;
            }
            connection.query("SELECT Lesson_ID FROM schedules WHERE Group_ID = ? AND Date = ?", [groupID, date], function(err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('resulst are: ', results);
                    for (var i in results) {
                        lessonID.push(results[i].Lesson_ID);
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
                       res.redirect(301, '/checklist/misses');
                   } 
                });
            });
        }
    });
   
};

Controller.misses = function(req, res, next) {
    connection.query('SELECT * from Students WHERE Group_ID=?', [groupID], function(err, results) {
       if (err) {
           console.log(err);
       } else {
           res.render('misses', {lessons: lessonName, date: selDate, group: selGroup, students: results});
            lessonName = [];
            lessonID = [];
            groupName = '';
            groups = [];
            groupID = '';
            studID = [];
            selGroup = '';
            dates = [];
            selDate = '';
            attendance = [];
           delete results;
       }
    });
    
};

Controller.feedback = function(req, res, next) {
  var lessonid;

  var missesinfo = req.body;
    console.log(missesinfo);
    connection.query('SELECT ID from lessons WHERE Name= ?', [missesinfo.lessonname], function(err, results){
        if (err) {
            console.log(err);
        } else {
            for (var i in results) {
                lessonid = results[i].ID;
            }

        }
        connection.query('SELECT ID from students where Group_ID = ?', [groupID], function(err, results) {
            if (err) {
                console.log(err);
            } else {
                for (var i in results) {
                    studID.push(results[i].ID);
                }
                delete missesinfo.lessonname;
                let temp;
                
                temp = missesinfo['studarr[]'];
                for (var i in temp) {
                    attendance.push(temp[i]);
                }
            }

            for (var i=0; i<studID.length; i++) {
                    console.log(studID.length);
                    connection.query('INSERT INTO student_misses (Lesson_ID, Student_ID, Date, Attend) VALUES (?, ?, ?, ?)', [lessonid, studID[i], selDate, attendance[i]], function(err, results){
                    if (err) {
                        console.log(err);
                    } 
                });

            }
            studID.length = 0;
            missesinfo = {};
            
        });
    }); 

};

module.exports = Controller;