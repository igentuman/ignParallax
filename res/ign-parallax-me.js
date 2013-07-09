/**
 *
 * Developed by IGENTU
 * 07/09/2013
 * main@igentu.com
 *
 */



var ignParallaxScene = {

// Position Variables
    x: [],
    y: [],
    containerId: 'background',
// Speed - Velocity
    vx: 0,
    vy: 0,
// Acceleration
    ax: 0,
    ay: 0,
    delay: 200,
    layers: [],
    isStarted: true,
    vMultiplier: {x:0.5,y:0.2},
    initScene: function () {
        this.layers = document.getElementsByClassName('layer');
        if (window.DeviceMotionEvent == undefined) {
            console.warn('Not supported');
            setInterval(function(){
                ignParallaxScene.ax = Math.random()*10;
                ignParallaxScene.ay = Math.random()*5;
            },parseInt(Math.random()*50));
            this.bindDeviceMotion();
        } else {
            this.bindDeviceMotion();
        }
    },
    bindDeviceMotion: function() {
        window.ondevicemotion = function (event) {
            console.log(event);
            if(ignParallaxScene.isStarted == false) {
                return;
            }
            ignParallaxScene.ax = event.accelerationIncludingGravity.x;
            ignParallaxScene.ay = event.accelerationIncludingGravity.y;
        }

        setInterval(function () {
            scene = ignParallaxScene;
            if(scene.isStarted == false) {
                return;
            }
            scene.vy = scene.vy - scene.ay;
            scene.vx = scene.vx - scene.ax;
            if (Math.abs(scene.vy) > 0.1 || Math.abs(scene.vx) > 0.1) {
                for (i = 0; i < scene.layers.length; i++) {
                    scene.moveLayer(scene.layers[i],scene.vx,scene.vy,scene.vMultiplier);
                }
            }
            scene.vx = scene.ax;
            scene.vy = scene.ay;

        }, ignParallaxScene.delay);
    },
    //required z-index,top,left,id
    addLayer: function(zIndex,top,left,id){
        layer = document.createElement('div');
        layer.setAttribute('id',id);
        document.getElementById(this.containerId).appendChild(layer);
        layer.style.top = parseInt(top)+'px';
        layer.style.zIndex = zIndex;
        layer.style.left = parseInt(left)+'px';

        layer.className = 'layer';
        predicts = ['','-webkit-','-moz-'];
        for (j = 0; j < predicts.length; j++) {
            layer.style[predicts[j] + 'transition-property'] =  'all';
            layer.style[predicts[j] + 'transition-duration'] =  '0.5s';
        }
        return layer;
    },
    //required top,left,id,image,height,width
    addSprite: function (layer,top,left,id,image,height,width) {
        sprite = document.createElement('div');
        sprite.setAttribute('id',id);
        document.getElementById(layer).appendChild(sprite);
        sprite.style.top = parseInt(top)+'px';
        sprite.style.left = parseInt(left)+'px';
        sprite.style.height = parseInt(height)+'px';
        sprite.style.width = parseInt(width)+'px';
        sprite.style.backgroundImage = 'url(res/images/'+image+')';
        sprite.className = 'sprite';
    },
    removeSprite: function (sprite) {
        sprite.outerHTML = '';
    },
    removeLayer: function (layer) {
        layer.outerHTML = '';
    },
    stopScene: function () {
        this.isStarted = false;
    },
    resumeScene: function () {
        this.isStarted = true;
    },
    moveLayer: function(layer,vx,vy,vMultiplier) {
        if (typeof(layer.y) == 'undefined') {
            layer.y = 0;
        }
        if (typeof(layer.x) == 'undefined') {
            layer.x = 0;
        }
        //Calculate
        layer.y = parseInt(layer.y + vy * layer.style.zIndex / 2 * vMultiplier.y);
        layer.x = parseInt(layer.x + vx * layer.style.zIndex / 2 * vMultiplier.x);

        predicts = ['','-webkit-','-moz-'];
        for (j = 0; j < predicts.length; j++) {
            layer.style[predicts[j] + 'transform'] =  'translate3d(' + layer.x + 'px, ' + layer.y + 'px, 0px)';
        }
    },
    moveSprite: function(sprite,vx,vy,vMultiplier) {
        if (typeof(sprite.y) == 'undefined') {
            sprite.y = 0;
        }
        if (typeof(sprite.x) == 'undefined') {
            sprite.x = 0;
        }
        //Calculate
        sprite.y = parseInt(sprite.y + vy * sprite.style.zIndex / 2 * vMultiplier.y);
        sprite.x = parseInt(sprite.x + vx * sprite.style.zIndex / 2 * vMultiplier.x);

        predicts = ['','-webkit-','-moz-'];
        for (j = 0; j < predicts.length; j++) {
            sprite.style[predicts[j] + 'transform'] =  'translate3d(' + sprite.x + 'px, ' + sprite.y + 'px, 0px)';
        }
    }
}