# checkin
Checking tool project for Noosphere Courses
В разработке принимали участие Письменный Никита (backend) и Молодец Богдан (frontend).
В гит репозитории была отдельно сделана ветка для Фронта, для бэка использовалась стандартная ветка master.

Для backend части использовались следующие технологии: Node.js, Express.js, MySQL.
Для frontend части использовались следующие технологии: JS, CSS3, HTML5, Jquery, Ajax.

При подключении базы данных mysql в репозитории также находится sql файл checkin.sql.
Данные для авторизации в базу данных со стороны node.js такие: login: root, пароля нет.
В случае если ваши учетные данные Mysql не совпадают, для успешного подключения бд нужно во всех контроллерах, где происходит подключение к бд изменить на свои данные и выполнить npm install.
Данные для входа админа: admin@gmail.com; admin. Тестовые данные для входа учителя: teacher1@gmail.com; teacher1