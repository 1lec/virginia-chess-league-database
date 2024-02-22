-- CS 340
-- Project Step 3 Final
-- Luann Pascucci, Alec Andersen

-- ! character will indicate form input


-- -----------------------------------------------------------------
-- Players
-- -----------------------------------------------------------------

-- browse players
SELECT firstName AS "First Name", lastName AS "Last Name", rating AS Rating, birthday AS Birthday, country AS Country
FROM Players;

SELECT playerID, CONCAT(Player.lastNames, ', ', Players.firstName) AS Name
FROM Players
WHERE Name = !player_name_typed_into_games_form

-- create new player
INSERT INTO Players (firstName, lastName, rating, birthday, country)
VALUES (!firstName, !lastName, !rating, !birthday, !country);

-- update player information
UPDATE Players SET firstName = !firstName, lastName = !lastName, rating = !rating, birthday = !birthday, country = !country
WHERE playerID = !playerID;

-- delete player
DELETE FROM Players WHERE playerID = !playerID;


-- -----------------------------------------------------------------
-- Seasons
-- -----------------------------------------------------------------

-- browse seasons
SELECT seasonID, name AS Name
FROM Seasons;

-- get seasonIDs and names for Season dropdown
SELECT seasonID, name
FROM Seasons;

-- create new season
INSERT INTO Seasons (name)
VALUES (!name);

-- update/edit a season
UPDATE Seasons SET name = !name
WHERE seasonID = !seasonID;

-- delete a season
DELETE FROM Seasons
WHERE seasonID = !seasonID;


-- -----------------------------------------------------------------
-- Openings
-- -----------------------------------------------------------------

-- browse openings
SELECT ecoCode AS "ECO Code", varName AS Variation
FROM Openings;

-- get ecoCodes and varNames for Opening dropdown
SELECT ecoCode, varName
FROM Openings;

-- create new opening
INSERT INTO Openings (varName)
VALUES (!varName);


-- -----------------------------------------------------------------
-- Results
-- -----------------------------------------------------------------

-- browse results
SELECT resultID, description AS description
FROM Results;

-- get resultIDs and descriptions for Result dropdown
SELECT resultID, description
FROM Results;

-- -----------------------------------------------------------------
-- Games
-- -----------------------------------------------------------------

-- browse games
SELECT Games.gameID,
    CONCAT(WhitePlayer.lastName, ', ', WhitePlayer.firstName) AS White,
    Games.whiteRating AS 'White Rating',
    CONCAT(BlackPlayer.lastName, ', ', BlackPlayer.firstName) AS Black,
    Games.blackRating AS 'Black Rating',
    Results.description AS Result,
    Openings.varName AS Opening,
    Seasons.name AS Season,
    Games.gameDate AS Date,
    Games.location AS Location
FROM Games
INNER JOIN Players AS WhitePlayer ON Games.whiteID = WhitePlayer.playerID
INNER JOIN Players AS BlackPlayer ON Games.blackID = BlackPlayer.playerID
LEFT JOIN Openings ON Games.ecoCode = Openings.ecoCode
INNER JOIN Seasons ON Games.seasonID = Seasons.seasonID
INNER JOIN Results ON Games.resultID = Results.resultID
;

-- Record new game (create new transaction)
INSERT INTO Games (whiteID, blackID, ecoCode, seasonID, resultID, gameDate, location)
VALUES (!whiteID, !blackID, !ecoCode, !resultID, !gameDate, !location);

-- update/edit a game (many-to-many relationship change)
UPDATE Games SET whiteID = !whiteID, whiteRating = !whiteRating, blackID = !blackID, blackRating = !blackRating,
ecoCode = !ecoCode, seasonID = !seasonID, gameDate = !gameDate, location = !location  
WHERE gameID = !gameID;

-- delete a game (many-to-many relationship deletion)
DELETE FROM Games
WHERE gameID = !gameID;


/* List of different SELECTIONs
browsing all (1 table):
Show all players
Show all seasons
Show all games
Show all openings
Show all results

2 tables:
Count all openings used, display most to least used (Games, Openings)
Count how many games were played in each season, all seasons (Games, Seasons)
Show how many times a player has faced another player (Players, Games)

3 tables:
Show all openings a given player has used (Players, Games, Openings)
Count number of games a player has played, won, lost (Players, Games, Results)
Count/list all seasons a player has participated in (Players, Games, Seasons)

*/

--Sample selections

--Count how many games were played in each season (Games, Seasons)
SELECT Count(*) FROM Games WHERE seasonID = !seasonID;
-- Count how many games were played in all seasons (Games, Seasons)
SELECT Count(*) AS number_of_games FROM Games 
JOIN seasonID ON Games.seasonID = Seasons.seasonID
GROUP BY Season.seasonID;

--Count all openings used, display most to least used (Games, Openings)
SELECT COUNT(Games.ecoCode) as times_opening_happened
FROM Games
JOIN opening ON Games.ecoCode = Openings.ecoCode
GROUP BY times_opening_happened DESC;

--Show how many times a player has faced another player (Players, Games)

--Show all openings a given player has used (Players, Games, Openings)
-- I am a little stuck here.
-- SELECT Games.ecoCode FROM Games
-- JOIN opening ON Games.ecoCode = Openings.ecoCode
-- JOIN player ON 