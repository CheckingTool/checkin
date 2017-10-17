-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 17 2017 г., 21:06
-- Версия сервера: 5.7.16
-- Версия PHP: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `checkin`
--

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Teacher_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`ID`, `Name`, `Teacher_ID`) VALUES
(1141, 'PZ-14-1', 1),
(2141, 'Pm-14-1', 2),
(3141, 'PK-141', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE `lessons` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`ID`, `Name`) VALUES
(111, 'Тестирование'),
(112, 'Программирование C#'),
(113, 'Алгоритмы и структуры данных'),
(114, 'Анализ требований ПО'),
(115, 'Английский'),
(116, 'Физическая подготовка'),
(117, 'Интерфейсы'),
(118, 'Базы данных'),
(119, 'Мат. анализ'),
(120, 'Линейная алгебра'),
(121, 'Низкоуровневое программирование'),
(122, 'Защита прав работника'),
(123, 'Программирование С# (пр.)'),
(124, 'Базы данных (пр.)'),
(125, 'Низкоуровневое программирование (пр.)'),
(126, 'Алгоритмы и структуры данных (пр.)');

-- --------------------------------------------------------

--
-- Структура таблицы `schedules`
--

CREATE TABLE `schedules` (
  `Lesson_ID` int(11) NOT NULL,
  `Group_ID` int(11) NOT NULL,
  `Date` text NOT NULL,
  `Number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `schedules`
--

INSERT INTO `schedules` (`Lesson_ID`, `Group_ID`, `Date`, `Number`) VALUES
(111, 1141, '2017-10-17', 1),
(112, 1141, '2017-10-17', 2),
(113, 1141, '2017-10-17', 3),
(114, 1141, '2017-10-18', 1),
(115, 1141, '2017-10-18', 2),
(116, 1141, '2017-10-18', 3),
(117, 1141, '2017-10-19', 1),
(118, 1141, '2017-10-19', 2),
(119, 1141, '2017-10-19', 3),
(120, 1141, '2017-10-20', 1),
(121, 1141, '2017-10-20', 2),
(122, 1141, '2017-10-20', 3),
(123, 1141, '2017-10-21', 1),
(124, 1141, '2017-10-21', 2),
(125, 1141, '2017-10-21', 3),
(115, 2141, '2017-10-17', 1),
(118, 2141, '2017-10-17', 2),
(119, 2141, '2017-10-17', 3),
(117, 2141, '2017-10-18', 1),
(123, 2141, '2017-10-18', 2),
(111, 2141, '2017-10-18', 3),
(121, 2141, '2017-10-19', 1),
(125, 2141, '2017-10-19', 2),
(116, 2141, '2017-10-19', 3),
(114, 2141, '2017-10-20', 1),
(122, 2141, '2017-10-20', 2),
(124, 2141, '2017-10-20', 3),
(112, 2141, '2017-10-21', 1),
(120, 2141, '2017-10-21', 2),
(113, 2141, '2017-10-21', 3),
(121, 3141, '2017-10-17', 1),
(114, 3141, '2017-10-17', 2),
(112, 3141, '2017-10-17', 3),
(115, 3141, '2017-10-18', 1),
(122, 3141, '2017-10-18', 2),
(118, 3141, '2017-10-18', 3),
(124, 3141, '2017-10-19', 1),
(111, 3141, '2017-10-19', 2),
(113, 3141, '2017-10-19', 3),
(125, 3141, '2017-10-20', 1),
(114, 3141, '2017-10-20', 2),
(116, 3141, '2017-10-20', 3),
(117, 3141, '2017-10-21', 1),
(119, 3141, '2017-10-21', 2),
(123, 3141, '2017-10-21', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Group_ID` int(11) NOT NULL,
  `Total_Misses` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `student_misses`
--

CREATE TABLE `student_misses` (
  `Lesson_ID` int(11) NOT NULL,
  `Student_ID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Attend` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE `teachers` (
  `ID` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Login` varchar(200) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`ID`, `Name`, `Login`, `Email`, `Password`) VALUES
(1, 'Teacher 1', 'teacher1', 'teacher1@gmail.com', 'teacher1');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD KEY `ID` (`ID`,`Teacher_ID`);

--
-- Индексы таблицы `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `schedules`
--
ALTER TABLE `schedules`
  ADD KEY `Lesson_ID` (`Lesson_ID`),
  ADD KEY `Group_ID` (`Group_ID`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Group_ID` (`Group_ID`);

--
-- Индексы таблицы `student_misses`
--
ALTER TABLE `student_misses`
  ADD KEY `Lesson_ID` (`Lesson_ID`,`Student_ID`),
  ADD KEY `Student_ID` (`Student_ID`);

--
-- Индексы таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`Lesson_ID`) REFERENCES `lessons` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`Group_ID`) REFERENCES `groups` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student_misses`
--
ALTER TABLE `student_misses`
  ADD CONSTRAINT `student_misses_ibfk_1` FOREIGN KEY (`Lesson_ID`) REFERENCES `lessons` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `student_misses_ibfk_2` FOREIGN KEY (`Student_ID`) REFERENCES `students` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
