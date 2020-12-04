export default class ExtractHighlightsPluginSettings {
  public headlineText: string;
  public addFootnotes: boolean;
  public useBoldForHighlights: boolean;
  public createLinks: boolean;
  public autoCapitalize: boolean;

  constructor() {
    this.headlineText = "";
    this.addFootnotes = false;
    this.useBoldForHighlights = false;
    this.createLinks = false;
    this.autoCapitalize = false;
  }
}
