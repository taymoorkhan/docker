CREATE DATABASE IF NOT EXISTS numbers;
USE numbers;
CREATE TABLE IF NOT EXISTS nums (numbers int(255));
-- FLUSH ALL PRIVILEGES;
-- GRANT ALL PRIVILEGES ON DATABASE numbers.* TO "root"@"localhost";'
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;