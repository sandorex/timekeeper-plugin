## Timekeeper Obsidian Plugin
Very simple plugin that updates modification time property in the frontmatter

## How Does It Work
Each file should have following properties in [frontmatter](https://help.obsidian.md/Advanced+topics/YAML+front+matter) (you can change the property names in settings)
```
---
ctime: <creation time>
mtime:
---
...
```

And each time you save the file `mtime` is going to be set to current timestamp with format set in settings tab, *ctime has to be set manually for now*

**Do note that the plugin will not add these properties you have to do it yourself, command is provided that shows files which are missing these properties**

![](./images/command.png)

## Installation
### Manual
Download latest plugin archive from [here](https://github.com/sandorex/timekeeper-plugin/releases/latest/download/timekeeper.zip) and extract into `.obsidian/plugin/`
