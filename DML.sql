-- CS 340
-- Project Step 3 Draft
-- Luann Pascucci, Alec Andersen

-- ! character will indicate form input

-- Player operations

-- create new player
INSERT INTO Players (firstName, lastName, rating, birthday, country)
VALUES (!firstName, !lastName, !rating, !birthday, !country);

-- update player information
UPDATE Players SET firstName = !firstName, lastName = !lastName, rating = !rating, birthday = !birthday, country = !country WHERE playerID = !playerID;

-- delete player
DELETE FROM Players WHERE playerID = !playerID;


-- Season operations

-- create new season
INSERT INTO Seasons (name)
VALUES (!name);

-- update/edit a season
UPDATE Seasons SET name = !name WHERE seasonID = !seasonID;

-- delete a season
DELETE FROM Seasons WHERE seasonID = !seasonID;


-- Game operations

-- Record new game (create new transaction)
INSERT INTO Games (whiteID, blackID, ecoCode, seasonID, resultID, gameDate, location)
VALUES (!whiteID, !blackID, !ecoCode, !resultID, !gameDate, !location);

-- update/edit a game (many-to-many relationship change)
UPDATE Games SET whiteID = !whiteID, whiteRating = !whiteRating, blackID = !blackID, blackRating = !blackRating,
ecoCode = !ecoCode, seasonID = !seasonID, gameDate = !gameDate, location = !location  
WHERE gameID = !gameID;

-- delete a game (many-to-many relationship deletion)
DELETE FROM Games WHERE gameID = !gameID;

-- For Openings and Results, we do not need functionality for any user to add, update, or delete. 
-- We plan to populate these ourselves and leave them to be selected from when recording a new game.


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

--Show all players
SELECT * FROM Players;

--Show all seasons
SELECT * FROM Seasons;

--Show all games
SELECT * FROM Games;

--Show all openings
SELECT * FROM Openings;

--Show all results
SELECT * FROM Results;

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