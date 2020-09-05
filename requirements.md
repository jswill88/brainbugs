
## What is the vision of this product?
 - A command line multiplayer trivia game.
## What pain point does this project solve?
 - During these strange and unsteady times, avid trivia consumers no longer have the ability to head to their favorite watering hole and flex their knowledge.  We have created a solution. 
## Who shouldn’t care about this product.  
 - If you have watched Jeopardy and thought, “I can do this”, this might be the game for you.  

## Scope (In/Out)
 - IN - Provide hours of intellectual stimulation for each user. 
 
  - This app will have the ability to connect two users to a game server and they will be able to play a trivia game together. 
  - The app will be able to serve up a collection of trivia categories that will start off with six.
  - The user will be able to answer 10 questions from one of those six categories.
  - The user will be able to have a really great time. 
- OUT - Will not have a front end……….at all.
  - Our app will not have a shiny front end.  No moving buttons, nothing fancy.  Just straight terminal fun.
***

## Minimum Viable Product vs
 - A command line based trivia game that is multiplayer and allows at least two players to play against each other. Players can choose from a variety of categories, and chat with each other.
##Stretch Goal
 - What stretch goals are you going to aim for?
 - Adding this to the NPM library
 - Adding an API server
 - Game play - option for a name (stretch)
 - Make a large picture for when people join the room
 - See when someone else joins the room
 - Prompt for how to begin the trivia game either yes and no
 - Starting a countdown timer
 - Displaying a countdown timer
 - Still need to figure out the amount of time for the time
 - How to only submit one answer per person
 - How to have the first person to guess the correct answer stop the timer and move on to the next question. 
 - See if the other person is starting to type an answer
 - After each question, display the score
 - After each question display the correct answer to both players
 - Putting a code into the console and outputting a picture
 - Command flags to see all of the rooms and all of the players
 - Adding trivia questions to the game from users
 - Display the score during the entire game play. 

***
##Functional Requirements
 - List the functionality of your product. This will consist of tasks such as the following:
 - The user will be able to connect to another user and play trivia games vs each other. 
 - A user will be able to select between six* different trivia categories.

***
##Data Flow
 - User connects to server by using “npm run”.
 - Command-line prompts a welcome message and asks for user input of name.
 - How to play and terminal shortcuts to be used are displayed.
 - User joins the main game and chat room, when users join the chat room a message appears with their name.
 - Users can choose a trivia category to play against other players. The trivia data is pulled from an individual MongoDB database.
 - Prompt “Are you ready to play”
 - When both users respond “Yes” countdown starts and the game begins.
 - When the starter countdown ends the first question is sent out to player terminals.
 - Each question has a timer and each player has the chance to answer the question, if no one answers before the timer runs out no points are awarded.
 - After each question, the terminal displays an updated score, along with who correctly answered.
 - When all the questions from the database collection are exhausted game over.
 - Winner score is displayed and users are prompted to either quit the game or play again.








##Non-functional requirements

#### Testability:
 - We will be able to test the connection between server and client.
 - We will be able to test grabbing the correct information from each database.
 - We will be able to test that the correct scores are returned to the player.
 - We will test to make sure the timer works correctly.
#### Security:
 - Adding shortcuts to the terminal for game play.
 - Admin accounts can add/delete databases as well as add shortcuts into the game.
 - All data will be protected.
 - Pick 2 non-functional requirements and describe their functionality in your application.
 - If you are stuck on what non-functional requirements are, do a quick online search and do some research. Write a minimum of 3-5 sentences to describe how the non-functional requirements fits into your app.
 - You MUST describe what the non-functional requirement is and how it will be implemented. Simply saying “Our project will be testable for testibility” is NOT acceptable. Tell us how, why, and what.


