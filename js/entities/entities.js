game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spriteidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();


                }
            }]);

        this.body.setVelocity(5, 20);

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

        this.renderable.setCurrentAnimation("idle");

    },
    update: function(delta) {
        this.checkIfKeyPressesAndMove();
        this.setAnimation();

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
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
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);

        this.health = 10;
        this.alwaysUpdate = true;

        this.body.setVelocity(3, 20);

        this.type = "EnemyCreep";

        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.setCurrentAnimation("walk");
        

    },
    update: function(delta) {
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        
         me.collision.check(this, true, this.collideHandler.bind(this), true);

        
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        
        return true;
    },
    
     collideHandler: function(response) {
            if (response.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - response.b.pos.x;

            this.attacking = true;
            // this.lastAttacking = this, now;

            //keeps moving the creep to the right to maintain its position
            if (xdif > 0) {
                //keeps moving the creep to the right to maintain its position
                this.pos.x = this.pos.x + 1;
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
    
    update: function(x, y) {
        this.now = new Date().getTime();
        
        if(Math.round(this.now/1000)%10 ===0  && (this.now - this.lastCreep >= 300)) {
                this.lastCreep = this.now;
                var creepe = me.pool.pull("EnemyCreep", game.data.player.pos.x + 3000, 5000, {});
                me.game.world.addChild(creepe, 5);
        }
        return true;
    }
});