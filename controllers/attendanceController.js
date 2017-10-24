var _ = require('lodash');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'checkin'
});


connection.connect(function(err) {
    if (err) {
        console.log('Connection could not be established');
    } else {
        connection.query("SET SESSION wait_timeout = 604800");
        console.log('Connected to database');
    }
})

let Controller = function(){}
var lessonName = [];
var lessonID = [];
var selDate;
var selGroup;
var groupID;
var studArr = [];

Controller.index = function(req, res, next){
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
        res.render('attendance', {groups: groups, dates: uniqdates, lessons: lessonName});
        });
    });
};

Controller.list = function(req, res, next) {
    console.log('controller list');
    selDate = req.body.date;
    selGroup = req.body.group;
    var selGroupID;
    console.log(selDate);
    if (selDate == 'Total') {
        connection.query('select students.name, students.Total_Misses, groups.ID from students inner join groups on students.Group_ID=groups.ID WHERE groups.Name = ? ', [selGroup], function(err, results) {
           if (err) {
               console.log(err);
           } else {
               console.log(results);
               res.render('attendancetotal', {students: results, group: selGroup, date: selDate});
           }
        });
    } 
    else {
        connection.query('SELECT ID FROM groups WHERE Name=?', [selGroup], function(err, results) {
            if (err) {
                console.log(err);
            } else {
                for (var i in results) {
                    selGroupID = results[i].ID;
                }
                connection.query('select student_misses.Lesson_ID, student_misses.Student_ID, student_misses.Attend, student_misses.Date, students.Name, lessons.Name as SubjName from student_misses inner join students on student_misses.Student_ID=students.ID inner join lessons on student_misses.Lesson_ID=lessons.ID WHERE students.Group_ID = ? and student_misses.Date = ?', [selGroupID, selDate], function(err, results) {
                   if (err) {
                       console.log(err);
                   } else {
                       for (var i in results) {
                           console.log(results[i]);
                           studArr.push(results[i]);
                       }
                       console.log('studarr:', studArr.Name, 'length: ', studArr.length);
                       res.render('attendancelist', {students: studArr, group: selGroup, date: selDate});
                       studArr = [];
                   }
                });
            }
        });
    }   
};

module.exports = Controller;

