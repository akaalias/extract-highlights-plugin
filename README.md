## Extract Highlights Plugin

Extracts all highlights from a current note in Obsidian into your clipboard.

This is a very bare-bones implementation of [icebear](https://forum.obsidian.md/u/icebear/summary)'s plugin request on Obsidian Forum https://forum.obsidian.md/t/extract-highlights-from-note/7867

### How it works
This release will copy the highlights delimited by == into your clipboard as a bullet-list. 

The default short-cut is: 

<kbd>SHIFT</kbd> + <kbd>ALT</kbd> + <kbd>=</kbd>

This will extract all highlighted parts in your current note and place it in your clipboard. 

Then, anywhere you want, just paste 

<kbd>Command</kbd> + <kbd>v</kbd> (MacOS) or the equivalent on Windows/Linux

The output is a markdown-block titled "Highlights" with a bullet-list of the highlights.

### Demo

![basic functionality](https://github.com/akaalias/extract-highlights-plugin/blob/master/clipboard-flow.gif?raw=true)

### Backlog

[icebear](https://forum.obsidian.md/u/icebear/summary) ideas

#### UI
- [x] command (<kbd>SHIFT</kbd> + <kbd>ALT</kbd> + <kbd>=</kbd>) which then copies all of the highlighted text either into:
- [ ] click a button which then copies all of the highlighted text either into:

#### Outputs
- [x] my clipboard
- [ ] the top/botton of the note and selected for a next step,
- [ ] a designated area in the note such as {{highlights}}, or
- [ ] a new note

