game.shootGun = me.Entity.extend({
    init: function(x, y, settings, facing) {
        this._super(me.Entity, 'init', [x, y, {
                image: "bullet",
                width: 45,
                height: 45,
                spritewidth: "45",
                spriteheight: "45",
                getShape: function() {
                    return (new me.Rect(0, 0, 45, 45)).toPolygon();
                }
            }]);
        this.attack = game.data.bulletDamage;
        this.alwaysUpdate = true;
        this.body.setVelocity(8, 0);
       // this.attack = game.data.enemyCreepAttack;
        this.type = "bullet";
        this.facing - facing;
    },
    update: function(delta) {
        if(this.facing === "left") {
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
    }else {
        this.body.vel.x += this.body.accel.x * me.timer.tick;
    }
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);

        return true;

    },
    
     collideHandler: function(response) {
        if (response.b.type === 'EnemyCreep') {
            this.body.vel.x = 0;
                response.b.loseHealth(this.attack);
                me.game.world.removeChild(this);
            }
        }
});
