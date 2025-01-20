DROP DATABASE IF EXISTS `cat_storage`;

CREATE DATABASE `cat_storage`;

--REFERENCING 10-SQL 09-Ins_CRUD-Update-Delete\db
-- -- use inventory_db database --
-- \c inventory_db;

-- -- Creates the table "produce" within inventory_db --
-- CREATE TABLE produce (
--   -- Creates a numeric column called "id" which cannot contain null --
--   id INTEGER NOT NULL,
--   -- Creates a string column called "name" which holds up to 30 characters and cannot contain null --
--   name VARCHAR(30) NOT NULL
-- );

-- -- Insert multiple produce items --
-- INSERT INTO produce (id, name)
-- VALUES
--     ( 1, 'apple'),
--     ( 2, 'orange'),
--     ( 3, 'banana');
    
    
--  DO WE NEED TO ADD A delete.sql and update.sql