# Pictures: Game of the year 2020
## Done by Group 17 as part of the course "Software-Praktikum" at UZH in the spring semester 2021

## Introduction
We created a digital version of the game of the year 2020 called Pictures. 
Pictures can be an ideal online game which provides lighthearted fun. We want to decouple that game from its board game constraints such as having to be on the same table with in a group of 3 to 5 or being limited to the pictures delivered with the board game. 

## Used technologies
### [Unsplash](https://unsplash.com/) API 
to fetch our photos, which provides freely-usable images that need no permission from photographs.

## High -level components

### Building screen - mainly SetTemplate
The building screen contains the central gist of the game. Here this is the part where the players
have to take an active role and recreate the picture that was assigned to them. SetTemplate handles the 
main structure of the building screen, and coordinates the behaviour of the screen depending on the assigned set a user has.
Behaviour means in this case:
 
 * moving objects for drag and drop 
 * rotating objects 
 * sliding between icon cards 
 * simulating a string 

this component sends the screenshot of the creation back to the backend. The screenshot is the used 
in the guessing screen again, where the other players have to make their guesses based on it.

Link: [SetTemplate](src/components/Sets/SetTemplate.js)
 
### Guessing screen
The guessing screen is the second active part of the game. Here the users have to guess what the others
built according to the previously mentioned screenshots. Here the grid with the pictures is shown again and
the screenshots. The players will have to guess which the screenshot corresponds to which picture in the grid.

the guesses are sent to the server and processed there. 

### Score screen

## Launch & deployment

## Illustrations

## Roadmap

## Authors
@dkajin, @jukosta, @lakicv, @olstra, @xinox2000

