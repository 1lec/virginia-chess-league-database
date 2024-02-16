-- CS 340
-- Project Step 3 Draft
-- Luann Pascucci, Alec Andersen

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Creating tables

-- Main entity tables here:
-- 5 main entities: Players, Seasons, Openings, Results, and Games

CREATE OR REPLACE TABLE Players (
    playerID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    rating smallint,
    birthday date,
    country varchar(255)
);

CREATE OR REPLACE TABLE Seasons (
    seasonID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL
);

CREATE OR REPLACE TABLE Openings (
    ecoCode char(3) NOT NULL UNIQUE PRIMARY KEY,
    varName varchar(255) NOT NULL
);

CREATE OR REPLACE TABLE Results (
    resultID tinyint NOT NULL UNIQUE PRIMARY KEY,
    description varchar(9) NOT NULL
);

CREATE OR REPLACE TABLE Games (
    gameID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    whiteID int NOT NULL,
    whiteRating smallint,
    blackID int NOT NULL,
    blackRating smallint,
    ecoCode char(3),
    seasonID int NOT NULL,
    resultID tinyint NOT NULL,
    gameDate date NOT NULL,
    location varchar(255),
    FOREIGN KEY (whiteID) REFERENCES Players(playerID)
    ON DELETE RESTRICT,
    FOREIGN KEY (blackID) REFERENCES Players(playerID)
    ON DELETE RESTRICT,
    FOREIGN KEY (ecoCode) REFERENCES Openings(ecoCode),
    FOREIGN KEY (seasonID) REFERENCES Seasons(seasonID)
    ON DELETE RESTRICT,
    FOREIGN KEY (resultID) REFERENCES Results(resultID)

);

-- Sample insertions
-- Players: different optional attributes
INSERT INTO Players (firstName, lastName, country)
VALUES ('Luann', 'Pascucci', 'Japan');

INSERT INTO Players (firstName, lastName, rating)
VALUES ('Alec', 'Andersen', 1);

INSERT INTO Players(firstName, lastName, birthday)
VALUES ('Cookie', 'Monster', '1969-11-02');

-- Seasons
INSERT INTO Seasons (name)
VALUES ('Summer 2023'),
('Fall 2023'),
('Winter 2023');

-- Openings: ecoCode is unique, but openings can have the same/similar names
-- openings from https://www.chessgames.com/chessecohelp.html
INSERT INTO Openings
VALUES ('B30', 'Sicilian'),
('B27', 'Sicilian'),
('B15', 'Caro-Kann'),
('B18', 'Caro-Kann, Classical');

-- Results:
-- 1 for win, 0 for loss, 1/2 for draw
-- the special little character for 1/2 is usually used; still need to figure out if/how to code that

INSERT INTO Results
VALUES ('1', '1-0'),
('0', '0-1'),
('2', '1/2-1/2');

-- Games

INSERT INTO Games (whiteID, whiteRating, blackID, blackRating, ecoCode, seasonID, resultID, gameDate, location)
VALUES (
    1,
    NULL,
    3,
    NULL,
    NULL,
    1,
    '0-1',
    '2023-07-20',
    NULL
),
(
    2,
    1,
    3,
    NULL,
    'B30',
    1,
    '1-0',
    '2023-08-01',
    'Arlington'
),
(
    3,
    NULL,
    1,
    NULL,
    'B18',
    2,
    '1/2-1/2',
    '2023-10-15',
    NULL
);

-- Do we need to add location manually if it is already saved in a season?


SET FOREIGN_KEY_CHECKS=1;
COMMIT;


-- Intersection tables ideas
-- all the openings a given player has used
-- SELECT * FROM GAMES WHERE white OR black IS some playerID AND opening is *

-- all the games a given player has participated in, won, lost, played as white, played as black, etc.
-- all the most used openings 
-- all the openings that resulted in wins or losses for either white or black players