var game = {
    play: function () {

        $(document).ready(function () {

            game.functions.gameinitialize();
            game.functions.playerSelect();
            game.functions.opponentSelect();

        });

    },
    state: {
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
            },
            instrucitonsElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "instructionsElement", "#gameContainer");
                //style element
                $(element).attr("class", "row m-1");
                //append child content
                game.functions.create.instructionsTextElement();
            },
            instructionsTextElement: function () {
                //create element
                var element = game.functions.create.newElement("div", "instructionsTextElement", "#instructionsElement");
                //style element
                $(element).attr("class", "col text-center");
                //add starting instructions
                game.functions.update.instructionsTextElement("Choose Your Character");
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
                var gameModal = $("<div>");
                gameModal.attr("class", "modal fade");
                gameModal.attr("id", "gameModal");
                gameModal.attr("tabindex", "-1");
                gameModal.attr("role", "dialog");
                gameModal.attr("aria-labelledby", "modalCenterTitle");
                gameModal.attr("aria-hidden", "true");
                $("#gameContainer").append(gameModal);
                game.functions.create.gameModalDialogue();
                
                
            },
            gameModalDialogue: function () {
                var gameModalDialogue = $("<div>");
                gameModalDialogue.attr("id", "gameModalDialogue");
                gameModalDialogue.attr("class", "modal-dialog modal-dialog-centered");
                gameModalDialogue.attr("role", "document");
                $("#gameModal").append(gameModalDialogue);
                game.functions.create.gameModalContent();
            },
            gameModalContent: function () {
                var gameModalContent = $("<div>");
                gameModalContent.attr("id", "gameModalContent");
                gameModalContent.attr("class", "modal-content");
                $("#gameModalDialogue").append(gameModalContent);
                game.functions.create.gameModalHeader();
                game.functions.create.gameModalBody();
                game.functions.create.gameModalFooter();
            },
            gameModalHeader: function (){
                var gameModalHeader = $("<div>");
                gameModalHeader.attr("id", "gameModalHeader");
                gameModalHeader.attr("class", "modal-header");
                $("#gameModalContent").append(gameModalHeader);
                game.functions.create.gameModalTitle();
                game.functions.create.gameModalCloseButton();
            },
            gameModalTitle: function (){
                var gameModalTitle = $("<p>");
                gameModalTitle.attr("id", "gameModalTitle");
                gameModalTitle.attr("class", "modal-title");
                $("#gameModalHeader").append(gameModalTitle);
                
            },
            gameModalCloseButton: function (){
                var gameModalCloseButton = $("<button>");
                gameModalCloseButton.attr("type", "button");
                gameModalCloseButton.attr("id", "gameModalCloseButton");
                gameModalCloseButton.attr("class", "close");
                gameModalCloseButton.attr("data-dismiss", "modal");
                gameModalCloseButton.attr("aria-label", "Close");
                $("#gameModalHeader").append(gameModalCloseButton);
                game.functions.create.closeIcon("#gameModalCloseButton");
            },
            closeIcon: function (destination){
                var closeIcon = $("<span>");
                closeIcon.attr("aria-hidden", "true");
                closeIcon.html("&times;");
                $(destination).append(closeIcon);
            },
            gameModalBody: function (){
                var gameModalBody = $("<div>");
                gameModalBody.attr("id", "gameModalBody");
                gameModalBody.attr("class", "modal-body");
                $("#gameModalContent").append(gameModalBody);
            },
            gameModalBodyText: function (){
                var gameModalBodyText = $("<p>");
                gameModalBodyText.attr("id", "gameModalBody");
                gameModalBodyText.attr("class", "modal-body");
                $("#gameModalBody").append(gameModalBodyText);
            },
            gameModalFooter: function (){
                var gameModalFooter = $("<div>");
                gameModalFooter.attr("id", "gameModalFooter");
                gameModalFooter.attr("class", "modal-footer");
                $("#gameModalContent").append(gameModalFooter);
            },
            gameModalFooterButton: function (){
                var gameModalFooterText = $("<p>");
                gameModalFooterText.attr("id", "gameModalFooterText");
                gameModalFooterText.attr("class", "modal-footer");
                $("#gameModalFooter").append(gameModalFooterText);
            },
            attackButton: function () {

                if ($("#fight-button").length) {

                    $("#attackElement").show();
                    $("#playerElement").attr("class", "col-4");

                } else {
                    var buttonContainer = $("<div>");
                    buttonContainer.attr("id", "buttonContainer");
                    buttonContainer.attr("class", "col-12");
                    $("#attackElement").append(buttonContainer);
                    $("#" + game.state.opponent.code).attr("class", "col-12 mx-md-auto char-container");
                    $("#" + game.state.opponent.code).appendTo("#defenderElement");
                    var fightButton = $("<button>");
                    fightButton.attr("id", "fight-button");
                    fightButton.attr("data-toggle", "none");
                    fightButton.attr("data-target", "none");
                    fightButton.attr("onClick", "game.functions.attack()");
                    fightButton.attr("class", "btn btn-primary btn-block");
                    fightButton.text("Attack");
                    $("#buttonContainer").append(fightButton);

                }
            },
            resetButton: function () {
                $("#attackElement").show();
                $("#playerElement").attr("class", "col-4");
                var reset = $("<button>");
                reset.attr("id", "reset-button");
                reset.attr("data-toggle", "none");
                reset.attr("data-target", "none");
                reset.attr("onClick", "game.functions.gameReset()");
                reset.attr("class", "btn btn-primary btn-block");
                reset.text("Play Again");
                $("#buttonContainer").append(reset);
                
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
        reset: {},
        gameinitialize: function () {
            game.functions.create.gameContainer();
            game.functions.create.instrucitonsElement();
            game.functions.create.selectElement();
            game.functions.create.fightElement();
            game.functions.create.tempAttackElement();
            //game.functions.create.playerElement();
            //game.functions.create.attackElement();
            //game.functions.create.defenderElement();
            game.functions.create.statusElement();
            game.functions.create.gameModal();
            game.functions.charsToSelectElement();
            
        },
        charsToSelectElement: function () {
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
        playerSelect: function () {
            //handle user clicking on player container
            $(".char-container").on("click", function () {
                //check to see if user has already selected their player
                if (game.state.player.code === null) {
                    //assign user player based on user input
                    var selectedPlayerCode = this.id
                    game.state.player.code = selectedPlayerCode;
                    //move selected player card to to player character container and adjust styling
                    $("#" + game.state.player.code).attr("class", "col-12 mx-md-auto char-container");
                    $("#" + game.state.player.code).appendTo("#playerElement");
                    //loop through array to populate the player character and enemy character elements
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
                            //move nonselected players to enemy and adjust styling
                            $("#card-" + charCode).attr("class", "char-Card card h-100 my-2 text-center border-thick border-danger rounded-0");
                            

                        }
                    }
                    game.functions.update.instructionsTextElement("Choose An Opponent");
                }
            })
        },
        playerReset: function () {
            game.state.player.code = null;
            game.state.player.name = null;
            game.state.player.hp = null;
            game.state.player.attack = null;
            game.state.player.baseAttack = null;
        },
        opponentSelect: function () {
            $(".char-container").on("click", function () {
                if (game.state.opponent.code === null && game.state.player.code !== null && this.id !== game.state.player.code) {
                    var selectedPlayerCode = this.id
                    game.state.opponent.code = selectedPlayerCode;
                    console.log("#" + game.state.opponent.code);
                    $("#"+game.state.opponent.code).attr("class", "col-12 mx-md-auto char-container");
                    $("#" + game.state.opponent.code).appendTo("#defenderElement");
                    game.functions.update.instructionsTextElement("FIGHT!!!");
                    $("#selectElement").hide();
                    for (var i = 0; i < game.characters.length; i++) {
                        var charCode = game.characters[i].code;
                        if (charCode === game.state.opponent.code) {
                            game.state.opponent.name = game.characters[i].name;
                            game.state.opponent.hp = game.characters[i].healthPoints;
                            game.state.opponent.attack = game.characters[i].counterAttackPower;
                            console.log("Character Name: " + game.state.opponent.name + ", HP: " + game.state.opponent.hp + ", Attack: " + game.state.opponent.attack);
                        }
                    }
                    game.functions.create.attackButton();
                    game.functions.update.playerStatusElement("");
                    game.functions.update.opponentStatusElement("");
                }
            })
        },
        enemyReset: function () {
            game.state.opponent.code = null;
            game.state.opponent.name = null;
            game.state.opponent.hp = null;
            game.state.opponent.attack = null;
        },
        gameReset: function () {
            location.reload();
        },
        checkWin: function () {
            if ($('#selectElement').is(':empty')) {
                game.functions.create.resetButton();
                $("#fight-button").hide();
                game.functions.update.playerStatusElement("");
                game.functions.update.opponentStatusElement("");
                $("#playerElement").attr("class", "col-4 offset-4");
                $("#instructionsTextElement").text("Great Game! How 'bout Another?");
            }
        },
        opponentDefeated: function (oppCode, oppHP, oppName, plyrCode, plyrHP) {
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
            game.functions.checkWin();
            $("#gameModal").modal("show");
            $("#selectElement").show();
            
            game.functions.enemyReset();
        },
        playerDefeated: function (oppCode, oppHP, oppName, plyrCode, plyrHP) {
            plyrHP = 0;
            $("#charCardHP-" + oppCode).text(oppHP);
            $("#charCardHP-" + plyrCode).text(plyrHP);
            //game.functions.update.playerStatusElement("You attacked " + game.state.opponent.name + " for " + game.state.player.attack + " damage.");
            //game.functions.update.opponentStatusElement(oppName + " attacked you back for " + game.state.opponent.attack + " damage.");
            alert(oppName + " WINS!!!");
            $("#fight-button").remove();
            $("#instructionsTextElement").text("Great Game! How 'bout Another?");
            game.functions.create.resetButton();
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
                game.functions.opponentDefeated(enemy, enemyHP, enemyName, player, playerHP);
            } else if (game.state.player.hp <= 0) {
                game.functions.playerDefeated(enemy, enemyHP, enemyName, player, playerHP);
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