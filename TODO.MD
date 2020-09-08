<!-- 1. Set up Mongoose -->
<!-- 1. Set up route to fill up database -->
  
<!-- 1. Set up Socket Server -->
  <!-- - Test to get one socket to talk to the server
  - Then we can test another one.  -->

<!-- 1. Skeleton of console screens -->
<!-- make a form -->
  

  //TODO 
capture content from the box
1. Fill the database
- Put all the questions in

2. Figure out how to get our questions to appear

3. how to get chat input

4. Get rid of the mouse problem
- NPM RUN

5. Smooth transitions between pages and capturing the data

6. How to get the username from the from

7. Figure out how to pick a category from the game room





<!-- Timer Practice 

function timerCount() {
  setInterval(() => {
    let counter = 1;
    if (counter > 0)
      console.log('Timer', counter );
      counter++;
    // else {
    //   console.log('sorry time is up.')
    // }
    },1000);
  }
  timerCount(); -->


<!-- POST NEW QUESTIONS
http POST :3000/question topic="baseball" question="Which of the following players was NOT a member of the Yankees’ 'murderer’s row' in 1927?" answers:='[{"answer":"Babe Ruth"},{"answer":"Lou Gehrig"},{"answer":"Mickey Mantle", "correct":true},{"anwswer":"Earle Combs"}]' -->

http POST :3000/question topic="baseball" question="Which of the following players was NOT a member of the Yankees' \"murderers row\" in 1927?" answers:='[{"answer":"Babe Ruth"},{"answer":"Lou Gehrig"},{"answer":"Mickey Mantle", "correct":true},{"answer":"Earle Combs"}]'