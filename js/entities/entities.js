game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spriteidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 32, 64)).toPolygon();


                }
            }]);
        this.type = "PlayerEntity";
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.dead = false;
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.alwaysUpdate = true;
        this.renderable.addAnimation("idle", [69]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

        this.renderable.setCurrentAnimation("idle");

    },
    
    setPlayerTimers: function() {
        this.lastBullet = this.now;
    },
    
    
    update: function(delta) {
        this.now = new Date().getTime();
        if (this.health <= 0) {
            this.dead = true;
        }

        this.checkIfKeyPressesAndMove();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //checks if a key is pressed to move
    checkIfKeyPressesAndMove: function() {
        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        } else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        } else {
            this.body.vel.x = 0;
        }
        if (me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
            this.jump();
        } else if (this.body.vel.y === 0) {
            this.jumping = false;
        }
    },
    moveRight: function() {
        //adds to the position of my x by the velocity defined above in
        //set velocity() and multiplying it by me.timer.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.flipX(true);
        this.facing = "right";
    },
    //if the left key is pressed he moves left
    moveLeft: function() {
        this.facing = "left";
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.flipX(false);
    },
    //if the left key is pressed he moves left
    jump: function() {
        this.jumping = true;
        this.body.vel.y -= this.body.accel.y * me.timer.tick;

    },
    
    shootGun: function() {
        if((this.now-this.lastBullet) >= game.data.bulletTimer * 1000) {
        this.lastBullet = this.now;
            var bullet = me.pool.pull("bullet", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(bullet, 10);
        }
    },
    
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets the current animation to attack and then idle after it is done
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that the next time we start this sequence we 
                //begin from the first animation not wherever we left off
                //when we switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
        //if i am perfectly still then it sets the animation to idle
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            //if the current animation is walk it sets the animation to walk
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    //loses health
    loseHealth: function(damage) {
        this.health = this.health - damage;
        //console.log(this.health);
    },
    //handles collisions with other entities
    collideHandler: function(response) {
        if (response.b.type === 'EnemyCreep') {
            this.collideWithEnemyCreep(response);
        }
    },
    collideWithEnemyCreep: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;

        this.stopMovement(xdif);

        // if (this.checkAttack(xdif, ydif)) {
        //    this.hitCreep(response);
        //}

    },
    stopMovement: function(xdif) {
        if (xdif > 0) {
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    }
});

game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
            }]);

        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        this.attacking = false;

        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();

        this.body.setVelocity(3, 20);

        this.type = "EnemyCreep";

        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.setCurrentAnimation("walk");


    },
    update: function(delta) {
        this.now = new Date().getTime();

        
             if (this.pos.x <= game.data.player.pos.x) {
              this.body.vel.x += this.body.accel.x * me.timer.tick;
              this.flipX(true);
          }else{
                    
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.flipX(false);
                }

me.collision.check(this, true, this.collideHandler.bind(this), true);
        
            
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        
        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - response.b.pos.x;

            this.attacking = true;
            //this.lastAttacking = this, now;


            if (xdif > 0) {
                // this.pos.x = this.pos.x + 1;
                //keeps moving the creep to the right to maintain its position
                this.body.vel.x = 0;
            }
            //checks that it has at least been  1 second before the creep hits something
            if ((this.now - this.lastHit >= 1000 && xdif > 0)) {
                //updates the last hit timer
                this.lastHit = this.now;
                //makes the player call the lose health function and passes a
                //damage of 1
                response.b.loseHealth(game.data.enemyCreepAttack);
            }

        }
    }
});

game.GameManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();

        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();

                //if the player is dead then it removes the player and restarts him
        if (game.data.player.dead) {
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 6000);
            
            return true;
        }

        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 300)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", game.data.player.pos.x + 3000, 6000, {});
            me.game.world.addChild(creepe, 10);
            
        }
        return true;
    }

});