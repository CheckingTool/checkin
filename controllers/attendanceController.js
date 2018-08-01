var _ = require('lodash');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'checkin'
});

connection.connect(function(err) {
    if (err) {
        console.log('Connection could not be established');
    } else {
        connection.query("SET SESSION wait_timeout = 604800");
        console.log('Connected to database');
    }
});

let Controller = function(){};
var lessonName = [];
var lessonID = [];
//var selDate;
//var selGroup;
var groupID;
var studArr = [];

Controller.index = async function(req, res) {
  const groups = await Controller.getGroups();
  const dates = await Controller.getDates();

  res.render('attendance', {groups: groups, dates: dates, lessons: lessonName});

};

Controller.list = async function(req, res) {
    const selectedDate = req.body.date;
    const selectedGroup = req.body.group;
    let students;

    if (selectedDate === "Total") {
      students = await Controller.getTotalStudents(selectedGroup);
    } else {
      students = await Controller.getStudents(selectedGroup, selectedDate);
    }

    connection.query('SELECT ID FROM groups WHERE Name=?', [selectedGroup], function(err, results) {
      let selectedGroupID;

        if (err) {
            console.log(err);
        } else {
          console.log("RESULTS: ", results);
            for (var i in results) {
                selectedGroupID = results[i].ID;
            }
            connection.query(
              'SELECT student_misses.Lesson_ID, ' +
              'student_misses.Student_ID, ' +
              'student_misses.Attend, ' +
              'student_misses.Date, ' +
              'students.Name, ' +
              'lessons.Name as SubjName ' +
              'FROM student_misses INNER JOIN students ' +
              'ON student_misses.Student_ID=students.ID ' +
              'INNER JOIN lessons on student_misses.Lesson_ID=lessons.ID ' +
              'WHERE students.Group_ID = ? AND student_misses.Date = ?', [selectedGroupID, selectedDate],
              (err, results) => {
               if (err) {
                   console.log(err);
               } else {
                 console.log("RESULLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", results);
                   for (var i in results) {
                       console.log(results[i]);
                       studArr.push(results[i]);
                   }
                   res.render('attendancelist', {students: studArr, group: selectedGroup, date: selectedDate});
                   studArr = [];
               }
            });
        }
    });
};


Controller.getTotalStudents = async function(group) {

  return new Promise((resolve, reject) => {
    connection.query(`select students.name, students.Total_Misses, groups.ID 
      FROM students INNER JOIN groups 
      ON students.Group_ID=groups.ID WHERE groups.Name = ? `, [group],
      (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        resolve(result);

    });
  })
};

Controller.getStudents = async function(group, date) {

  return new Promise((resolve, reject) => {
    connection.query("SELECT ID FROM groups WHERE Name=?", [group], (err, result) => {
      if (err) {
        return reject(err);
      }

      return result[0].ID;
    })
    .then(id => {
      connection.query(`SELECT student_misses.Lesson_ID,
        student_misses.Student_ID,
        student_misses.Attend, 
        student_misses.Date,
        students.Name,
        lessons.Name as SubjName 
        FROM student_misses INNER JOIN students 
        ON student_misses.Student_ID=students.ID 
        INNER JOIN lessons on student_misses.Lesson_ID=lessons.ID
        WHERE students.Group_ID = ? AND student_misses.Date = ?`, [id, date], (err, result) => {

        if (err) {
          return reject(err);
        }

      });
    })

  })
};

Controller.getGroups = async function() {

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM groups`, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

Controller.getDates = async function() {

  return new Promise((resolve, reject) => {
    connection.query(`SELECT Date FROM schedules`, (err, result) => {
      if (err) {
        return reject(err);
      }

      const uniqueDates = _.uniqBy(result, 'Date');

      resolve(uniqueDates);
    });
  });
};

module.exports = Controller;

