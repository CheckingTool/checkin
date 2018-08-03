const _ = require('lodash');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toor',
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
var success = false;

Controller.index = async function(req, res){
  const groups = await Controller.getGroups();
  const rawDates = await Controller.getDates();
  const uniqDates = _.uniqBy(rawDates, "Date");

  res.render('checklist', { groups: groups, dates: uniqDates });
};

Controller.schedule = async function(req, res) {
  const groupName = req.body.group;
  const date = req.body.date;

  const groupID = await Controller.getSelectedGroupID(groupName);
  const lessonsID = await Controller.getLessonsID(groupID, date);
  const selectedLessonsNames = await Controller.getSelectedLessons(lessonsID);
  const students = await Controller.getStudents(groupID);

  res.render('misses', { lessons: selectedLessonsNames, date: date, group: groupName, students: students });

};

Controller.feedback = async function(req) {
  const lessonName = req.body.lessonname;
  const attendanceArr = req.body["studarr[]"];

  const lessonID = await Controller.getFilledLessonID(lessonName);

  connection.query('SELECT ID from students where Group_ID = ?', [groupID], function(err, results) {
    if (err) {
        console.log(err);
    } else {
      for (var i in results) {
          studID.push(results[i].ID);
          //получаем айди всех студентов выбранной группы
      }
      let temp;

      temp = missesinfo['studarr[]'];
      for (var i in temp) {
          attendance.push(temp[i]);
          //массив отметок посещаемости
      }
    }
    var studObj = {};
    for (var i=0; i<studID.length; i++) {
      if (attendance[i] == 'false' ) {
        connection.query('UPDATE students SET Total_Misses = Total_Misses+1 WHERE ID = ?', [studID[i]], function(err, results) {
          if (err) {
            console.log(err);
          }
        });
      }
      connection.query('INSERT INTO student_misses (Lesson_ID, Student_ID, Date, Attend) VALUES (?, ?, ?, ?)', [lessonID, studID[i], selDate, attendance[i]], function(err, results){
        if (err) {
          console.log(err);
        } else {
          success = true;
        }

      });

    }
    lessonName = [];
    lessonid = '';
    lessonID = [];
    groupName = '';
    groups = [];
    studID = [];
    selGroup = '';
    dates = [];
    attendance = [];
   delete results;

  });

};

Controller.alert = function(req, res, next) {
  if (success) {
    res.json({ message: 'You have successfully added results' });
  } else {
    res.json({ message: 'You couldnt add results' });
  }

  success = false;
};

Controller.getGroups = async function() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM groups`, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  })
};

Controller.getFilledLessonID = async function(lesson) {
  return new Promise((resolve, reject) => {

    connection.query(`SELECT ID FROM lessons WHERE Name = ?`, [lesson], (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result[0].ID);
    })
  })
};

Controller.getSelectedGroupID = async function(group) {

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM groups WHERE Name = ?`, [group], (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result[0].ID);
    })
  })
};

Controller.getLessonsID = async function(groupID, date) {
  return new Promise((resolve, reject) => {

    connection.query(`SELECT Lesson_ID FROM schedules WHERE Group_ID = ? AND Date = ?`, [groupID, date],
      (err, result) => {

        if (err) {
          return reject(err);
        }

        let lessonsID = [];

        result.forEach(lesson => {
          lessonsID.push(lesson.Lesson_ID);
        });

        resolve(lessonsID);
      })
  })
};

Controller.getSelectedLessons = async function(lessonsID) {

  return new Promise((resolve, reject) => {
    connection.query(`SELECT Name FROM lessons WHERE ID IN (?)`,
      [lessonsID], (err, result) => {

        if (err) {
            return reject(err);
        }

        let currentLessonsNames = [];
        result.forEach(lesson => {
          currentLessonsNames.push(lesson.Name);
        });

        resolve(currentLessonsNames);
      });
  });
};

Controller.getStudents = async function(groupID) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM students WHERE GROUP_ID = ?`, [groupID], (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    })
  });
};

Controller.getDates = async function() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT Date FROM schedules`, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  })
};

module.exports = Controller;