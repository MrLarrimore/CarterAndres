//my class for my main screen 
game.MainScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //my onresetevent function
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('main-screen')), -10); // TODO
     game.data.option1 = (new (me.Renderable.extend({
            //my init function for text
            init: function() {
                //where text is located
                this._super(me.Renderable, 'init', [490, 240, 300, 50]);
                //how text is styled
                this.font = new me.Font("impact", 46, "yellowgreen");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            //my draw function
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Play?", this.pos.x, this.pos.y);
            },
            //my update function
            update: function(dt) {
                return true;
            },
            //my new game function
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', game.data.option2);
                me.input.releasePointerEvent('pointerdown', this);
                //changes game state to PLAY
                me.state.change(me.state.PLAY);
               
            }
        })));
        
        me.game.world.addChild(game.data.option1, 6);

        game.data.option2 = new (me.Renderable.extend({
            //init function for text
            init: function() {
                //where text is located
                this._super(me.Renderable, 'init', [320, 340, 200, 50]);
                //how my text is styled
                this.font = new me.Font("impact", 46, "green");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            //my draw function
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Weapons and Controls", this.pos.x, this.pos.y);
            },
            //my update function
            update: function(dt) {
                return true;
            },
            //my new game function
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', game.data.option1);
                me.input.releasePointerEvent('pointerdown', this);
                //changes game state to LOAD
                me.state.change(me.state.CON);

            }
        }));

        me.game.world.addChild(game.data.option2, 10);
        //subscribing to event
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
       
        });



    },
    
    
    /**	
     *  action to perform when leaving this screen (state change)
     */
    //my on destroy event function
    onDestroyEvent: function() {
        
    }
});

