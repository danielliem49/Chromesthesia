
##Chromesthesia
by Daniel Liem

![](/assets/startpage.png)
![](/assets/startpage2.jpg)


Link to live: https://danielliem49.github.io/Chromesthesia/




## 1) Background:

Now enjoy life in color!

Chromesthesia is a graphics generator based on a Javascript implementation of 4D simplexnoise. An algorithm randomly generates particles on screen and blesses them with movement and color, allowing for a variety of cool patterns and textures.

Feel free to kick back with a beer, relax, and get hypnotized. When it comes to using this app, there are no rules!




## 2)Implemented Technologies:

-Javascript Canvas
-simplex-noise.js : https://www.npmjs.com/package/simplex-noise




## 3) Basic Functionality

-Click to start/stop

-Control rendering in the options tab in the bottom left. The options can be tinkered with in game, controlling the alrogithm in real-time.

-Select between different reset timer options.

-Select between 3 different preset modes; White Smoke draws purely in white, Black Ink in black, and Monochrome in whatever color the algorithm is randomly generating at the moment.

-Sliders:

1) Color Variety controls the variety of color generating on the screen (setting to 0 will not prevent color change over time. For that option, set to Monochrome)

2) Step Size is pretty much speed.  It controls the "jump" each particle makes between positions.

3) Smoothness is what it sounds like.

4) X and Y bias set the particles to prefer either horizontal or vertical movement.




## 4) Code Description:

One game instance is initialized in index.js, and the game is started/stopped according to either user clicks or the reset function.

When a game instance is started, particles are generated with random initial properties and the animation event loop starts, during which the particles are constantly given pseudorandom movement by the algorithm (in the form of angles) to new positions. 

Meanwhile, the particle's color and transparency are constantly changing, through manipulation of the particles HSLA values.A particle's lifetime lasts until it hits one of the screen edges, upon which it resets with new initial properties. 

Some code snippets:
![](/assets/codeSnippet1.png)
![](/assets/codeSnippet2.png)
![](/assets/codeSnippet3.png)
![](/assets/codeSnippet4.png)
![](/assets/codeSnippet5.png)
![](/assets/codeSnippet6.png)



## 5) Future Implementations and Extra Features:

-Pause and screenshot features?
-Additional modes and presets (Invert mode!)
-More music options
-Extra drawing/interactive features. Maybe a creative/freestyle mode?






