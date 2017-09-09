# CREATE DATABASE gamgi;

CREATE TABLE user (
    userId int NOT NULL AUTO_INCREMENT,
    nickname varchar(255),
    PRIMARY KEY (userId)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE room (
    roomId int NOT NULL AUTO_INCREMENT,
    roomName varchar(255),
    videoId varchar(255),
    videoTimestamp varchar(255),
    bangjangId int,
    PRIMARY KEY (roomId),
    FOREIGN KEY (bangjangId) REFERENCES user(userId)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

# INSERT INTO user(nickname) VALUES ("youngee2");

# INSERT INTO room(roomName, videoId, videoTimestamp, bangjangId) VALUES ("youngee's room", "tbAQQhoqXNI", "2m30s", 1);

# SELECT * FROM room WHERE roomId = 1;