//my class for newprofile that is a screen
game.NewScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //my on reset event function
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("register").style.visibility = "visible";


        me.game.world.addChild(new (me.Renderable.extend({
            //my init function for the text
            init: function() {
                //where text is located
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                //how text is styled
                this.font = new me.Font("impact", 26, "orangered");
            },
            //my draw function
            draw: function(renderer) {
                //my text
                this.font.draw(renderer.getContext(), "Pick a user name and password?", this.pos.x, this.pos.y);
            },
            //my update function 
            update: function(dt) {
                return true;
            }
        })));




    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    //my on destroy event function
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("register").style.visibility = "hidden";
    }
});


