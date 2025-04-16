var PI         = Math.PI; // 180º
var TWO_PI     = 2*PI;    // 360º
var QUARTER_PI = PI/4;    //  45º
var HALF_PI    = PI/2;    //  90º

var BACKGROUND_WIDTH  = 1524;
var BACKGROUND_HEIGHT = 1024;
var SCREEN_WIDTH = 256;
var SCREEN_HEIGHT = 256;

var FOV = (60 /360) * TWO_PI;
var HALF_FOV = FOV/2;
var FOCAL_LENGTH = (SCREEN_WIDTH/2)/Math.tan(HALF_FOV);

var GLOBAL_Z_AXIS = 500;
var GLOBAL_X_AXIS = 500;