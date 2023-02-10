
#Chromesthesia

![](/assets/gif1.gif.sb-0ee26666-VEfZrA);


## 1) Background:
Chromesthesia is a graphics generator based on a Javascript implementation of 4D simplexnoise. An algorithm randomly generates particles on screen and blesses them with movement and color, allowing for a variety of cool patterns and textures.

Feel free to kick back with a beer, relax, and get hypnotized. When it comes to using this app, there are no rules!

## 2)Implemented Technologies:

-Javascript Canvas
-simplex-noise.js : https://www.npmjs.com/package/simplex-noise

## 3) Basic Functionality

![](/assets/optionsScreenshot.png)

-Click to start/stop

-Control rendering in the options tab in the bottom left. The alrogithm can be controlled in real-time, allowing for dynamic and customizable designs

-Select between different reset timer options.

-Select between 3 different preset modes; White Smoke draws purely in white, Black Ink in black, and Monochrome in whatever color the algorithm is randomly generating at the moment.

-Sliders:

1) Color Variety controls the variety of color generating on the screen (setting to 0 will not prevent color change over time. For that option, set to Monochrome)

2) Step Size is pretty much speed.  It controls the "jump" each particle makes between positions.

3) Smoothness is what it sounds like.

4) X and Y bias set the particles to prefer either horizontal or vertical movement.

## 4) Code Description:

Particles are generated with random initial properties at game start. One game instance is initialized in index.js, and the game is started/stopped according to either user clicks or the reset function.

Once a game is started, the animation event loop starts, during which the particles are given pseudorandom movement by the simplexnoise based algorithm (in the form of angles). A particle's lifetime lasts until it hits one of the screen edges, upon which it's reset with new initial properties.


## 5) Future Implementations and Extra Features:

-Pause and screenshot features?
-Additional modes and presets (Invert mode!)
-More music options
-Extra drawing/interactive features. Maybe a creative/freestyle mode?






