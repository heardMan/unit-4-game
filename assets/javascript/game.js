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
            gameContainer: function () {
                var gameContainer = $("#game");
                gameContainer.attr("id", "gameContainer");
                gameContainer.attr("class", "container-fluid px-0");
            },
            instrucitonsElement: function () {
                var instructionsElement = $("<div>");
                instructionsElement.attr("id", "instructionsElement");
                instructionsElement.attr("class", "row m-1");
                $("#gameContainer").append(instructionsElement);
                game.functions.create.instructionsTextElement();
            },
            instructionsTextElement: function () {
                var instructionsTextElement = $("<p>");
                instructionsTextElement.attr("id", "instructionsTextElement");
                instructionsTextElement.attr("class", "col text-center");
                $("#instructionsElement").append(instructionsTextElement);
                $("#instructionsTextElement").text("Choose Your Character");
            },
            selectElement: function () {
                var selectElement = $("<div>");
                selectElement.attr("id", "selectElem");
                selectElement.attr("class", "row my-1 px-5 justify-content-center");
                $("#gameContainer").append(selectElement);
            },
            fightElement: function (){
                var fightElement = $("<div>");
                fightElement.attr("id", "fightElement");
                fightElement.attr("class", "row my-3 justify-content-center");
                $("#gameContainer").append(fightElement);

                game.functions.create.playerElement();
                game.functions.create.attackElement();
                game.functions.create.defenderElement();
            },
            playerElement: function () {
                var playerElement = $("<div>");
                playerElement.attr("id", "playerElem");
                playerElement.attr("class", "col-4");
                $("#fightElement").append(playerElement);
            },
            defenderElement: function () {
                var defenderElement = $("<div>");
                defenderElement.attr("id", "defenderElem");
                defenderElement.attr("class", "col-4");
                $("#fightElement").append(defenderElement);
            },
            tempAttackElement: function () {
                var tempAttackElement = $("<div>");
                tempAttackElement.attr("id", "tempAttackElement");
                tempAttackElement.attr("class", "row my-1 justify-content-center");
                $("#gameContainer").append(tempAttackElement);
                game.functions.create.attackElement();
            },
            attackElement: function () {
                var attackElement = $("<div>");
                attackElement.attr("id", "attackElement");
                attackElement.attr("class", "col-4");
                $("#tempAttackElement").append(attackElement);
            },
            
            statusElement: function () {
                var statusElement = $("<div>");
                statusElement.attr("id", "statusElem");
                statusElement.attr("class", "row my-1 justify-content-center");
                $("#gameContainer").append(statusElement);

                game.functions.create.playerStatusElement();
                game.functions.create.opponentStatusElement();
            },
            playerStatusElement: function () {
                var playerStats = $("<p>");
                playerStats.attr("id", "playerStatusElement");
                playerStats.attr("class", "col-12 text-center");
                $("#statusElem").append(playerStats);
            },
            opponentStatusElement: function () {
                var enemyStats = $("<p>");
                enemyStats.attr("id", "opponentStatusElement");
                enemyStats.attr("class", "col-12 text-center");
                $("#statusElem").append(enemyStats);
            },
            characterContainer: function (charCode) {
                //create column to hold character card
                var charContainer = $("<div>");
                charContainer.attr("id", charCode);
                charContainer.attr("class", "col-6 col-sm-3 my-3 char-container");
                $("#selectElem").append(charContainer);
            },
            characterCard: function (charCode) {
                //create character card
                var charCard = $("<div>");
                charCard.attr("class", "char-card card h-100 my-2 text-center border-thick border-success rounded-0");
                charCard.attr("id", "card-" + charCode);
                $("#" + charCode).append(charCard);
            },
            characterCardHeader: function (charCode) {
                //create character card header
                var charCardHeader = $("<div>");
                charCardHeader.attr("class", "card-header py-1");
                charCardHeader.attr("id", "charCardHeader-" + charCode);
                $("#card-" + charCode).append(charCardHeader);
            },
            characterCardName: function (charCode, charName) {
                //append character name to card header
                var charCardTitle = $("<div>");
                charCardTitle.attr("class", "card-title");
                charCardTitle.attr("id", "charCardTitle-" + charCode);
                charCardTitle.append(charName);
                $("#charCardHeader-" + charCode).append(charCardTitle);
            },
            characterCardBody: function (charCode) {
                //create character card body
                var charCardBody = $("<div>");
                charCardBody.attr("class", "card-body p-0 bg-light");
                charCardBody.attr("id", "charCardBody-" + charCode);
                $("#card-" + charCode).append(charCardBody);
            },
            characterCardImage: function (charCode) {
                //append character image to card body
                var charCardImage = $("<img>");
                var charImage = "./assets/images/" + charCode + ".png";
                charCardImage.attr("class", "card-image img-fluid");
                charCardImage.attr("src", charImage);
                $("#charCardBody-" + charCode).append(charCardImage);
            },
            characterCardFooter: function (charCode) {
                //create character card footer
                var charCardFooter = $("<div>");
                charCardFooter.attr("class", "card-footer py-1");
                charCardFooter.attr("id", "charCardFooter-" + charCode);
                $("#card-" + charCode).append(charCardFooter);
            },
            characterCardHP: function (charCode, charHP) {
                //append character HP to card footer
                var charCardHP = $("<div>");
                charCardHP.attr("class", "");
                charCardHP.attr("id", "charCardHP-" + charCode);
                charCardHP.text(charHP);
                $("#charCardFooter-" + charCode).append(charCardHP);
            },
            character: function (characterCode, characterName, characterHP) {
                game.functions.create.characterContainer(characterCode);
                game.functions.create.characterCard(characterCode);
                game.functions.create.characterCardHeader(characterCode);
                game.functions.create.characterCardBody(characterCode);
                game.functions.create.characterCardFooter(characterCode);
                game.functions.create.characterCardName(characterCode, characterName);
                game.functions.create.characterCardImage(characterCode);
                game.functions.create.characterCardHP(characterCode, characterHP);

            },
            winModal: function () {
                var winModal = $("<div>");
                winModal.attr("class", "modal fade");
                winModal.attr("id", "winModal");
                winModal.attr("tabindex", "-1");
                winModal.attr("role", "dialog");
                winModal.attr("aria-labelledby", "winModalCenterTitle");
                winModal.attr("aria-hidden", "true");
                $("#gameContainer").append(winModal);
                game.functions.create.winModalDialogue();
                
                
            },
            winModalDialogue: function () {
                var winModalDialogue = $("<div>");
                winModalDialogue.attr("id", "winModalDialogue");
                winModalDialogue.attr("class", "modal-dialog modal-dialog-centered");
                winModalDialogue.attr("role", "document");
                $("#winModal").append(winModalDialogue);
                game.functions.create.winModalContent();
            },
            winModalContent: function () {
                var winModalContent = $("<div>");
                winModalContent.attr("id", "winModalContent");
                winModalContent.attr("class", "modal-content");
                
                $("#winModalDialogue").append(winModalContent);
                game.functions.create.winModalHeader();
                game.functions.create.winModalBody();
                game.functions.create.winModalFooter();
            },
            winModalHeader: function (){
                var winModalHeader = $("<div>");
                winModalHeader.attr("id", "winModalHeader");
                winModalHeader.attr("class", "modal-header");
                winModalHeader.text(game.state.opponent.name + " was Defeated!!!");
                $("#winModalContent").append(winModalHeader);
            },
            winModalBody: function (){
                var winModalBody = $("<div>");
                winModalBody.attr("id", "winModalBody");
                winModalBody.attr("class", "modal-body");
                winModalBody.text("Something");
                $("#winModalContent").append(winModalBody);
            },
            winModalFooter: function (){
                var winModalFooter = $("<div>");
                winModalFooter.attr("id", "winModalFooter");
                winModalFooter.attr("class", "modal-footer");
            
                $("#winModalContent").append(winModalBody);
            },
            attackButton: function () {

                if ($("#fight-button").length) {

                    $("#attackElement").show();
                    $("#playerElem").attr("class", "col-4");

                } else {
                    var buttonContainer = $("<div>");
                    buttonContainer.attr("id", "buttonContainer");
                    buttonContainer.attr("class", "col-12");
                    $("#attackElement").append(buttonContainer);
                    $("#" + game.state.opponent.code).attr("class", "col-12 mx-md-auto char-container");
                    $("#" + game.state.opponent.code).appendTo("#defenderElem");
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
                $("#playerElem").attr("class", "col-4");
                
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
                    $("#" + game.state.player.code).appendTo("#playerElem");
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
                    $("#" + game.state.opponent.code).appendTo("#defenderElem");
                    game.functions.update.instructionsTextElement("FIGHT!!!");
                    $("#selectElem").hide();
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
            if ($('#selectElem').is(':empty')) {
                game.functions.create.resetButton();
                $("#fight-button").hide();
                game.functions.update.playerStatusElement("");
                game.functions.update.opponentStatusElement("");
                $("#playerElem").attr("class", "col-4 offset-4");
                $("#instructionsTextElement").text("Great Game! How 'bout Another?");
            }
        },
        opponentDefeated: function (oppCode, oppHP, oppName, plyrCode, plyrHP) {
            $("#attackElement").hide();
            $("#playerElem").attr("class", "col-4 offset-4");
            game.functions.create.winModal();
            $("#winModal").modal("show");
            oppHP = 0;
            $("#charCardHP-" + oppCode).text(oppHP);
            $("#charCardHP-" + plyrCode).text(plyrHP);
            game.functions.update.playerStatusElement(oppName + " defeated !!!");
            game.functions.update.opponentStatusElement("Choose your next opponent!");
            $("#" + oppCode).remove();
            game.functions.update.instructionsTextElement("Remaining Opponents");
            game.functions.checkWin();
            $("#selectElem").show();
            
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