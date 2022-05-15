## Timekeeper Obsidian Plugin
Very simple plugin that updates modification time property in the frontmatter

## How To Use
Add `mtime` (name is configurable) property in frontmatter in every file you want it and this plugin will update it each time you modify the file

**This plugin currently does not add any frontmatter properties but only modify them using regex, beware if you use the set property name anywhere in file as it will be replaced**

## Installation
### Manual
Download latest plugin archive from [here](https://github.com/sandorex/timekeeper-plugin/releases/latest/download/timekeeper.zip) and extract into `.obsidian/plugin/`

Alternatively you can manually download [`main.js`](https://github.com/sandorex/timekeeper-plugin/releases/latest/download/main.js) and [`manifest.json`](https://github.com/sandorex/timekeeper-plugin/releases/latest/download/manifest.json)and copy them into `.obsidian/plugin/timekeeper/`
