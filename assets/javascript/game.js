var game = {
    data : {
        playerCharacter: {
            code: null,
            name: null,
            hp: null,
            attack: null,
            baseAttack: null,
        },
        currentEnemy: {
            code: null,
            name: null,
            hp: null,
            attack: null,
            
        },
    },
    characters : [
        {
            name: "Skywalker",
            code: "lukeSkywalker",
            healthPoints: 100,
            attackPower: 14,
            counterAttackPower: 6,
        },
        {
            name: "Obi Wan",
            code: "obiWanKenobi",
            healthPoints: 120,
            attackPower: 10,
            counterAttackPower: 8,
        },
        {
            name: "Vader",
            code: "darthVader",
            healthPoints: 140,
            attackPower: 4,
            counterAttackPower: 12,
        },
        {
            name: "Palpatine",
            code: "emporerPalpatine",
            healthPoints: 170,
            attackPower: 2,
            counterAttackPower: 15,
        }
    ],
    functions : { 
        createCharacterCard : function (code, name, hp) {
            //declare variables
            var charImage = "./assets/images/"+code+".png";
            var charContainer = $("<div>");
            var charCard = $("<div>");
            var charCardHeader = $("<div>");
            var charCardBody = $("<div>");
            var charCardFooter = $("<div>");
            var charCardTitle = $("<div>");
            var charCardImage = $("<img>");
            var charCardFooter = $("<div>"); 
            var charCardHP = $("<div>"); 
            //create column to hold character card
            charContainer.attr("class", "col-6 col-sm-3 my-3 char-container");
            charContainer.attr("id", code);
            $("#selectElem").append(charContainer);
            //create character card
            charCard.attr("class", "char-card card h-100 my-2 text-center border-thick border-success rounded-0");
            charCard.attr("id", "card-"+code);
            $("#"+code).append(charCard);
            //create character card header
            charCardHeader.attr("class", "card-header py-1");
            charCardHeader.attr("id", "charCardHeader-"+code);
            $("#card-"+code).append(charCardHeader);
            //create character card body
            charCardBody.attr("class", "card-body p-0 bg-light");
            charCardBody.attr("id", "charCardBody-"+code);
            $("#card-"+code).append(charCardBody);
            //create character card footer
            charCardFooter.attr("class", "card-footer py-1");
            charCardFooter.attr("id", "charCardFooter-"+code);
            $("#card-"+code).append(charCardFooter);
            //append character name to card header
            charCardTitle.attr("class", "card-title");
            charCardTitle.attr("id", "charCardTitle-"+code);
            charCardTitle.append(name);
            $("#charCardHeader-"+code).append(charCardTitle);
            //append character image to card body
            charCardImage.attr("class", "card-image img-fluid");
            charCardImage.attr("src", charImage);
            $("#charCardBody-"+code).append(charCardImage);
            //append character HP to card footer
            charCardHP.attr("class", "");
            charCardHP.attr("id", "charCardHP-"+code);
            charCardHP.text(hp);
            $("#charCardFooter-"+code).append(charCardHP);
        },
        charsToSelectElem : function () {
            //loop through character array and create character cards for each character
            for (var i = 0; i < game.characters.length; i++) {
                //declare variables
                var charCode = game.characters[i].code;
                var charName = game.characters[i].name;
                var charHP = game.characters[i].healthPoints;
                $("#selectElemTitle").text("Choose Your Character");
                //create character cards
                this.createCharacterCard(charCode, charName, charHP);

            }
            
        },
        playerSelect : function () { 
            //handle user clicking on player container
            $(".char-container").on("click",function (){
                //check to see if user has already selected their player
                if (game.data.playerCharacter.code === null){
                    //assign user player based on user input
                    var selectedPlayerCode = this.id
                    game.data.playerCharacter.code = selectedPlayerCode;
                    //move selected player card to to player character container and adjust styling
                    $("#"+game.data.playerCharacter.code).attr("class", "col-6 col-sm-3 mx-md-auto char-container");
                    $("#"+game.data.playerCharacter.code).appendTo("#playerElem");
                    //loop through array to populate the player character and enemy character elements
                    for (var i = 0; i < game.characters.length; i++) {
                        var charCode = game.characters[i].code;
                        //match selected charecter
                        if(charCode === game.data.playerCharacter.code){
                            //populate player character stats to game data object
                            game.data.playerCharacter.name = game.characters[i].name;
                            game.data.playerCharacter.hp = game.characters[i].healthPoints;
                            game.data.playerCharacter.attack = game.characters[i].attackPower;
                            game.data.playerCharacter.baseAttack = game.characters[i].attackPower;
                            console.log("Character Name: "+game.data.playerCharacter.name+", HP: "+game.data.playerCharacter.hp+", Attack: "+game.data.playerCharacter.attack);
                            
                        } else {
                            //move nonselected players to enemy and adjust styling
                            $("#card-"+charCode).attr("class", "char-Card card h-100 my-2 text-center border-thick border-danger rounded-0");
                            $("#"+charCode).appendTo("#enemyElem");
                            
                        }
                    }
                    //
                    $("#selectElemTitle").text("Choose An Opponent");
                }
            })
        
        },
        playerReset: function () {
            game.data.playerCharacter.code = null;
            game.data.playerCharacter.name = null;
            game.data.playerCharacter.hp = null;
            game.data.playerCharacter.attack = null;
            game.data.playerCharacter.baseAttack = null;
        },
        enemySelect: function () {
            $(".char-container").on("click",function (){
                if (game.data.currentEnemy.code === null && game.data.playerCharacter.code !== null && this.id !== game.data.playerCharacter.code){
                    
                $("#selectElemTitle").text("Enemies Remaining");
                    game.data.currentEnemy.code = this.id;
                    $("#"+game.data.currentEnemy.code).attr("class", "col-6 col-sm-3 mx-md-auto char-container");
                    $("#"+game.data.currentEnemy.code).appendTo("#defenderElem");
                    $("#enemyElem").hide();
                    $("#selectElemTitle").hide();
                    for (var i = 0; i < game.characters.length; i++) {
                        var charCode = game.characters[i].code;
                        if(charCode === game.data.currentEnemy.code){
                            game.data.currentEnemy.name = game.characters[i].name;
                            game.data.currentEnemy.hp = game.characters[i].healthPoints;
                            game.data.currentEnemy.attack = game.characters[i].counterAttackPower;
                            console.log("Character Name: "+game.data.currentEnemy.name+", HP: "+game.data.currentEnemy.hp+", Attack: "+game.data.currentEnemy.attack);
                            //console.log(game.data.currentEnemy.code);
                        } 
                    } 
                    game.functions.createAttackButton();
                }
            })
        },
        enemyReset: function () {
            game.data.currentEnemy.code = null;
            game.data.currentEnemy.name = null;
            game.data.currentEnemy.hp = null;
            game.data.currentEnemy.attack = null;
        },
        
        gameReset: function () {
            //$('#reset-button').click(function() {
                location.reload();
            //});
            //game.functions.enemyReset();
            //game.functions.playerReset();
            //$("#playerElem").empty();
            //$("#defenderElem").empty();
            //$("#enemyElem").empty();
            //game.functions.charsToSelectElem();
            //$("#reset-button").hide()
            //console.log("WOW");
        },
        createResetButton: function () {
             
            $("#selectElemTitle").text("Great game... How 'bout another?");
            var reset = $("<button>");
            reset.attr("id", "reset-button");
            reset.attr("data-toggle", "none");
            reset.attr("data-target", "none");
            reset.attr("onClick", "game.functions.gameReset()");
            reset.attr("class", "btn btn-primary btn-block");
            reset.text("Play Again");
            $("#fightElem").append(reset);
        },
        createAttackButton: function () {
            
            if($("#fight-button").length) {
                
                $("#fight-button").show();

            } else {
                $("#"+game.data.currentEnemy.code).attr("class", "col-6 col-sm-3 mx-md-auto char-container");
                $("#"+game.data.currentEnemy.code).appendTo("#defenderElem");
                var fightButton = $("<button>");
                fightButton.attr("id", "fight-button");
                fightButton.attr("data-toggle", "none");
                fightButton.attr("data-target", "none");
                fightButton.attr("onClick", "game.functions.attack()");
                fightButton.attr("class", "btn btn-primary btn-block");
                fightButton.text("Attack");
                $("#fightElem").append(fightButton);
                
            }
        },
        checkWin: function () {
            if ($('#enemyElem').is(':empty')){
                game.functions.createResetButton();
              }
        },
        attack : function () {    
            var player = game.data.playerCharacter.code;
            var playerHP = game.data.playerCharacter.hp;
            var playerBaseAttack = game.data.playerCharacter.baseAttack;
            var playerAttack = game.data.playerCharacter.attack;
            var playerName = game.data.playerName;
                
            //$("#fight-button").on("click", function () {
                var enemy = game.data.currentEnemy.code;
                var enemyCounterAttack = game.data.currentEnemy.attack;
                var enemyName = game.data.currentEnemy.name;

                game.data.currentEnemy.hp += -playerAttack;
                game.data.playerCharacter.hp += -enemyCounterAttack;
                game.data.playerCharacter.attack += playerBaseAttack;

                console.log(enemy+", HP: "+game.data.currentEnemy.hp+", Attack: "+enemyCounterAttack);
                console.log(player+", HP: "+playerHP+", Attack: "+playerAttack);                
                
                if (game.data.currentEnemy.hp <= 0) {
                    game.data.currentEnemy.hp = 0;
                    game.functions.enemyReset(); 
                    $("#charCardHP-"+enemy).text(game.data.currentEnemy.hp);
                    $("#charCardHP-"+player).text(playerHP);
                    alert(player+" WINS!!!");
                    $("#"+enemy).remove();
                    $("#fight-button").hide();
                    $("#enemyElem").show();
                    $("#selectElemTitle").show();
                    game.functions.checkWin();
                    console.log(enemy);                   
                } else if (playerHP <= 0) {
                    playerHP = 0;
                    $("#charCardHP-"+enemy).text(game.data.currentEnemy.hp);
                    $("#charCardHP-"+player).text(playerHP);
                    alert(enemyName+" WINS!!!");
                    $("#fight-button").remove();
                    game.functions.createResetButton();
                } else {             
                    $("#charCardHP-"+enemy).text(game.data.currentEnemy.hp);
                    $("#charCardHP-"+player).text(playerHP);
                    $("#playerStats").text("You attacked "+enemyName+" for "+playerAttack+" damage.");
                    $("#enemyStats").text(enemyName+" attacked you back for "+enemyCounterAttack+" damage.");
                }
                
            //})
        },
        
    }
}

$(document).ready(function(){
    
    game.functions.charsToSelectElem();
    game.functions.enemySelect();
    game.functions.playerSelect();
    //game.functions.attack();
   
});