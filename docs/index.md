# Welcome to the Datapack Hub Dev docs!

This wiki is the starting point to datapacks.

## Introduction

[Datapacks](https://minecraft.fandom.com/wiki/Data_pack) are an official "modding" API for creating modifications to the vanilla game using existing Minecraft features. Datapacks were introduced in [Minecraft 1.13](https://minecraft.fandom.com/wiki/Java_Edition_1.13). Since then, they have continued to get more and more powerful.

## Installation

Installing Datapacks is easy if you know where to install them. Follow these steps below for a rough guide on how to install them.

### Client Installation

There are a few ways to install datapacks on the client

#### Method 1: In-game

1. Go to the "Singleplayer" tab
2. Select/Create the world you want to get the datapack
    - If the world has already been created, click `Edit World > Open World Folder` and continue at step 3 in Method 2
    - If not, continue with Method 1
3. Press "Datapacks"
    - <1.19.4 this is in the "More" tab
    - 1.19.3 and below, TODO: FILL THIS IN
4. Drag in your datapack
    - You can also copy it to the folder, click "Open Pack Folder" to get to the folder
5. Save, create and go! You have now installed your datapack

#### Method 2: Files

1. Go to your file manager
2. Locate your `.minecraft` folder
    - For Windows, this is usually in `%appdata%/.minecraft`. 
    - For MacOS (and maybe Linux), this is usually `~/Library/Application Support/minecraft`
    - If you use MultiMC, PolyMC, Prism Launcher, have your Minecraft `Game Directory` in a different folder or use any other launcher, this may differ.
3. Find the world to install your datapack to
    - The folder is called `saves`
4. Put your datapack file into the `datapacks` folder
5. And your done!

!!! note "Server Installation"
    For Server Installation see [this](#server-installation)

!!! note "World Generation"
    Datapacks that affect world generation (structures, biomes, etc.) will not apply to chunks that have already been generated or to worlds that have already been made

### Server Installation

1. Go to your file manager
2. Locate your world folder
    - If you use Multiverse-Core or other similar plugins/mods on your server, there may be multiple, but the default should be called `world`
3. Find the world to install your datapack to
4. Put your datapack file into the `datapacks` folder
5. And your done!

!!! note "File Manager"
    Some server hosts may not have a dedicated file manager, but usually these hosts will include other ways to install datapacks, ask your support team for information