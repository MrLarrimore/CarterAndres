//my spend gold init function
game.SpendGold = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    
    //my update function
    update: function() {
        this.now = new Date().getTime();

        if (me.input.isKeyPressed("buy") && (this.now - this.lastBuy >= 1000)) {
            this.lastBuy = this.now;
            if (!this.buying) {
                this.startBuying();
            } else {
                this.stopBuying();
            }
        }
        //for check buy keys function
        this.checkBuyKeys();

        return true;
    },
    
    //my start buying function
    startBuying: function() {
        this.buying = true;
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        me.state.pause(me.state.PLAY);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
        //binding my keys (F1-F6)
        
        this.addText();
    },
    //my set buy text function
    addText: function() {
    
        
     me.game.world.addChild(new (me.Renderable.extend({
            //my init function for text
            init: function() {
                //where text is located
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                //how text is styled
                this.font = new me.Font("impact", 46, "red");
                this.updateWhenPaused = true;
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            //my draw function
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "", this.pos.x, this.pos.y);
            },
            //my update function
            update: function(dt) {
                return true;
            },
            //my new game function
            newGame: function() {
                
                me.input.releasePointerEvent('pointerdown', this);
                //changes game state to NEW
                me.state.change(me.state.MAIN);
               
            }
        })), 34);
        //subscribing to event
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
       
        });



    },
    // my stop buying function
    stopBuying: function() {
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen, 34);
        
       
    },
    //my check buy keys function
    checkBuyKeys: function() {
        
       
        
    },
    //my check cost function
    checkCost: function(skill) {
      
    },
    //my make purchase function
    makePurchase: function(skill) {
      
       

    }
    
});

