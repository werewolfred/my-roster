function NflController() {
    console.log("hello2")
    var loading = true;
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var playerService = new PlayerService(apiUrl, ready);
    
    function ready() {
        loading = false;

        $('some-button').on('click', function () {

            var teamSF = playerService.getPlayerByTeam()
        });


    }
    //DRAWS PLAYERS ONTO myRoster 
    function drawMyRoster(playerList) {
        var template = ''
        var playerElement = document.getElementById("my-team")
        for (var i = 0; i < playerList.length; i++) {
            var player = playerList[i];
            template += `
        <div class="col-xs-3">
            <div class = "player-card">
                <div clas = "card">
                <img class = "card-img-top" src="${player.photo}">
                <div class = "card-block">
                    <p class="text-center">${player.fullname}</p>
                    <p class="text-center">${player.pro_team}</p>
                    <p class="text-center">${player.position}</p>
                    <button onclick = "app.controllers.nflController.removePlayer(${player.id})">remove</button>
                    </div>
                </div>
            </div>
                </div>
        
        
        
        
        
        
        `
        }
        playerElement.innerHTML = template
    }

    //draws players into template onto the index.html and displays card
    function drawPlayers(playerList) {
        var template = ''
        var playerElement = document.getElementById('player-output')
        for (var i = 0; i < playerList.length; i++) {
            var player = playerList[i];
            template += `
        <div class="col-xs-3">
            <div class = "player-card">
                <div clas = "card">
                <img class = "card-img-top" src="${player.photo}">
                <div class = "card-block">
                    <p class="text-center">${player.fullname}</p>
                    <p class="text-center">${player.pro_team}</p>
                    <p class="text-center">${player.position}</p>
                    <button onclick="app.controllers.nflController.addPlayer(${player.id})">add</button>
                    </div>
                </div>
                </div>
                </div>
        
        
        
        
        
        
        `
        }
        playerElement.innerHTML = template
    }
    //functions that searches for player by team, position and name and returns without reseting the page and then draws players to search results
    this.getPlayersByTeam = function getPlayersByTeam(e) {
        e.preventDefault();
        var players = e.target.playersByTeam.value.toLowerCase();
        playerService.getPlayersByTeam(players, drawPlayers);
    }

    this.getPlayersByPosition = function getPlayersByPosition(e) {
        e.preventDefault();
        var players = e.target.playersByPosition.value.toLowerCase();
        playerService.getPlayersByPosition(players, drawPlayers);
    }
    this.getPlayersByName = function getPlayersByName(e) {
        e.preventDefault();
        var players = e.target.playersByName.value.toLowerCase();
        playerService.getPlayersByName(players, drawPlayers);
    }
    //functions that gives a player id and calls for functions from service to add id to myRoster
    this.addPlayer = function (id) {
        console.log(id)
        playerService.addPlayer(id, drawMyRoster)
    }
    this.removePlayer = function (id) {
        playerService.removePlayer(id, drawMyRoster)
    }



}
