//my class for spend exp that is a screen
game.ControlScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //my onresetevent function
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('control-screen')), -10); // TODO
     me.game.world.addChild(new (me.Renderable.extend({
            //my init function for text
            init: function() {
                //where text is located
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                //how text is styled
                this.font = new me.Font("impact", 46, "red");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            //my draw function
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Back", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Weapon: ak47", this.pos.x, this.pos.y + 80);
                this.font.draw(renderer.getContext(), "Move Controls: Arrow Keys To Move Space To Jump ", this.pos.x, this.pos.y + 160);
                this.font.draw(renderer.getContext(), "Gun Controls: |A| To Shoot ", this.pos.x, this.pos.y + 240);
                this.font.draw(renderer.getContext(), "Pause: |B| ", this.pos.x, this.pos.y + 320);
            },
            //my update function
            update: function(dt) {
                return true;
            },
            //my new game function
            newGame: function() {
                
                me.input.releasePointerEvent('pointerdown', this);
                //changes game state to MAIN
                me.state.change(me.state.MAIN);
               
            }
        })), 15);
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




