var game = {
    //game invocation method
    play: function () {

        $(document).ready(function () {

            game.functions.init();
            game.functions.playerSelectSequence();
            game.functions.mainGameSequence();

        });

    },

    state: {
        //current character array
        player: {
            code: null,
            name: null,
            hp: null,
            attack: null,
            baseAttack: null,
        },
        opponent: {
            code: null,
            name: null,
            hp: null,
            attack: null,
        },
    },
    characters: [
        //default character array
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
    functions: {
        create: {
            newElement: function (type, id, destination){
                var newElement = $("<" + type + ">");
                newElement.attr("id", id);
                $(destination).append(newElement);
                return newElement;
            },
            gameContainer: function () {
                //find destination
                var gameContainer = $("#game");
                //convert game destination to game container by changing id and class
                gameContainer.attr("id", "gameContainer");
                gameContainer.attr("class", "container-fluid px-0");
                //append game elements
                game.functions.create.instrucitonsElement();
                game.functions.create.selectElement();
                game.functions.create.fightElement();
                game.functions.create.tempAttackElement();
                game.functions.create.statusElement();
                game.functions.create.gameModal();
            },
            instrucitonsElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "instructionsElement", "#gameContainer");
                //style element
                $(element).attr("class", "row m-1");
                //append instruction text
                game.functions.create.instructionsTextElement();
            },
            instructionsTextElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "instructionsTextElement", "#instructionsElement");
                //style element
                $(element).attr("class", "col text-center");
            },
            selectElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "selectElement", "#gameContainer");
                //style element
                $(element).attr("class", "row my-1 px-5 justify-content-center");
            },
            fightElement: function (){
                //create element
                var element = game.functions.create.newElement("div", "fightElement", "#gameContainer");
                //style element
                $(element).attr("class", "row my-3 justify-content-center");
                //append child content
                game.functions.create.playerElement();
                game.functions.create.attackElement();
                game.functions.create.defenderElement();
            },
            playerElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "playerElement", "#fightElement");
                //style element
                $(element).attr("class", "col-4");
            },
            defenderElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "defenderElement", "#fightElement");
                //style element
                $(element).attr("class", "col-4");
            },
            tempAttackElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "tempAttackElement", "#gameContainer");
                //style element
                $(element).attr("class", "row my-1 justify-content-center");
                //append child content
                game.functions.create.attackElement();
            },
            attackElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "attackElement", "#tempAttackElement");
                //style element
                $(element).attr("class", "col-4");
                game.functions.create.attackElementButtonContainer();
            },
            attackElementButtonContainer: function (){
                //create element
                var element = game.functions.create.newElement("div", "buttonContainer", "#attackElement");
                //style element 
                $(element).attr("class", "col-12");
            },
            statusElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "statusElement", "#gameContainer");
                //style element
                $(element).attr("class", "row my-1 justify-content-center");
                //append child content
                game.functions.create.playerStatusElement();
                game.functions.create.opponentStatusElement();
            },
            playerStatusElement: function () {
                //create element
                var element = game.functions.create.newElement("p", "playerStatusElement", "#statusElement");
                //style element
                $(element).attr("class", "col-12 text-center");
            },
            opponentStatusElement: function () {
                //create element
                var element = game.functions.create.newElement("p", "opponentStatusElement", "#statusElement");
                //style element
                $(element).attr("class", "col-12 text-center");
            },
            characterContainer: function (charCode) {
                //create element
                var element = game.functions.create.newElement("div", charCode, "#selectElement");
                //style element
                $(element).attr("class", "col-6 col-sm-3 my-3 char-container");
            },
            characterCard: function (charCode) {
                //create element
                var element = game.functions.create.newElement("div", "card-" + charCode, "#" + charCode);
                //style element
                $(element).attr("class", "char-card card h-100 my-2 text-center border-thick border-success rounded-0");
            },
            characterCardHeader: function (charCode) {
                //create element
                var element = game.functions.create.newElement("div", "charCardHeader-" + charCode, "#card-" + charCode);
                //style element
                $(element).attr("class", "card-header py-1");
            },
            characterCardTitle: function (charCode, charName) {
                //create element
                var element = game.functions.create.newElement("p", "charCardTitle-" + charCode, "#charCardHeader-" + charCode);
                //style element
                $(element).attr("class", "card-title");
                //add player name to 
                $(element).text(charName);
            },
            characterCardBody: function (charCode) {
                //create element
                var element = game.functions.create.newElement("div", "charCardBody-" + charCode, "#card-" + charCode);
                //style element
                $(element).attr("class", "card-body p-0 bg-light");
            },
            characterCardImage: function (charCode) {
                //create element
                var element = game.functions.create.newElement("img", "charCardBody-" + charCode, "#charCardBody-" + charCode);
                //style element
                $(element).attr({
                    "class": "card-image img-fluid", 
                    "src": "./assets/images/" + charCode + ".png"
                });
            },
            characterCardFooter: function (charCode) {
                //create element
                var element = game.functions.create.newElement("div", "charCardFooter-" + charCode, "#card-" + charCode);
                //style element
                $(element).attr("class", "card-footer py-1");
            },
            characterCardHP: function (charCode, charHP) {
                //create element
                var element = game.functions.create.newElement("div", "charCardHP-" + charCode, "#charCardFooter-" + charCode);
                //style element
                $(element).attr("class", "");
                //add player HP
                $(element).text(charHP);
            },
            character: function (characterCode, characterName, characterHP) {
                game.functions.create.characterContainer(characterCode);
                game.functions.create.characterCard(characterCode);
                game.functions.create.characterCardHeader(characterCode);
                game.functions.create.characterCardBody(characterCode);
                game.functions.create.characterCardFooter(characterCode);
                game.functions.create.characterCardTitle(characterCode, characterName);
                game.functions.create.characterCardImage(characterCode);
                game.functions.create.characterCardHP(characterCode, characterHP);

            },
            gameModal: function () {
                //create element
                var element = game.functions.create.newElement("div", "gameModal", "#gameContainer");
                //style element
                $(element).attr({
                    "class": "modal fade",
                    "tabindex": "-1",
                    "role": "dialog",
                    "aria-labelledby": "modalCenterTitle",
                    "aria-hidden": "true",
                });
                //add modal dialogue div to modal div
                game.functions.create.gameModalDialogue();
            },
            gameModalDialogue: function () {
                //create element
                var element = game.functions.create.newElement("div", "gameModalDialogue", "#gameModal");
                //style element
                $(element).attr({
                    "class": "modal-dialog modal-dialog-centered",
                    "role": "document",
                });
                //add modal content div to modal dialogue div
                game.functions.create.gameModalContent();
            },
            gameModalContent: function () {
                //create element
                var element = game.functions.create.newElement("div", "gameModalContent", "#gameModalDialogue");
                //style element
                $(element).attr("class", "modal-content");
                //add header, body, and footer to modal content div
                game.functions.create.gameModalHeader();
                game.functions.create.gameModalBody();
                game.functions.create.gameModalFooter();
            },
            gameModalHeader: function (){
                //create element
                var element = game.functions.create.newElement("div", "gameModalHeader", "#gameModalContent");
                //style element
                $(element).attr("class", "modal-header");
                //add title and close button to modal header
                game.functions.create.gameModalTitle();
                game.functions.create.gameModalCloseButton();
            },
            gameModalTitle: function (){
                //create element
                var element = game.functions.create.newElement("p", "gameModalTitle", "#gameModalHeader");
                //style element
                $(element).attr("class", "modal-title");
            },
            gameModalCloseButton: function (){
                //create element
                var element = game.functions.create.newElement("button", "gameModalCloseButton", "#gameModalHeader");
                //style element
                $(element).attr({
                    "type": "button",
                    "class": "close",
                    "data-dismiss": "modal",
                    "aria-label": "Close",
                });
                //create and add close icon to close button
                game.functions.create.closeIcon("gameModalCloseButtonIcon","#gameModalCloseButton");
            },
            
            gameModalBody: function (){
                //create element
                var element = game.functions.create.newElement("div", "gameModalBody", "#gameModalContent");
                //style element
                $(element).attr("class", "modal-body");
            },
            gameModalBodyText: function (){
                //create element
                var element = game.functions.create.newElement("p", "gameModalBodyText", "#gameModalBody");
                //style element
                $(element).attr("class", "modal-body");
            },
            gameModalFooter: function (){
                //create element
                var element = game.functions.create.newElement("div", "gameModalFooter", "#gameModalContent");
                //style element
                $(element).attr("class", "modal-footer");
            },
            gameModalFooterButton: function (){
                //create element
                var element = game.functions.create.newElement("p", "gameModalFooterText", "#gameModalFooter");
                //style element
                $(element).attr("class", "modal-footer");
            },
            closeIcon: function (id, destination){
                //create element
                var element = game.functions.create.newElement("span", id, destination);
                //style element
                $(element).attr("aria-hidden", "true");
                //append icon symbol
                $(element). html("&times;");
            },
            attackButton: function (){
                //create element
                var element = game.functions.create.newElement("button", "fight-button", "#buttonContainer");
                //style element
                $(element).attr({
                    "data-toggle": "none",
                    "data-target": "none",
                    "onClick": "game.functions.attack()",
                    "class": "btn btn-primary btn-block",
                });
                //set button text
                $(element).text("Attack");
            },
            displayAttackButton: function () {

                if ($("#fight-button").length) {

                    $("#attackElement").show();
                    $("#playerElement").attr("class", "col-4");

                } else {
                    
                    $("#" + game.state.opponent.code).attr("class", "col-12 mx-md-auto char-container");
                    $("#" + game.state.opponent.code).appendTo("#defenderElement");
                    //create button
                    game.functions.create.attackButton();
                    
                }
            },
            resetButton: function () {
                //create element
                var element = game.functions.create.newElement("button", "reset-button", "#buttonContainer");
                //style element
                $(element).attr({
                    "data-toggle": "none",
                    "data-target": "none",
                    "onClick": "game.functions.reset.game()",
                    "class": "btn btn-primary btn-block",
                });
                //append button text
                $(element).text("Play Again");
            },
            displayResetButton: function () {
                
                $("#attackElement").show();
                $("#playerElement").attr("class", "col-4");
                //set button
                game.functions.create.resetButton();
            },
        },
        update: {
            instructionsTextElement: function (string) {
                $("#instructionsTextElement").text(string);
            },
            playerStatusElement: function (string) {
                $("#playerStatusElement").text(string);
            },
            opponentStatusElement: function (string) {
                $("#opponentStatusElement").text(string);
            },
            gameModalTitle: function (string){
                $("#gameModalTitle").text(string);
            },
            gameModalBodyText: function (string){
                $("#gameModalHeader").text(string);
            },
            

        },
        reset: {
            player: function () {
                game.state.player.code = null;
                game.state.player.name = null;
                game.state.player.hp = null;
                game.state.player.attack = null;
                game.state.player.baseAttack = null;
            },
            opponent: function () {
                game.state.opponent.code = null;
                game.state.opponent.name = null;
                game.state.opponent.hp = null;
                game.state.opponent.attack = null;
            },
            game: function () {
                location.reload();
            },
        },
        init: function () {
            //create game layout
            game.functions.create.gameContainer();
            //add characters to select element
            game.functions.populateSelectElement();
            
        },
        populateSelectElement: function () {
            //loop through character array and create character cards for each character
            for (var i = 0; i < game.characters.length; i++) {
                //declare variables
                var characterCode = game.characters[i].code;
                var characterName = game.characters[i].name;
                var characterHP = game.characters[i].healthPoints;
                //create characters
                this.create.character(characterCode, characterName, characterHP);
            }
            
        },
        playerSelectSequence: function () {
            //add start instructions
            game.functions.update.instructionsTextElement("Choose Your Character");
            //handle user clicking on player container
            $(".char-container").on("click", function () {
                //check to see if user has already selected their player
                if (game.state.player.code === null) {
                    //assign user player based on user input
                    var selectedPlayerCode = this.id
                    game.state.player.code = selectedPlayerCode;
                    //move selected character card to to player element and adjust styling
                    $("#" + game.state.player.code).attr("class", "col-12 mx-md-auto char-container");
                    $("#playerElement").hide();
                    $("#" + game.state.player.code).appendTo("#playerElement");
                    //loop through character array to get releveant character data
                    for (var i = 0; i < game.characters.length; i++) {
                        var charCode = game.characters[i].code;
                        //match selected character
                        if (charCode === game.state.player.code) {
                            //populate player character stats to game state object
                            game.state.player.name = game.characters[i].name;
                            game.state.player.hp = game.characters[i].healthPoints;
                            game.state.player.attack = game.characters[i].attackPower;
                            game.state.player.baseAttack = game.characters[i].attackPower;
                            console.log("Character Name: " + game.state.player.name + ", HP: " + game.state.player.hp + ", Attack: " + game.state.player.attack);
                        } else {
                            //adjust styling of nonselected characters
                            $("#card-" + charCode).attr("class", "char-Card card h-100 my-2 text-center border-thick border-danger rounded-0");
                        }
                    }
                    //now that the player's character has been assign change instructions
                    game.functions.update.instructionsTextElement("Choose An Opponent");
                }
            })
        },
        mainGameSequence: function () {
            //handle user clicking on player container
            $(".char-container").on("click", function () {
                //check to see if user has already selected an opponent
                if (game.state.opponent.code === null && game.state.player.code !== null && this.id !== game.state.player.code) {
                    //assign current opponent based on user input
                    var selectedPlayerCode = this.id
                    game.state.opponent.code = selectedPlayerCode;
                    //move selected character card to to defender element and adjust styling
                    $("#"+game.state.opponent.code).attr("class", "col-12 mx-md-auto char-container");
                    $("#" + game.state.opponent.code).appendTo("#defenderElement");
                    $("#playerElement").show();
                    game.functions.update.instructionsTextElement("FIGHT!!!");
                    $("#selectElement").hide();
                    //loop through character array to get releveant character data
                    for (var i = 0; i < game.characters.length; i++) {
                        var charCode = game.characters[i].code;
                        //match selected character
                        if (charCode === game.state.opponent.code) {
                            //populate opponent character stats to game state object
                            game.state.opponent.name = game.characters[i].name;
                            game.state.opponent.hp = game.characters[i].healthPoints;
                            game.state.opponent.attack = game.characters[i].counterAttackPower;
                            console.log("Character Name: " + game.state.opponent.name + ", HP: " + game.state.opponent.hp + ", Attack: " + game.state.opponent.attack);
                        }
                    }
                    game.functions.create.displayAttackButton();
                    game.functions.update.playerStatusElement("");
                    game.functions.update.opponentStatusElement("");
                }
            })
        },
        checkWin: function () {
            if ($('#selectElement').is(':empty')) {
                game.functions.create.displayResetButton();
                $("#fight-button").hide();
                game.functions.update.playerStatusElement("");
                game.functions.update.opponentStatusElement("");
                $("#playerElement").show();
                $("#playerElement").attr("class", "col-4 offset-4");
                $("#instructionsTextElement").text("Great Game! How 'bout Another?");
            }
        },
        opponentDefeated: function (oppCode, oppHP, oppName, plyrCode, plyrHP, playerName) {
            $("#attackElement").hide();
            $("#playerElement").attr("class", "col-4 offset-4");
            game.functions.update.gameModalTitle(oppName + " was defeated!!!")
            $("#gameModal").modal("show");
            oppHP = 0;
            $("#charCardHP-" + oppCode).text(oppHP);
            $("#charCardHP-" + plyrCode).text(plyrHP);
            game.functions.update.playerStatusElement(oppName + " defeated !!!");
            game.functions.update.opponentStatusElement("Choose your next opponent!");
            $("#" + oppCode).remove();
            game.functions.update.instructionsTextElement("Remaining Opponents");
            $("#playerElement").hide();
            game.functions.checkWin();
            $("#gameModal").modal("show");
            $("#selectElement").show();
            
            game.functions.reset.opponent();
        },
        playerDefeated: function (oppCode, oppHP, oppName, plyrCode, plyrHP, playerName) {
            plyrHP = 0;
            $("#charCardHP-" + oppCode).text(oppHP);
            $("#charCardHP-" + plyrCode).text(plyrHP);
            game.functions.update.gameModalTitle("Game Over")
            $("#gameModal").modal("show");
            $("#fight-button").remove();
            $("#instructionsTextElement").text("Great Game! How 'bout Another?");
            game.functions.create.displayResetButton();
        },
        attack: function () {

            var player = game.state.player.code;
            var playerHP = game.state.player.hp;
            var playerBaseAttack = game.state.player.baseAttack;
            var playerAttack = game.state.player.attack;
            var playerName = game.state.playerName;
            var enemy = game.state.opponent.code;
            var enemyCounterAttack = game.state.opponent.attack;
            var enemyName = game.state.opponent.name;
            var enemyHP = game.state.opponent.hp;

            game.state.opponent.hp += -playerAttack;
            game.state.player.hp += -enemyCounterAttack;
            game.state.player.attack += playerBaseAttack;

            if (game.state.opponent.hp <= 0) {
                game.functions.opponentDefeated(enemy, enemyHP, enemyName, player, playerHP, playerName);
            } else if (game.state.player.hp <= 0) {
                game.functions.playerDefeated(enemy, enemyHP, enemyName, player, playerHP, playerName);
            } else {
                $("#charCardHP-" + enemy).text(game.state.opponent.hp);
                $("#charCardHP-" + player).text(game.state.player.hp);
                game.functions.update.playerStatusElement("You attacked " + enemyName + " for " + playerAttack + " damage.");
                game.functions.update.opponentStatusElement(enemyName + " attacked you back for " + enemyCounterAttack + " damage.");

            }

        },
        //add new method here
    }
}
//Run Game
game.play();