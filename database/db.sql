CREATE DATABASE taskdb

CREATE TABLE task {
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) UNIQUE,
    description VARCHAR(255)
};