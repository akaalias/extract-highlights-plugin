import { App, PluginSettingTab, Setting } from "obsidian";
import ExtractHighlightsPlugin from "./main";

export default class ExtractHighlightsPluginSettingsTab extends PluginSettingTab {
	private readonly plugin: ExtractHighlightsPlugin;

	constructor(app: App, plugin: ExtractHighlightsPlugin) {
	  super(app, plugin);
	  this.plugin = plugin;
	}
  
	display(): void {
	  const { containerEl } = this;
  
	  containerEl.empty();
  
	  containerEl.createEl("h2", { text: "Extract Highlights Plugin" });
	  
	  new Setting(containerEl)
		.setName("Heading Text")
		.setDesc("If set, will add `## Your Text`. Use $NOTE_TITLE to include title. Leave blank to omit. ")
		.addText((text) =>
		  text
			.setPlaceholder("Highlights for $NOTE_TITLE")
			.setValue(this.plugin.settings.headlineText)
			.onChange((value) => {
			  this.plugin.settings.headlineText = value;
			  this.plugin.saveData(this.plugin.settings);
			})
		);

	new Setting(containerEl)
		.setName('Use bold for highlights')
		.setDesc(
		  'If enabled, will include classic markdown bold (**) sections as highlights',
		)
		.addToggle((toggle) =>
		  toggle.setValue(this.plugin.settings.useBoldForHighlights).onChange((value) => {
			this.plugin.settings.useBoldForHighlights = value;
			this.plugin.saveData(this.plugin.settings);
		  }),
		);

	
	new Setting(containerEl)
		.setName('Enable Footnotes')
		.setDesc(
		  'If enabled, will add a footnote to the current document to each highlight in your list. Useful when you wan to keep track of which highlight came from which source file.',
		)
		.addToggle((toggle) =>
		  toggle.setValue(this.plugin.settings.addFootnotes).onChange((value) => {
			this.plugin.settings.addFootnotes = value;
			this.plugin.saveData(this.plugin.settings);
		  }),
		);
  
	}
}