export default class ExtractHighlightsPluginSettings {
  public headlineText: string;
  public addFootnotes: boolean;
  public useBoldForHighlights: boolean;
  public createLinks: boolean;
  public autoCapitalize: boolean;
  public createNewFile: boolean;
  public explodeIntoNotes: boolean;
  public openExplodedNotes: boolean;
  public createContextualQuotes: boolean;

  constructor() {
    this.headlineText = "";
    this.addFootnotes = false;
    this.useBoldForHighlights = false;
    this.createLinks = false;
    this.autoCapitalize = false;
    this.createNewFile = false;
    this.explodeIntoNotes = false;
    this.openExplodedNotes = false;
    this.createContextualQuotes = false;
  }
}
