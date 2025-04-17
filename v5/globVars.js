var PI         = Math.PI; // 180º
var TWO_PI     = 2*PI;    // 360º
var QUARTER_PI = PI/4;    //  45º
var HALF_PI    = PI/2;    //  90º

var BACKGROUND_WIDTH  = 1900;
var BACKGROUND_HEIGHT = 880;
var SCREEN_WIDTH = 256;
var SCREEN_HEIGHT = 256;
var SCREEN_CENTER_X = 300;
var SCREEN_CENTER_Y = 190;

var FOV = (90 /360) * TWO_PI;
var HALF_FOV = FOV/2;
var FOCAL_LENGTH = (SCREEN_WIDTH/2)/Math.tan(HALF_FOV);

var GLOBAL_Z_AXIS = 500;
var GLOBAL_X_AXIS = 500;


var frame_onclick = false; // define se houve o evento "onclick" no frame atual