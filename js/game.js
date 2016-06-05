var game2 = new Phaser.Game(800, 600, Phaser.CANVAS, 'siatka', { preload: preload, create: create, update: update});

function preload() { //ładowanie zasobów
    game2.load.image('ball', 'img/ball.png');
    game2.load.image('background', 'img/tlo.jpg');
    game2.load.image('platform', 'img/platform.jpg');
    game2.load.image('platform2', 'img/platform2.jpg');
    game2.load.image('poziom', 'img/poziom.png');
    game2.load.image('pion', 'img/pion.png');
    game2.load.image('slup', 'img/slup.png');
    game2.load.spritesheet('dude', 'img/sprite2.png', 32, 48);
    game2.load.spritesheet('dude2', 'img/sprite3.png', 32, 48);
}

var ball;
var platforma;
var poziom;
var pion;
var pion2;
var player;
var player2;
var slup;

var flaga1 = false;
var flaga2 = false;
var flagatryb = true;
var limit1 = 0;
var limit2 = 0;
var limitog = 4;

var score = 0;
var score2 = 0;
var scoreText;
var scoreText2;
var textsiatka1;

var jumpTimer = 0;
var jumpTimer2 = 0;
var jumpButton;
var yAxis = p2.vec2.fromValues(0, 1);
var yAxis2 = p2.vec2.fromValues(0, 1);

function create() { //tworzenie obiektów
    game2.physics.startSystem(Phaser.Physics.P2JS);

    game2.world.setBounds(0, -600, 800, 1200);

    game2.physics.p2.gravity.y = 500;
    game2.physics.p2.world.defaultContactMaterial.friction = 0.5;
    //game.physics.p2.restitution = 0.8;

    game2.add.sprite(0, 0, 'background');

    platforma = game2.add.sprite(200, 550, 'platform');
    game2.physics.p2.enable(platforma);
    platforma.body.static = true;
    platforma.body.mass = 100;

    platforma2 = game2.add.sprite(600, 550, 'platform2');
    game2.physics.p2.enable(platforma2);
    platforma2.body.static = true;
    platforma2.body.mass = 100;

    // poziom = game.add.sprite(400, -100, 'poziom');
    // game.physics.p2.enable(poziom);
    // poziom.body.static = true;
    // poziom.body.mass = 1;

    pion = game2.add.sprite(10, 400, 'pion');
    game2.physics.p2.enable(pion);
    pion.body.static = true;
    pion.body.mass = 1000;

    pion2 = game2.add.sprite(790, 400, 'pion');
    game2.physics.p2.enable(pion2);
    pion2.body.static = true;
    pion2.body.mass = 1000;

    slup = game2.add.sprite(390, 400, 'slup');
    game2.physics.p2.enable(slup);
    slup.body.static = true;


    ball = game2.add.sprite(150, 300, 'ball');
    ball.scale.setTo(0.3, 0.3); 
    game2.physics.p2.enable(ball);
    ball.body.setCircle(40);
    //ball.body.rotateLeft(2);
    ball.body.mass = 0.1;
    ball.body.static = true;

    player = game2.add.sprite(700, game2.world.height - 750, 'dude2');
    player.animations.add('left', [4, 5, 6, 7], 10, true);
    player.animations.add('right', [8, 9, 10, 11], 10, true);
    game2.physics.p2.enable(player);
    player.body.fixedRotation = true;
    player.scale.setTo(1.8, 1.8);
    player.body.setCircle(32);
    player.body.mass = 501;

    player2 = game2.add.sprite(100, game2.world.height - 750, 'dude');
    player2.animations.add('left', [4, 5, 6, 7], 10, true);
    player2.animations.add('right', [8, 9, 10, 11], 10, true);
    game2.physics.p2.enable(player2);
    player2.body.fixedRotation = true;
    player2.scale.setTo(1.8, 1.8);
    player2.body.setCircle(32);
    player2.body.mass = 500;

    var ballcol = game2.physics.p2.createMaterial('ballcol', ball.body);
    var platformacol = game2.physics.p2.createMaterial('platformacol', platforma.body);
    var platforma2col = game2.physics.p2.createMaterial('platforma2col', platforma2.body);
    var playercol = game2.physics.p2.createMaterial('playercol', player.body);
    var player2col = game2.physics.p2.createMaterial('playercol', player2.body);
    var slupcol = game2.physics.p2.createMaterial('slupcol', slup.body);
    //var poziomcol = game.physics.p2.createMaterial('poziom', poziom.body);
    var pioncol = game2.physics.p2.createMaterial('pion', pion.body); 
    var pion2col = game2.physics.p2.createMaterial('pion2', pion2.body); 

    //game.physics.p2.setWorldMaterial(playercol, false, false, false, false);

    var contactMaterial = game2.physics.p2.createContactMaterial(ballcol, platformacol);
    var contactMaterial2 = game2.physics.p2.createContactMaterial(ballcol, platforma2col);
    var contactMaterialPB = game2.physics.p2.createContactMaterial(ballcol, playercol);
    var contactMaterialP2B = game2.physics.p2.createContactMaterial(ballcol, player2col);    
    var contactMaterialSB = game2.physics.p2.createContactMaterial(ballcol, slupcol);
    var contactMaterialPION1B = game2.physics.p2.createContactMaterial(ballcol, pioncol);
    var contactMaterialPION2B = game2.physics.p2.createContactMaterial(ballcol, pion2col);
    //var contactMaterialPOZIOMB = game.physics.p2.createContactMaterial(ballcol, poziomcol);

    contactMaterial.restitution = 0.5;
    contactMaterial2.restitution = 0.5;
    contactMaterialPB.restitution = 0.4;
    contactMaterialP2B.restitution = 0.4;
    contactMaterialSB.restitution = 0.5;
    contactMaterialPION1B.restitution = 0.5;
    contactMaterialPION2B.restitution = 0.5;
    //contactMaterialPOZIOMB.restitution = 0.5;

    ball.body.onBeginContact.add(ball_player1Hit, this);
    ball.body.onBeginContact.add(ball_player2Hit, this);

    platforma.body.onBeginContact.add(ball_platformaHit, this);
    platforma2.body.onBeginContact.add(ball_platforma2Hit, this);

    scoreText = game2.add.text(16, 16, 'Score: 0', { font:'30px Hobo, cursive',  fill: '#E85C2F'});
    scoreText.stroke = '#000000';
    scoreText.strokeThickness = 6;
    scoreText2 = game2.add.text(650, 16, 'Score: 0', { font: '30px Hobo, cursive', fill: '#E85C2F' });
    scoreText2.stroke = '#000000';
    scoreText2.strokeThickness = 6;

    textsiatka1 = game2.add.text(400, 560, "E - gra z botem       Q - przejęcie kontroli nad botem", { font:'30px Hobo, cursive',  fill: '#E85C2F' });
    textsiatka1.stroke = '#000000';
    textsiatka1.strokeThickness = 6;
    textsiatka1.align = 'center';
    textsiatka1.anchor.setTo(0.5, 0.5);

    //jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors = game2.input.keyboard.createCursorKeys();
    cursors2 = game2.input.keyboard.addKeys({ 'Q': Phaser.KeyCode.Q, 'E': Phaser.KeyCode.E, 'W': Phaser.KeyCode.W, 'S': Phaser.KeyCode.S, 'A': Phaser.KeyCode.A, 'D': Phaser.KeyCode.D });
}

function update() { //pętla główna  gry


    player.body.velocity.x  = 0;
    player2.body.velocity.x  = 0;

    if (cursors2.A.isDown) {
        player2.body.velocity.x  = -350;
        player2.animations.play('left');
    }
    else if (cursors2.D.isDown) {
        player2.body.velocity.x  = 350;
        player2.animations.play('right');
    }
    else {
        player2.animations.stop();
        player2.frame = 0;
    }

    if (cursors2.W.isDown && game2.time.now > jumpTimer2 && checkIfCanJump2())
    {
        player2.body.moveUp(400);
        jumpTimer2 = game2.time.now + 750;
    }

    if (cursors2.Q.isDown){
    	flagatryb = true;
    }

    if (cursors2.E.isDown){
    	flagatryb = false;
    }

    if (flagatryb == false){
    	ai();
    }
    else {
    	onevsone();
    }

    if (limit1 == limitog){
        punkty1();
    }

    if (limit2 == limitog){
        punkty2();
    }

    if (flaga1 == true){
        punkty1();
    }

    if (flaga2 == true){
        punkty2();
    }

    if (ball.body.x > 410){
        limit2 = 0;
    }

    if (ball.body.x < 390){
        limit1 = 0;
    }
}

function onevsone () {
	if (cursors.left.isDown) {
	    player.body.velocity.x  = -350;
	    player.animations.play('left');
	}
	else if (cursors.right.isDown) {
	    player.body.velocity.x  = 350;
	    player.animations.play('right');
	}
	else {
	    //player.animations.stop();
	    player.frame = 4;
	}

	if (cursors.up.isDown && game2.time.now > jumpTimer && checkIfCanJump())
	{
	    player.body.moveUp(400);
	    jumpTimer = game2.time.now + 750;
	}
}

function ai () {
	if (ball.body.x-20 > player.body.x && ball.body.x > 400 && ball.body.y < 400){
	    player.body.velocity.x  = 350;
	    player.animations.play('right');  
	}

	if (ball.body.x < 400 || ball.body.y > 400){
	    player.frame = 0; 
	}

	if (ball.body.x+20 < player.body.x && ball.body.x > 400 && ball.body.y < 400){
	    player.body.velocity.x  = -350;
	    player.animations.play('left');  
	}

	if (ball.body.y < 400 && ball.body.y > 200 && ball.body.x > 400 ){
	    if(game2.time.now > jumpTimer && checkIfCanJump()) {
	        player.body.moveUp(400);
	        jumpTimer = game2.time.now + 750; 
	    }
	}  
}

function punkty1 () {
    score += 1;
    scoreText.text = 'Score: ' + score;  
    ball.body.x = 150;
    ball.body.y = 300;
    ball.body.setZeroVelocity();
    ball.body.static = true;
    flaga1 = false;
    limit1 = 0;
}

function punkty2 () {
    score2 += 1;
    scoreText2.text = 'Score: ' + score2;  
    ball.body.x = 650;
    ball.body.y = 300;
    ball.body.setZeroVelocity();
    ball.body.static = true;
    flaga2 = false; 
    limit2 = 0;
}

function checkIfCanJump() {
    var result = false;
    for (var i=0; i < game2.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game2.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis);
            if (c.bodyA === player.body.data)
            {
                d *= -1;
            }
            if (d > 0.5)
            {
                result = true;
            }
        }
    }  
    return result;
}

function checkIfCanJump2() {
    var result = false;
    for (var i=0; i < game2.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game2.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === player2.body.data || c.bodyB === player2.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis2);
            if (c.bodyA === player2.body.data)
            {
                d *= -1;
            }
            if (d > 0.5)
            {
                result = true;
            }
        }
    }  
    return result;
}

function ball_player1Hit (b){ 
    if(b){
        if(b.data.mass == 501){
            ball.body.static = false;
            limit1++;
        }
    }
}

function ball_player2Hit (b){
    if(b){
        if(b.data.mass == 500){
            ball.body.static = false;
            limit2++;
        }
    }
}

function ball_platformaHit (b){
    if(b){
        if(b.data.mass == 1){  
            flaga2 = true;
        }
    }
}

function ball_platforma2Hit (b){
    if(b){
        if(b.data.mass == 1){  
            flaga1 = true;
        }
    }
}
