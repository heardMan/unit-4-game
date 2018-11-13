var game = {
    data : {
        playerCharacterCode: null,
        playerCharacterName: null,
        playerCharacterHP: null,
        playerCharacterBaseAttack: null,
        playerCharacterAttack: null,
        currentEnemyCode: null,
        currentEnemyName: null,
        currentEnemyHP: null,
        currentEnemyCounterAttack: null,
        
    },
    characters : [
        {
            name: "Skywalker",
            code: "lukeSkywalker",
            healthPoints: 100,
            attackPower: 6,
            counterAttackPower: 5,
        },
        {
            name: "Obi Wan",
            code: "obiWanKenobi",
            healthPoints: 120,
            attackPower: 8,
            counterAttackPower: 10,
        },
        {
            name: "Vader",
            code: "darthVader",
            healthPoints: 150,
            attackPower: 10,
            counterAttackPower: 15,
        },
        {
            name: "Palpatine",
            code: "emporerPalpatine",
            healthPoints: 180,
            attackPower: 12,
            counterAttackPower: 20,
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
            charContainer.attr("class", "col-sm-6 col-md-2   char-container");
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

                this.createCharacterCard(charCode, charName, charHP);
                
            }
            
        },
        characterSelect : function () {
            
            $(".char-container").on("click",function (){
                if  (game.data.currentEnemyCode === null && game.data.playerCharacterCode != null) {
                    game.data.currentEnemyCode = this.id;
                    for ( var i = 0; i < game.characters.length; i++ ) {
                        var enemyCode = game.characters[i].code;
                        if ( enemyCode === game.data.currentEnemyCode ) {
                            game.data.currentEnemyName = game.characters[i].name;
                            game.data.currentEnemyHP = game.characters[i].healthPoints;
                            game.data.currentEnemyCounterAttack = game.characters[i].counterAttackPower;
                            console.log("Enemy Name: "+game.data.currentEnemyName+", HP: "+game.data.currentEnemyHP+", Attack: "+game.data.currentEnemyCounterAttack);
                        }
                    }
                    

                    $("#"+game.data.currentEnemyCode).attr("class", "col-sm-6 col-md-2 mx-md-auto  char-container");
                    $("#"+game.data.currentEnemyCode).appendTo("#defenderElem");
                    $("#selectElemTitle").text("Enemies Remaining");
                    var fightButton = $("button");
                    fightButton.attr("id", "fight-button");
                    fightButton.attr("data-toggle", "none");
                    fightButton.attr("data-target", "none");
                    fightButton.attr("onClick", game.functions.attack());
                    fightButton.attr("class", "btn btn-primary btn-block");
                    fightButton.text("Attack");
                    $("#fightElem").append(fightButton);
                } else if (game.data.playerCharacterCode === null){
                    
                    game.data.playerCharacterCode = this.id;
                    
                    //console.log(playerChar);
                    $("#"+game.data.playerCharacterCode).attr("class", "col-sm-6 col-md-2 mx-md-auto  char-container");
                    $("#"+game.data.playerCharacterCode).appendTo("#playerElem");
                    for (var i = 0; i < game.characters.length; i++) {
                        var charCode = game.characters[i].code;
                        if(charCode === game.data.playerCharacterCode){
                            game.data.playerCharacterName = game.characters[i].name;
                            game.data.playerCharacterHP = game.characters[i].healthPoints;
                            game.data.playerCharacterAttack = game.characters[i].attackPower;
                            game.data.playerCharacterBaseAttack = game.characters[i].attackPower;

                            console.log("Character Name: "+game.data.playerCharacterName+", HP: "+game.data.playerCharacterHP+", Attack: "+game.data.playerCharacterAttack);
                        
                        } else {
                            $("#card-"+charCode).attr("class", "char-Card card h-100 my-2 text-center border-thick border-danger rounded-0");
                            $("#"+charCode).appendTo("#enemyElem");
                            
                        }
                    } 
                    $("#selectElemTitle").text("Choose Your Enemy");
                    $("#selectElem").hide();
                }
                
                //
            })
        
        },
        attack : function () {
                var enemy = game.data.currentEnemyCode;
                var enemyHP = game.data.currentEnemyHP;
                var enemyCounterAttack = game.data.currentEnemyCounterAttack;
                var player = game.data.playerCharacterCode;
                var playerHP = game.data.playerCharacterHP;
                var playerBaseAttack = game.data.playerCharacterBaseAttack;
                var playerAttack = game.data.playerCharacterAttack;
                
            $("#fight-button").on("click", function () {
                enemyHP += -playerAttack;
                playerHP += -enemyCounterAttack;
                playerAttack += playerBaseAttack;

                console.log(enemy+", HP: "+enemyHP+", Attack: "+enemyCounterAttack);
                console.log(player+", HP: "+playerHP+", Attack: "+playerAttack);                
                
                
            })
        },
        printFightStatus: function () {

        },
        
    }
}

//player character moves to playerElem
//nonselected players move to enemyElem 

//player selects enemy 
//selected enemy moves to defenderElem
//attack button in fightElem becomes active

//player clicks attack button
//defender HP decreases
//player attackPower increases by base power
//defender counter attacks -- player HP decreases
//status elem displays players attack and defenders counter attack

//defender HP reaches 0
//enemy is removed from screen
//message displays to choose a new enemy

//player HP reaches 0
//game over message displays in statusElem
//Restart button becomes visible

$(document).ready(function(){
    
    game.functions.charsToSelectElem();
    game.functions.characterSelect();
    game.functions.attack();
   
});