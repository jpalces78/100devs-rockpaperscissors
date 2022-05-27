const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {

  const readWrite = (file, contentType) => {
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
    });
  }
  const choicesArr = [
    'rock',
    'paper',
    'scissors'
  ];
  const pickRandom = () => {
    return choicesArr[Math.floor(Math.random()*3)]
  }

  const determineWinner = (p1, p2) => {
    if(p1 == p2)  //draw
      return "Draw!";
  else if(p1 == "rock") //condition 1
      if(p2 == "scissors") 
          return "Player won!";
       else 
          return "Computer won!";
  else if(p1 == "paper"){ //condition 2
      if(p2 == "rock") 
          return "Player won!";
       else 
          return "Computer won!";
  }
  else if(p1 == "scissors")//condition 3
      if(p2 == "rock")
         return "Computer won!";
      else 
         return "Player won!";
  };

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  if (page == '/') {
    readWrite('index.html', 'text/html')
  }
  else if (page == '/api') { //API request should contain a choice
    if('choice' in params){
      let playerChoice = params['choice']
      let serverChoice = pickRandom()
      
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({player: playerChoice,
         server: serverChoice,
         winner: determineWinner(playerChoice, serverChoice)
      }))
    }
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
