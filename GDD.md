<p align="center"><b>This Game Design Document is put on hold.</b></p>

# Overview

* Name of the game: **Aye Bucko**
* Genre: **Casual party platformer**
* Platform(s): **Web**
* Dev: [jog1t](https://github.com/jog1t)
* Design: [jog1t](https://github.com/jog1t)
* QA: [jog1t](https://github.com/jog1t), [aweczet](https://github.com/aweczet)

## Project scope

* Budget: none

* Timeline: 

  * 16.03.2021 - 25.04.2021<br>
    Due to personal affairs development was postponed for 5 months.

  * 01.07<br>
    Project has been put on hold.

## Elevator Pitch

Simple and fun 2D platformer, where you and your friends build your path to the most precious pirate reward — the treasure chest.

## Monetization

Game will be free of charge with the option to donate the money.

# Gameplay

This game will be multiplayer only. There would be local (couch) and online multiplayer. At first where would be only mode "Free for all". In future maybe we would add teams (ex: 2 vs 2).

## Inputs

- **Movement**<br>
  UI elements would be on left side of the screen.
  - Right
    - *Right arrow* key on keyboard
    - *D* key on keyboard
    - <u>UI element</u> with *right arrow*
  - Left
    - *Left arrow* key on keyboard
    - *A* key on keyboard
    - <u>UI element</u> with *left arrow*
- **Action**<br>
  UI elements would be on right side of the screen.
  - Jump
    - *Up arrow* key on keyboard
    - *W* key on keyboard
    - <u>UI element</u> with *up arrow*
  - Use / Push
    - *K* key on keyboard
    - *Space* key on keyboard
    - <u>UI element</u> with *proper icon*

## Movement

* Details: Allows the player to move. The player can move only sideways.
* How it works: The player would use *Inputs.Movement.Left* to move left, and *Inputs.Movement.Right* to move right. The player <u>cannot</u> move through walls.

## Jump

* Details: Allows the player to jump.
* How it works: The player would use *Inputs.Action.Jump* to jump upwards.

## Push

* Details: Allows the player to push another player.
* How it works: The player would use *Inputs.Action.Push* to push other player. If player is in range and facing direction of other player, then other player would get pushed (and possibly fell into hole/trap).

## Use

* Details: Allows the player to jump.
* How it works: The player would use *Inputs.Action.Use* to use an object. Example: player would press this button if they want to pick up the *tresure chest*.
  In future maybe we would implement throwing of treasure chest - that would help build up a teamwork.

# Game elements

## Characters

* Clown nose pirate, with customizable:
  * Hat
  * Hat emblem
  * Clown nose
  * Shirt
  * Pants
  * Skin color

## Locations

* Palm Tree Island
  * Palm Bay
  * Beach Creek
  * Crab Cave
  * Gray Mountains

## Maps

### Palm Bay

First map that would be created. Ship would be "parked" in harbor. Player would use platform to get into the beach and further into island. There would be a lot of palm trees on which players would have to jump. Tresure chest would be in highest palm tree.

### Beach Creek

There wouldn't be ship - only a small boat. Players would parkour through beach, sand traps, broken palm trees etc.

### Crab Cave

Just a long cave filled with dangerous crabs. Further player goes the darker it gets. Tresure chest would be only thing that shines in this darkness.

### Gray Mountains

Above Crab Cave there would be place where would be long jumps and hight risks. Almost no trees, only grass and fear of heights.

## Objects

* Treasure Chest <br>Thing you really want to collect.
* Spikes<br>
  Thing you really don't want to step on.

# Assets

## Art + Animation

### [Treasure Hunters by Pixel Frog](https://pixelfrog-assets.itch.io/treasure-hunters)

![Treasure Hunters img](https://trello-attachments.s3.amazonaws.com/5eda79b9fa9bcf7a091d7f49/608bf37494a7bf38b74d5e31/dcdcc47702f4ee0bc90a2e96064cdbae/image.png)

  * Capitan Clown Nose
  * Palm Tree Island
  * Paper UI elements

## Music + Sound

* ?
