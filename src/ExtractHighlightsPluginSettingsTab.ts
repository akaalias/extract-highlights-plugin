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
		.setDesc("If set, will add `## Heading` to your clipboard automatically. Leave blank to omit.")
		.addText((text) =>
		  text
			.setPlaceholder("Heading")
			.setValue(this.plugin.settings.headlineText)
			.onChange((value) => {
			  this.plugin.settings.headlineText = value;
			  this.plugin.saveData(this.plugin.settings);
			})
		);
	}
}