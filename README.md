## Timekeeper Obsidian Plugin
Very simple plugin that updates modification time property in frontmatter on modification

## How To Use
Set your time format in settings page and add `mtime` (name is configurable) property in frontmatter in every file you want it and this plugin will update it each time you modify the file

## Caveats
Due the difficulty of adding frontmatter properties without the API the plugin will only modify existing keys but not add them unless requested by enabling `On Create` option which in itself is not perfect

**The API is said to be on it's way so when it comes ill add the functionality**

## Installation
### Manual
Download latest plugin archive from [here](https://github.com/sandorex/timekeeper-plugin/releases/latest/download/timekeeper.zip) and extract into `.obsidian/plugin/`

Alternatively you can manually download [`main.js`](https://github.com/sandorex/timekeeper-plugin/releases/latest/download/main.js) and [`manifest.json`](https://github.com/sandorex/timekeeper-plugin/releases/latest/download/manifest.json)and copy them into `.obsidian/plugin/timekeeper/`
