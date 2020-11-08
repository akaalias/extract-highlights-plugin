## Extract Highlights Plugin

Extracts all highlights from a current note in Obsidian into your clipboard.

A bare-bones implementation of icebear's plugin request on Obsidian Forum https://forum.obsidian.md/t/extract-highlights-from-note/7867

### How it works
This release will copy the highlights delimited by == into your clipboard as a bullet-list. 

The default short-cut is: 

`SHIFT-ALT-=`

This will extract all highlighted parts in your current note and place it in your clipboard.

Then, anywhere you want, just paste 

`Command-v` (MacOS) or the equivalent on Windows/Linux

The output is a markdown-block titled "Highlights" with a bullet-list of the highlights.

### Demo

![basic functionality](https://github.com/akaalias/extract-highlights-plugin/blob/master/clipboard-flow.gif?raw=true)

