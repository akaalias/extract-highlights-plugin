import { Plugin, Notice } from "obsidian"

export default class HighlighExtractor extends Plugin {
	statusBar: HTMLElement

	async onload() {
		this.statusBar = this.addStatusBarItem()

		this.addCommand({
			id: "shortcut-highlights",
			name: "Shortcut for extracting highlights",
			callback: () => this.extractHighlights(),
			hotkeys: [
				{
					modifiers: ["Alt", "Shift"],
					key: "±",
				},
			],
		});
	}

	extractHighlights(): void {

		let activeLeaf: any = this.app.workspace.activeLeaf ?? null

		try {
			if (activeLeaf?.view?.data) {
				let highlights = this.processHighlights(activeLeaf.view.data);
				let saveStatus = this.saveToClipboard(highlights);
				new Notice(saveStatus);
			} else {
				new Notice("No highlights to extract.");
			}
		} catch (e) {
			console.log(e.message)
		}
	}

	processHighlights(data: string): string {
		let re = /==(.*?)==/g;
		let matches = data.match(re);
		var result = "## Highlights\n";

		for (let entry of matches) {
			let removeNewline = entry.replace("\n", "");
			let removeHighlightStart = removeNewline.replace("==", "")
			let removeHighlightEnd = removeHighlightStart.replace("==", "")

			result += " - " + removeHighlightEnd + "\n";
		}

		return result;
	}

	saveToClipboard(data: string): string {
		navigator.clipboard.writeText(data);
		return "Highlights copied to clipboard!";
	}
}
