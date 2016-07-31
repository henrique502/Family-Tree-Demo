function TreeCanvas(){
    var self = this;
    
    var canvas;
    var canvasEl;
    var context; 
    var connections = [];
    
    this.joint = {};
    this.joint.graph = {};
    this.joint.paper = {};
    this.shapes = {};
    
    /* Canvas Options */
    var canvas;
    var context;
    var requestAnimationFrame;
    var canvas_window = {scale: 1, x: 0, y: 0, width: 0, height: 0};
    var canvas_scroll_size = 0;
    
    this.link = function(source, target){
        
    };
    
    this.scale = function(scale){
        if(scale <= 1 && scale >= 0){
            canvas_window.scale = scale;
            canvasTransform();
        } 
    };
    
    this.scroll = function(x, y){
        canvas_window.x = x;
        canvas_window.x = y;
        canvasTransform();
    };
    
    var canvasTransform = function(){
        canvas.style.transform = "scale(" + canvas_window.scale + "," + canvas_window.scale + ")" +
                "translateX(" + canvas_window.x + ")" +
                "translateY(" + canvas_window.y + ")";
    }
    
    
    var setupCanvasScaleControl = function(){
        scale = document.getElementById("scale");
        scale_mais = document.getElementById("scale-mais");
        scale_menos = document.getElementById("scale-menos");

        scale.addEventListener("change", function(e) {
            e.preventDefault();
            self.scale(parseFloat(e.target.value));
        });
        
        scale_mais.addEventListener("click", function(e) {
            e.preventDefault();
            scale.value = parseFloat(scale.value) + parseFloat(scale.step);
            self.scale(scale.value);
        });
        
        scale_menos.addEventListener("click", function(e) {
            e.preventDefault();
            scale.value = parseFloat(scale.value) - parseFloat(scale.step);
            self.scale(scale.value);
        });
    };
    
    var setupCanvasScaleScroll = function(){
        /* credit: https://github.com/brandonaaron/jquery-getscrollbarwidth/blob/master/jquery.getscrollbarwidth.js */
        var $div = $('<div />')
            .css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 })
            .prependTo('body').append('<div />').find('div')
            .css({ width: '100%', height: 200 });
	canvas_scroll_size = 100 - $div.width();
	$div.parent().remove();
        /* End */

        var container = canvasEl.parents('.canvas-container');
        var width = container.width() - canvas_scroll_size; 
        var height = container.height() - canvas_scroll_size; 
        
        self.joint.graph = new joint.dia.Graph();
        self.joint.paper = new joint.dia.Paper({
            el: canvasEl,
            width: width,
            height: height,
            gridSize: 1,
            model: self.joint.graph,
            perpendicularLinks: true,
            restrictTranslate: true
        });
    };
    
    var setupCanvas = function(){
        canvas = document.getElementById("paper");
        canvasEl = $('#paper');
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        

    };
    
    var setupShapes = function(){

    };
    
    this.init = function(){

        setupShapes();
        setupCanvas();
        setupCanvasScaleControl();
        setupCanvasScaleScroll();
        
    };
};


// Init
var tree = new TreeCanvas();
$(function(){

    tree.init();
    
    var member = function(x, y, rank, name, image, background, textColor) {

        textColor = textColor || "#000";

        var cell = new joint.shapes.org.Member({
            position: { x: x, y: y },
            attrs: {
                '.card': { fill: background, stroke: 'none'},
                  image: { 'xlink:href': 'http://jointjs.com/images/demos/orgchart/'+ image, opacity: 0.7 },
                '.rank': { text: rank, fill: textColor, 'word-spacing': '-5px', 'letter-spacing': 0},
                '.name': { text: name, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
            }
        });
        tree.joint.graph.addCell(cell);
        return cell;
    };

    function link(source, target, breakpoints) {

        var cell = new joint.shapes.org.Arrow({
            source: { id: source.id },
            target: { id: target.id },
            vertices: breakpoints,
            attrs: {
                '.connection': {
                    'fill': 'none',
                    'stroke-linejoin': 'round',
                    'stroke-width': '2',
                    'stroke': '#4b4a67'
                }
            }

        });
        tree.joint.graph.addCell(cell);
        return cell;
    }

    var bart = member(300,70,'CEO', 'Henrique Rieger Schmidt', 'male.png', '#30d0c6');
    var homer = member(90,200,'VP Marketing', 'Homer Simpson', 'male.png', '#7c68fd', '#f1f1f1');
    var marge = member(300,200,'VP Sales', 'Marge Simpson', 'female.png', '#7c68fd', '#f1f1f1');
    var lisa = member(500,200,'VP Production' , 'Lisa Simpson', 'female.png', '#7c68fd', '#f1f1f1');
    var maggie = member(400,350,'Manager', 'Maggie Simpson', 'female.png', '#feb563');
    var lenny = member(190,350,'Manager', 'Lenny Leonard', 'male.png', '#feb563');
    var carl = member(190,500,'Manager', 'Carl Carlson', 'male.png', '#feb563');



    link(bart, marge, [{x: 385, y: 180}]);
    link(bart, homer, [{x: 385, y: 180}, {x: 175, y: 180}]);
    link(bart, lisa, [{x: 385, y: 180}, {x: 585, y: 180}]);
    link(homer, lenny, [{x:175 , y: 380}]);
    link(homer, carl, [{x:175 , y: 530}]);
    link(marge, maggie, [{x:385 , y: 380}]);
});