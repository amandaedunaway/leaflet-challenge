# leaflet-challenge
## Module 15 Challenge: Mapping


### Assignment Outline
This assignment uses the Leaflet library to display recent [earthquake data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) on an interactive map using html, css, and javascript.

Each earthquake's location is represented on the map by a circle. The color of the circle corresponds to the depth of the earthquake, as the color changes from green, to orange, to red. The size of the circle indicates the magnitude of the earthquake. Upon click, the pop-up displays the magnitude, depth, and location of the earthquake.



### File Descriptions
The assignment contains:
- an html file.
- a "static" folder, which houses the css and javascript files. The "logic.js" file contains the majority of the work for the assignment. 
- an .ipynb file, which, for the sake of time, I created so that I could use the .describe function to determine some reasonable ranges for the depth, although ideally in the future, I would determine this in javascript.

### Resources
For this assignment, I received help from two BCS tutors, Reza and Khangwelo, to create the majority of the assignment. I used the [Google Color Picker](https://www.google.com/search?q=google+color+picker&rlz=1C1JZAP_enUS887US887&oq=google+color+picker&gs_lcrp=EgZjaHJvbWUyDAgAEEUYORixAxiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDMwODBqMGo5qAIAsAIB&sourceid=chrome&ie=UTF-8) to find the hex code for each depth range. Finally, I used ChatGPT to figure out that I should edit my CSS file so that the map legend displays properly, with the white padding and color swatches.