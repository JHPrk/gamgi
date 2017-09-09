CREATE TABLE user (
    userId int NOT NULL AUTO_INCREMENT,
    nickname varchar(255),
    PRIMARY KEY (userId)
) ENGINE=INNODB;

CREATE TABLE room (
    roomId int NOT NULL AUTO_INCREMENT,
    roomName varchar(255),
    videoId varchar(255),
    videoTimestamp varchar(255),
    bangjangId int,
    PRIMARY KEY (roomId),
    FOREIGN KEY (bangjangId) REFERENCES user(userId)
) ENGINE=INNODB;

