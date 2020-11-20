## Extract Highlights Plugin

Extracts all highlights from a current note in Obsidian into your clipboard. 

Based on [icebear](https://forum.obsidian.md/u/icebear/summary)'s plugin request on Obsidian Forum https://forum.obsidian.md/t/extract-highlights-from-note/7867

Are you using Extract Highlights? I'd love to hear from you! Questions, suggestions, issues use the forum at https://forum.obsidian.md/t/extract-highlights-plugin/8763/12

### How it works
This plugin will copy the highlights delimited by `==`, `**` and `<mark></mark>` into your clipboard as a bullet-list. 

Optionally you can...

* Customize the heading text of the list, include the note-title or hide it all-together
* Customize the highlights by adding footnotes to each that link back to the source-file 

### Demo

![basic functionality](https://github.com/akaalias/extract-highlights-plugin/blob/master/clipboard-flow.gif?raw=true)

#### Using the Hotkey

The default hotkey is: 

<kbd>SHIFT</kbd> + <kbd>ALT</kbd> + <kbd>=</kbd>

#### Using the Ribbon Button

There is also a button (a circle-shape) that's added to your left-side ribbon. 

#### Using the Command Palette
I looked into it and there’s a bug the way clipboard works with the Command Palette. Basically everything but the “Paste” doesn’t work.

But I’ve found a temporary work-around. It’s weird but it works.

1. Trigger Command Palette (Command-P)
2. Find “Extract Highlights”
3. Hit Enter (You should see a notification (“Highlights copied to clipboard!”)
4. Workaround: At this point, briefly switch to a different note and back (This materialises the clipboard data for pasting)
5. Paste works now the same as with the Hotkey and Button-press

#### Pasting highlights from your clipboard

Clicking on it will also extract all highlighted parts in your current note and place it in your clipboard.

This will extract all highlighted parts in your current note and place it in your clipboard. 

Then, anywhere you want, just paste 

<kbd>Command</kbd> + <kbd>v</kbd> (MacOS) or the equivalent on Windows/Linux

The output is a markdown-block titled "Highlights" with a bullet-list of the highlights.


### Backlog
#### UI
- [x] command (<kbd>SHIFT</kbd> + <kbd>ALT</kbd> + <kbd>=</kbd>) which then copies all of the highlighted text either into:
- [x] click a button which then copies all of the highlighted text either into:
- [x] allow for `<mark></mark>` to be used as highlights
- [x] allow for standard bold (`**`) to be used as highlights
- [x] allow to optionally include or completely exclude `## Highlights` heading
- [x] allow to change text in heading `## My Custom Highlights`
- [x] allow to include note-name in heading such as `## From: $NOTE_TITLE`
- [x] allow to add footnotes for each highlight and include link to source-note

#### Outputs
- [x] my clipboard
- [ ] the top/botton of the note and selected for a next step,
- [ ] a designated area in the note such as {{highlights}}, or
- [ ] a new note

