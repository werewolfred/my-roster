var PlayerService = function (endpointUri, callback) {
    console.log("hello3")

    var playersData = [];
    var filteredPlayers = []
    var myRoster = JSON.parse(localStorage.getItem('myRoster')) || []
    function saveRoster(){
        localStorage.setItem("myRoster", JSON.stringify(myRoster))
    }
    /* playersData.forEach(function (player) {
        if (player.team === team) {
            filteredPlayers.push(player);
        }
    });*/


    //var playersData = localStorage.getItem(JSON.parse("playersData"))
    this.getPlayersByTeam = function (teamName, cb) {
        var list = playersData.filter(function (player) {
            if (player.pro_team.toLowerCase() == teamName) {
                return true;
            }
        });
        cb(list)

    }
    this.getPlayersByName = function (playerName, cb) {
        var list = playersData.filter(function (player) {
            if (player.fullname.toLowerCase() == playerName) {
                return true;
            }
        });
        cb(list)

    }

    this.getPlayersByPosition = function (position, cb) {

        var list = playersData.filter(function (player) {

            if (player.position.toLowerCase() == position) {
                return true;
            }
        });
        cb(list)


    }
    this.addPlayer = function(id, cb){
        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];
            if(player.id==id){
                if(myRoster.length<6){
                    myRoster.push(player)
                }

            }
            
        }
        cb(myRoster)
    }
    this.removePlayer = function(id, cb){
        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];
            if(player.id==id){
                myRoster.pop(player)
            }
            
        }
        cb(myRoster)
    }

    
    function loadPlayersData() {
        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback();
        }
        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);
        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
    }
    loadPlayersData();
}