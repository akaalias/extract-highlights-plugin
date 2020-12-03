import {Plugin, Notice, addIcon, View, MarkdownView} from "obsidian"
import ExtractHighlightsPluginSettings from "./ExtractHighlightsPluginSettings"
import ExtractHighlightsPluginSettingsTab from "./ExtractHighlightsPluginSettingsTab"
import {Position} from "codemirror";

addIcon('target', '<path d="M50 88C29.0132 88 12 70.9868 12 50C12 29.0132 29.0132 12 50 12C70.9868 12 88 29.0132 88 50C87.9761 70.9769 70.9769 87.9761 50 88ZM50 22.8571C35.0094 22.8571 22.8571 35.0094 22.8571 50C22.8571 64.9906 35.0094 77.1429 50 77.1429C64.9906 77.1429 77.1429 64.9906 77.1429 50C77.1429 35.0094 64.9906 22.8571 50 22.8571ZM50 66.2857C41.0056 66.2857 33.7143 58.9943 33.7143 50C33.7143 41.0056 41.0056 33.7143 50 33.7143C58.9943 33.7143 66.2857 41.0056 66.2857 50C66.2857 54.3192 64.5699 58.4616 61.5157 61.5157C58.4616 64.5699 54.3192 66.2857 50 66.2857Z" fill="#646464"/>')

export default class ExtractHighlightsPlugin extends Plugin {

	public settings: ExtractHighlightsPluginSettings;
	public statusBar: HTMLElement
	public counter: 0;
	private editor: CodeMirror.Editor;

	async onload() {
		this.counter = 0;
		this.loadSettings();
		this.addSettingTab(new ExtractHighlightsPluginSettingsTab(this.app, this));

		this.statusBar = this.addStatusBarItem()

		this.addRibbonIcon('target', 'Extract Highlights', () => {
			this.extractHighlights();
		});

		this.registerEvent(
			this.app.on('codemirror', (cm: CodeMirror.Editor | MarkdownView) => {
				if ('sourceMode' in cm) {
					this.editor = cm.sourceMode.cmEditor;
				} else {
					this.editor = cm;
				}
			}),
		);

		this.addCommand({
			id: "shortcut-extract-highlights",
			name: "Shortcut for extracting highlights",
			callback: () => this.extractHighlights(),
			hotkeys: [
				{
					modifiers: ["Alt", "Shift"],
					key: "±",
				},
			],
		});

		this.addCommand({
			id: "shortcut-highlight-sentence",
			name: "Shortcut for highlighting sentence cursor is in",
			callback: () => this.toggleLineHighlight(),
			hotkeys: [
				{
					modifiers: ["Alt", "Shift"],
					key: "—",
				},
			],
		});
	}

	loadSettings() {
		this.settings = new ExtractHighlightsPluginSettings();
		(async () => {
		  const loadedSettings = await this.loadData();
		  if (loadedSettings) {
			console.log("Found existing settings file");
			this.settings.headlineText = loadedSettings.headlineText;
			this.settings.addFootnotes = loadedSettings.addFootnotes;
		  } else {
			console.log("No settings file found, saving...");
			this.saveData(this.settings);
		  }
		})();
	}

	extractHighlights(): void {
		let activeLeaf: any = this.app.workspace.activeLeaf ?? null

		try {
			if (activeLeaf?.view?.data) {
				let highlightsText = this.processHighlights(activeLeaf.view);
				let saveStatus = this.saveToClipboard(highlightsText);
				new Notice(saveStatus);
			} else {
				new Notice("No highlights to extract.");
			}
		} catch (e) {
			console.log(e.message)
		}
	}

	toggleHighlight() {
		this.toggleLineHighlight();
		// this.toggleFullLine();
	}

	toggleLineHighlight() {
		const cursorPosition = this.editor.getCursor();
		const ch = cursorPosition.ch;
		const line = cursorPosition.line;
		const lineText = this.editor.getLine(cursorPosition.line);

		const allTextLeftOfCursor = lineText.substr(0, cursorPosition.ch);
		const allTextRightOfCursor = lineText.substr(cursorPosition.ch);


		let periodIndexLeftOfCursor = allTextLeftOfCursor.lastIndexOf(".");

		if(periodIndexLeftOfCursor == -1) { periodIndexLeftOfCursor = 0; }

		let sentenceUntilLeftOfCursor = allTextLeftOfCursor.substr(periodIndexLeftOfCursor, ch - periodIndexLeftOfCursor);

		if(sentenceUntilLeftOfCursor.startsWith(". ")) {
			sentenceUntilLeftOfCursor = sentenceUntilLeftOfCursor.replace(". ", "")
		}

		let periodIndexRightOfCursor = allTextRightOfCursor.indexOf(".");

		if(periodIndexRightOfCursor == -1) {
			periodIndexRightOfCursor = allTextRightOfCursor.length
		}

		let sentenceUntilRightOfCursor = allTextRightOfCursor.substr(0, periodIndexRightOfCursor + 1);
		let currentSentence = sentenceUntilLeftOfCursor + sentenceUntilRightOfCursor;
		let absolutePeriodIndexRightOfCursor = periodIndexRightOfCursor + allTextLeftOfCursor.length;

		currentSentence = "==" + currentSentence + "==";

		let replaceOffset = periodIndexLeftOfCursor;

		if(allTextLeftOfCursor.contains(".")) {
			replaceOffset = periodIndexLeftOfCursor + 2
		}

		this.editor.replaceRange(currentSentence, {line: line, ch: replaceOffset}, {line: line, ch: absolutePeriodIndexRightOfCursor + 1});
		this.editor.setCursor(cursorPosition);
	}

	toggleFullLine() {
		const cursorPosition = this.editor.getCursor();
		let lineText = this.editor.getLine(cursorPosition.line);

		let highlightedLine = "";
		let startPosition: Position;
		let endPosition: Position;

		if(lineText.startsWith("==") && lineText.endsWith("==")) {
			highlightedLine = lineText.replace(/==/g, "");
			startPosition = {line: cursorPosition.line, ch: 0};
			endPosition = {line: cursorPosition.line, ch: highlightedLine.length + 4};
		} else {
			highlightedLine = "==" + lineText + "==";
			startPosition = {line: cursorPosition.line, ch: 0};
			endPosition = {line: cursorPosition.line, ch: highlightedLine.length};
		}

		this.editor.replaceRange(highlightedLine, startPosition, endPosition);
		this.editor.setCursor(cursorPosition);
	}

	processHighlights(view: any): string {

		var re;

		if(this.settings.useBoldForHighlights) {
			re = /(==|\<mark\>|\*\*)([\s\S]*?)(==|\<\/mark\>|\*\*)/g;
		} else {
			re = /(==|\<mark\>)([\s\S]*?)(==|\<\/mark\>)/g;
		}

		let data = view.data;
		let basename = view.file.basename;
		let matches = data.match(re);
		this.counter += 1;

		console.log(matches.length);

		var result = "";

		if (matches != null) {
			if(this.settings.headlineText != "") { 
				let text = this.settings.headlineText.replace(/\$NOTE_TITLE/, `${basename}`)
				result += `## ${text}\n`;
			}

			for (let entry of matches) {
				var removeNewline = entry.replace(/\n/g, " ");
				let removeHighlightStart = removeNewline.replace(/==/g, "")
				let removeHighlightEnd = removeHighlightStart.replace(/\<mark\>/g, "")
				let removeMarkClosing = removeHighlightEnd.replace(/\<\/mark\>/g, "")
				let removeBold = removeMarkClosing.replace(/\*\*/g, "")
				let removeDoubleSpaces = removeBold.replace("  ", " ");

				removeDoubleSpaces = removeDoubleSpaces.replace("  ", " ");
				removeDoubleSpaces = removeDoubleSpaces.trim();

				result += "- " + removeDoubleSpaces

				if(this.settings.addFootnotes) {
					result += `[^${this.counter}]`;
				} 

				result += "\n";
			}

			if(this.settings.addFootnotes) {
				result += "\n"
				result += `[^${this.counter}]: [[${basename}]]\n`
			}

			result += "\n";
		}

		return result;
	}

	saveToClipboard(data: string): string {
		if (data.length > 0) {
			navigator.clipboard.writeText(data);
		
			return "Highlights copied to clipboard!";
		} else {
			return "No highlights found";
		}
	}
}
