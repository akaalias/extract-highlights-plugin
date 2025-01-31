'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ExtractHighlightsPluginSettings = /** @class */ (function () {
    function ExtractHighlightsPluginSettings() {
        this.headlineText = "";
        this.addFootnotes = false;
        this.useBoldForHighlights = false;
        this.createLinks = false;
        this.autoCapitalize = false;
        this.createNewFile = false;
        this.explodeIntoNotes = false;
        this.openExplodedNotes = false;
        this.createContextualQuotes = false;
        this.keepHighlightMarks = false;
        this.keepBoldMarks = false;
        this.keepHTMLMarkMarks = false;
    }
    return ExtractHighlightsPluginSettings;
}());

var ExtractHighlightsPluginSettingsTab = /** @class */ (function (_super) {
    __extends(ExtractHighlightsPluginSettingsTab, _super);
    function ExtractHighlightsPluginSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    ExtractHighlightsPluginSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Extract Highlights Plugin" });
        new obsidian.Setting(containerEl)
            .setName("Heading Text")
            .setDesc("If set, will add `## Your Text`. Use $NOTE_TITLE to include title. Leave blank to omit. ")
            .addText(function (text) {
            return text
                .setPlaceholder("Highlights for $NOTE_TITLE")
                .setValue(_this.plugin.settings.headlineText)
                .onChange(function (value) {
                _this.plugin.settings.headlineText = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Use bold for highlights')
            .setDesc('If enabled, will include classic markdown bold (**) sections as highlights')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.useBoldForHighlights).onChange(function (value) {
                _this.plugin.settings.useBoldForHighlights = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Enable Footnotes')
            .setDesc('If enabled, will add a footnote to the current document to each highlight in your list. Useful when you wan to keep track of which highlight came from which source file.')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.addFootnotes).onChange(function (value) {
                _this.plugin.settings.addFootnotes = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Auto-capitalize first letter')
            .setDesc('If enabled, capitalizes the first letter of each highlight.')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.autoCapitalize).onChange(function (value) {
                _this.plugin.settings.autoCapitalize = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Create links')
            .setDesc('If enabled, will turn each highlight into a [[ link ]] to create a highlight MOC')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.createLinks).onChange(function (value) {
                _this.plugin.settings.createLinks = value;
                // disable explode notes mode
                if (_this.plugin.settings.explodeIntoNotes && value == false) {
                    _this.plugin.settings.explodeIntoNotes = false;
                    _this.plugin.settings.openExplodedNotes = false;
                }
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Open new file with highlights')
            .setDesc('If enabled, opens a new file with the highlights copied into.')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.createNewFile).onChange(function (value) {
                _this.plugin.settings.createNewFile = value;
                // disable explode notes mode
                if (_this.plugin.settings.explodeIntoNotes && value == false) {
                    _this.plugin.settings.explodeIntoNotes = false;
                    _this.plugin.settings.openExplodedNotes = false;
                }
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Keep Hightlight Marks (==) in the extracted text')
            .setDesc('If enabled, will keep the highlight marks (==) in the extracted text')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.keepHighlightMarks).onChange(function (value) {
                _this.plugin.settings.keepHighlightMarks = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Keep Bold Marks (**) in the extracted text')
            .setDesc('If enabled, will keep the bold marks (**) in the extracted text')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.keepBoldMarks).onChange(function (value) {
                _this.plugin.settings.keepBoldMarks = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Keep HTML Marks (<mark>) in the extracted text')
            .setDesc('If enabled, will keep the bold marks (<mark>) in the extracted text')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.keepHTMLMarkMarks).onChange(function (value) {
                _this.plugin.settings.keepHTMLMarkMarks = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        containerEl.createEl("h2", { text: "💥 Explode Notes Mode 💥" });
        containerEl.createEl("p", { text: "A secret mode that will take your highlighting to the next level. Only available if you have  'Create Links' and 'Create new File' enabled. After enabling both, close this window and open again to see options." });
        if (this.plugin.settings.createLinks && this.plugin.settings.createNewFile) {
            new obsidian.Setting(containerEl)
                .setName('Explode links into notes')
                .setDesc('If enabled, will turn each highlight into a note with the highlighted text as quote and a backlink to the MOC and source-file. The highlight marks and classic bold marks will also be romoved by force frome the extraction. Very powerful but use with caution!')
                .addToggle(function (toggle) {
                return toggle.setValue(_this.plugin.settings.explodeIntoNotes).onChange(function (value) {
                    _this.plugin.settings.explodeIntoNotes = value;
                    _this.plugin.saveData(_this.plugin.settings);
                });
            });
            new obsidian.Setting(containerEl)
                .setName('Open exploded notes on creation')
                .setDesc('If enabled, will open each of your exploded notes when you create them. Fun and useful to continue working in your highlight-notes right away!')
                .addToggle(function (toggle) {
                return toggle.setValue(_this.plugin.settings.openExplodedNotes).onChange(function (value) {
                    _this.plugin.settings.openExplodedNotes = value;
                    _this.plugin.saveData(_this.plugin.settings);
                });
            });
            new obsidian.Setting(containerEl)
                .setName('Create contextual quotes')
                .setDesc('If enabled, will quote the full line of your highlight, not just the highlight itself. Useful for keeping the context of your highlight.')
                .addToggle(function (toggle) {
                return toggle.setValue(_this.plugin.settings.createContextualQuotes).onChange(function (value) {
                    _this.plugin.settings.createContextualQuotes = value;
                    _this.plugin.saveData(_this.plugin.settings);
                });
            });
        }
    };
    return ExtractHighlightsPluginSettingsTab;
}(obsidian.PluginSettingTab));

var ToggleHighlight = /** @class */ (function () {
    function ToggleHighlight() {
    }
    ToggleHighlight.prototype.toggleHighlight = function (s, ch) {
        if (s == "")
            return "";
        if (s.indexOf(".") < 0) {
            return "==" + s + "==";
        }
        var left = s.substring(0, ch);
        var right = s.substring(ch);
        var marked = left + "$CURSOR$" + right;
        // https://regex101.com/r/BSpvV6/7
        // https://stackoverflow.com/a/5553924
        var p = marked.match(/(==(.*?)==)|[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/gm);
        var np = new Array();
        if (p.length > 0) {
            p.forEach(function (part) {
                if (typeof part !== 'undefined') {
                    if (part.trim() == "") {
                        return;
                    }
                    if (part.includes("$CURSOR$")) {
                        if (part.startsWith("==") && part.endsWith("==")) {
                            part = part.replace(/==/g, "");
                        }
                        else {
                            part = "==" + part + "==";
                        }
                        part = part.replace("$CURSOR$", "");
                        part = part.trim();
                    }
                    part = part.trim();
                    np.push(part);
                }
            });
            return np.join(" ");
        }
    };
    return ToggleHighlight;
}());

obsidian.addIcon('target', '<path d="M50 88C29.0132 88 12 70.9868 12 50C12 29.0132 29.0132 12 50 12C70.9868 12 88 29.0132 88 50C87.9761 70.9769 70.9769 87.9761 50 88ZM50 22.8571C35.0094 22.8571 22.8571 35.0094 22.8571 50C22.8571 64.9906 35.0094 77.1429 50 77.1429C64.9906 77.1429 77.1429 64.9906 77.1429 50C77.1429 35.0094 64.9906 22.8571 50 22.8571ZM50 66.2857C41.0056 66.2857 33.7143 58.9943 33.7143 50C33.7143 41.0056 41.0056 33.7143 50 33.7143C58.9943 33.7143 66.2857 41.0056 66.2857 50C66.2857 54.3192 64.5699 58.4616 61.5157 61.5157C58.4616 64.5699 54.3192 66.2857 50 66.2857Z" fill="#646464"/>');
var ExtractHighlightsPlugin = /** @class */ (function (_super) {
    __extends(ExtractHighlightsPlugin, _super);
    function ExtractHighlightsPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtractHighlightsPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.counter = 0;
                this.loadSettings();
                this.addSettingTab(new ExtractHighlightsPluginSettingsTab(this.app, this));
                this.statusBar = this.addStatusBarItem();
                this.addRibbonIcon('target', 'Extract Highlights', function () {
                    _this.extractHighlights();
                });
                this.addCommand({
                    id: "shortcut-extract-highlights",
                    name: "Shortcut for extracting highlights",
                    callback: function () { return _this.extractHighlights(); },
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
                    callback: function () { return _this.createHighlight(); },
                    hotkeys: [
                        {
                            modifiers: ["Alt", "Shift"],
                            key: "—",
                        },
                    ],
                });
                return [2 /*return*/];
            });
        });
    };
    ExtractHighlightsPlugin.prototype.loadSettings = function () {
        var _this = this;
        this.settings = new ExtractHighlightsPluginSettings();
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var loadedSettings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        loadedSettings = _a.sent();
                        if (loadedSettings) {
                            // console.log("Found existing settings file");
                            this.settings.headlineText = loadedSettings.headlineText;
                            this.settings.addFootnotes = loadedSettings.addFootnotes;
                            this.settings.createLinks = loadedSettings.createLinks;
                            this.settings.autoCapitalize = loadedSettings.autoCapitalize;
                            this.settings.createNewFile = loadedSettings.createNewFile;
                            this.settings.explodeIntoNotes = loadedSettings.explodeIntoNotes;
                            this.settings.openExplodedNotes = loadedSettings.openExplodedNotes;
                            this.settings.createContextualQuotes = loadedSettings.createContextualQuotes;
                            this.settings.keepBoldMarks = loadedSettings.keepBoldMarks;
                            this.settings.keepHTMLMarkMarks = loadedSettings.keepHTMLMarkMarks;
                            this.settings.keepHighlightMarks = loadedSettings.keepHighlightMarks;
                        }
                        else {
                            // console.log("No settings file found, saving...");
                            this.saveData(this.settings);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    ExtractHighlightsPlugin.prototype.extractHighlights = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var activeLeaf, name, processResults, highlightsText, highlights, baseNames, contexts, saveStatus, newBasenameMOC, i, content, newBasename, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        activeLeaf = (_a = this.app.workspace.activeLeaf) !== null && _a !== void 0 ? _a : null;
                        name = activeLeaf === null || activeLeaf === void 0 ? void 0 : activeLeaf.view.file.basename;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 12, , 13]);
                        if (!((_b = activeLeaf === null || activeLeaf === void 0 ? void 0 : activeLeaf.view) === null || _b === void 0 ? void 0 : _b.data)) return [3 /*break*/, 10];
                        processResults = this.processHighlights(activeLeaf.view);
                        highlightsText = processResults.markdown;
                        highlights = processResults.highlights;
                        baseNames = processResults.baseNames;
                        contexts = processResults.contexts;
                        saveStatus = this.saveToClipboard(highlightsText);
                        new obsidian.Notice(saveStatus);
                        newBasenameMOC = "Highlights for " + name + ".md";
                        if (!this.settings.createNewFile) return [3 /*break*/, 4];
                        // Add link back to Original
                        highlightsText += "## Source\n- [[".concat(name, "]]");
                        return [4 /*yield*/, this.saveToFile(newBasenameMOC, highlightsText)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this.app.workspace.openLinkText(newBasenameMOC, newBasenameMOC, true)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!(this.settings.createNewFile && this.settings.createLinks && this.settings.explodeIntoNotes)) return [3 /*break*/, 9];
                        i = 0;
                        _c.label = 5;
                    case 5:
                        if (!(i < baseNames.length)) return [3 /*break*/, 9];
                        content = "";
                        // add highlight as quote
                        content += "## Source\n";
                        if (this.settings.createContextualQuotes) {
                            // context quote
                            content += "> ".concat(contexts[i], "[^1]");
                        }
                        else {
                            // regular highlight quote
                            content += "> ".concat(highlights[i], "[^1]");
                        }
                        content += "\n\n";
                        content += "[^1]: [[".concat(name, "]]");
                        content += "\n";
                        newBasename = baseNames[i] + ".md";
                        return [4 /*yield*/, this.saveToFile(newBasename, content)];
                    case 6:
                        _c.sent();
                        if (!this.settings.openExplodedNotes) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.app.workspace.openLinkText(newBasename, newBasename, true)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        new obsidian.Notice("No highlights to extract.");
                        _c.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        e_1 = _c.sent();
                        console.log(e_1.message);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    ExtractHighlightsPlugin.prototype.saveToFile = function (filePath, mdString) {
        return __awaiter(this, void 0, void 0, function () {
            var fileExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.app.vault.adapter.exists(filePath)];
                    case 1:
                        fileExists = _a.sent();
                        if (!fileExists) return [3 /*break*/, 2];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.app.vault.create(filePath, mdString)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ExtractHighlightsPlugin.prototype.processHighlights = function (view) {
        var re;
        if (this.settings.useBoldForHighlights) {
            re = /(==|\<mark\>|\*\*)([\s\S]*?)(==|\<\/mark\>|\*\*)/g;
        }
        else {
            re = /(==|\<mark\>)([\s\S]*?)(==|\<\/mark\>)/g;
        }
        var markdownText = view.data;
        var basename = view.file.basename;
        var matches = markdownText.match(re);
        this.counter += 1;
        var result = "";
        var highlights = [];
        var baseNames = [];
        var contexts = [];
        var lines = markdownText.split("\n");
        var cleanedLines = [];
        for (var i = 0; i < lines.length; i++) {
            if (!(lines[i] == "")) {
                cleanedLines.push(lines[i]);
            }
        }
        if (matches != null) {
            if (this.settings.headlineText != "") {
                var text = this.settings.headlineText.replace(/\$NOTE_TITLE/, "".concat(basename));
                result += "## ".concat(text, "\n");
            }
            for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
                var entry = matches_1[_i];
                // Keep surrounding paragraph for context
                if (this.settings.createContextualQuotes) {
                    for (var i = 0; i < cleanedLines.length; i++) {
                        var match = cleanedLines[i].match(entry);
                        if (!(match == null) && match.length > 0) {
                            var val = cleanedLines[i];
                            if (!contexts.contains(val)) {
                                contexts.push(val);
                            }
                        }
                    }
                }
                // Clean up highlighting match
                var removeNewline = entry.replace(/\n/g, " ");
                var removeHighlightStart = removeNewline.replace(/==/g, "");
                var removeHighlightEnd = removeHighlightStart.replace(/\<mark\>/g, "");
                var removeMarkClosing = removeHighlightEnd.replace(/\<\/mark\>/g, "");
                var removeBold = removeMarkClosing.replace(/\*\*/g, "");
                var removeDoubleSpaces = removeBold.replace("  ", " ");
                removeDoubleSpaces = removeDoubleSpaces.replace("  ", " ");
                removeDoubleSpaces = removeDoubleSpaces.trim();
                // create a other pipline for the highlight output
                var highlightMarkdownOutput_removeNewline = entry.replace(/\n/g, " ");
                var highlightMarkdownOutput_removeHighlightMark = highlightMarkdownOutput_removeNewline;
                if (this.settings.keepHighlightMarks == false) {
                    highlightMarkdownOutput_removeHighlightMark = highlightMarkdownOutput_removeNewline.replace(/==/g, "");
                }
                var highlightMarkdownOutput_removeMarkStart = highlightMarkdownOutput_removeHighlightMark;
                var highlightMarkdownOutput_removeMarkClosing = highlightMarkdownOutput_removeMarkStart;
                if (this.settings.keepHTMLMarkMarks == false) {
                    highlightMarkdownOutput_removeMarkStart = highlightMarkdownOutput_removeHighlightMark.replace(/\<mark\>/g, "");
                    highlightMarkdownOutput_removeMarkClosing = highlightMarkdownOutput_removeMarkStart.replace(/\<\/mark\>/g, "");
                }
                var highlightMarkdownOutput_removeBold = highlightMarkdownOutput_removeMarkClosing;
                if (this.settings.keepBoldMarks == false) {
                    highlightMarkdownOutput_removeBold = highlightMarkdownOutput_removeMarkClosing.replace(/\*\*/g, "");
                }
                var highlightMarkdownOutput_removeDoubleSpaces = highlightMarkdownOutput_removeBold.replace("  ", " ");
                highlightMarkdownOutput_removeDoubleSpaces = highlightMarkdownOutput_removeBold.replace("  ", " ");
                highlightMarkdownOutput_removeDoubleSpaces = highlightMarkdownOutput_removeDoubleSpaces.trim();
                if (this.settings.autoCapitalize) {
                    if (removeDoubleSpaces != null) {
                        removeDoubleSpaces = this.capitalizeFirstLetter(removeDoubleSpaces);
                    }
                }
                result += "- ";
                if (this.settings.createLinks) {
                    // First, sanitize highlight to be used as a file-link
                    // * " \ / | < > : ?
                    var sanitized = removeDoubleSpaces.replace(/\*|\"|\\|\/|\<|\>|\:|\?|\|/gm, "");
                    sanitized = sanitized.trim();
                    var baseName = sanitized;
                    if (baseName.length > 100) {
                        baseName = baseName.substr(0, 99);
                        baseName += "...";
                    }
                    result += "[[" + baseName + "]]";
                    highlights.push(sanitized);
                    baseNames.push(baseName);
                }
                else {
                    result += highlightMarkdownOutput_removeDoubleSpaces;
                    highlights.push(highlightMarkdownOutput_removeDoubleSpaces);
                }
                if (this.settings.addFootnotes) {
                    result += "[^".concat(this.counter, "]");
                }
                result += "\n";
            }
            if (this.settings.addFootnotes) {
                result += "\n";
                result += "[^".concat(this.counter, "]: [[").concat(basename, "]]\n");
            }
            result += "\n";
        }
        return { markdown: result, baseNames: baseNames, highlights: highlights, contexts: contexts };
    };
    ExtractHighlightsPlugin.prototype.saveToClipboard = function (data) {
        if (data.length > 0) {
            navigator.clipboard.writeText(data);
            return "Highlights copied to clipboard!";
        }
        else {
            return "No highlights found";
        }
    };
    ExtractHighlightsPlugin.prototype.createHighlight = function () {
        //const mdView = this.app.workspace.activeLeaf.view as MarkdownView;
        //const doc = mdView.sourceMode.cmEditor;
        var mdView = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        var doc = mdView.editor;
        this.editor = doc;
        var cursorPosition = this.editor.getCursor();
        var lineText = this.editor.getLine(cursorPosition.line);
        // use our fancy class to figure this out
        var th = new ToggleHighlight();
        var result = th.toggleHighlight(lineText, cursorPosition.ch);
        // catch up on cursor
        var cursorDifference = -2;
        if (result.length > lineText.length) {
            cursorDifference = 2;
        }
        this.editor.replaceRange(result, { line: cursorPosition.line, ch: 0 }, { line: cursorPosition.line, ch: lineText.length });
        this.editor.setCursor({ line: cursorPosition.line, ch: cursorPosition.ch + cursorDifference });
    };
    ExtractHighlightsPlugin.prototype.capitalizeFirstLetter = function (s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };
    return ExtractHighlightsPlugin;
}(obsidian.Plugin));

module.exports = ExtractHighlightsPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzLnRzIiwic3JjL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIudHMiLCJzcmMvVG9nZ2xlSGlnaGxpZ2h0LnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyB7XHJcbiAgcHVibGljIGhlYWRsaW5lVGV4dDogc3RyaW5nO1xyXG4gIHB1YmxpYyBhZGRGb290bm90ZXM6IGJvb2xlYW47XHJcbiAgcHVibGljIHVzZUJvbGRGb3JIaWdobGlnaHRzOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjcmVhdGVMaW5rczogYm9vbGVhbjtcclxuICBwdWJsaWMgYXV0b0NhcGl0YWxpemU6IGJvb2xlYW47XHJcbiAgcHVibGljIGNyZWF0ZU5ld0ZpbGU6IGJvb2xlYW47XHJcbiAgcHVibGljIGV4cGxvZGVJbnRvTm90ZXM6IGJvb2xlYW47XHJcbiAgcHVibGljIG9wZW5FeHBsb2RlZE5vdGVzOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjcmVhdGVDb250ZXh0dWFsUXVvdGVzOiBib29sZWFuO1xyXG4gIHB1YmxpYyBrZWVwSGlnaGxpZ2h0TWFya3M6IGJvb2xlYW47XHJcbiAgcHVibGljIGtlZXBCb2xkTWFya3M6IGJvb2xlYW47XHJcbiAgcHVibGljIGtlZXBIVE1MTWFya01hcmtzOmJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5oZWFkbGluZVRleHQgPSBcIlwiO1xyXG4gICAgdGhpcy5hZGRGb290bm90ZXMgPSBmYWxzZTtcclxuICAgIHRoaXMudXNlQm9sZEZvckhpZ2hsaWdodHMgPSBmYWxzZTtcclxuICAgIHRoaXMuY3JlYXRlTGlua3MgPSBmYWxzZTtcclxuICAgIHRoaXMuYXV0b0NhcGl0YWxpemUgPSBmYWxzZTtcclxuICAgIHRoaXMuY3JlYXRlTmV3RmlsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5leHBsb2RlSW50b05vdGVzID0gZmFsc2U7XHJcbiAgICB0aGlzLm9wZW5FeHBsb2RlZE5vdGVzID0gZmFsc2U7XHJcbiAgICB0aGlzLmNyZWF0ZUNvbnRleHR1YWxRdW90ZXMgPSBmYWxzZTtcclxuICAgIHRoaXMua2VlcEhpZ2hsaWdodE1hcmtzID0gZmFsc2U7XHJcbiAgICB0aGlzLmtlZXBCb2xkTWFya3MgPSBmYWxzZTtcclxuICAgIHRoaXMua2VlcEhUTUxNYXJrTWFya3MgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmd9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5nc1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG5cdHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpbjtcclxuXHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW4pIHtcclxuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcclxuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheSgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7dGV4dDogXCJFeHRyYWN0IEhpZ2hsaWdodHMgUGx1Z2luXCJ9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoXCJIZWFkaW5nIFRleHRcIilcclxuXHRcdFx0LnNldERlc2MoXCJJZiBzZXQsIHdpbGwgYWRkIGAjIyBZb3VyIFRleHRgLiBVc2UgJE5PVEVfVElUTEUgdG8gaW5jbHVkZSB0aXRsZS4gTGVhdmUgYmxhbmsgdG8gb21pdC4gXCIpXHJcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxyXG5cdFx0XHRcdHRleHRcclxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcihcIkhpZ2hsaWdodHMgZm9yICROT1RFX1RJVExFXCIpXHJcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGxpbmVUZXh0KVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkbGluZVRleHQgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1VzZSBib2xkIGZvciBoaWdobGlnaHRzJylcclxuXHRcdFx0LnNldERlc2MoXHJcblx0XHRcdFx0J0lmIGVuYWJsZWQsIHdpbGwgaW5jbHVkZSBjbGFzc2ljIG1hcmtkb3duIGJvbGQgKCoqKSBzZWN0aW9ucyBhcyBoaWdobGlnaHRzJyxcclxuXHRcdFx0KVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XHJcblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUJvbGRGb3JIaWdobGlnaHRzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUJvbGRGb3JIaWdobGlnaHRzID0gdmFsdWU7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdCk7XHJcblxyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnRW5hYmxlIEZvb3Rub3RlcycpXHJcblx0XHRcdC5zZXREZXNjKFxyXG5cdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIGFkZCBhIGZvb3Rub3RlIHRvIHRoZSBjdXJyZW50IGRvY3VtZW50IHRvIGVhY2ggaGlnaGxpZ2h0IGluIHlvdXIgbGlzdC4gVXNlZnVsIHdoZW4geW91IHdhbiB0byBrZWVwIHRyYWNrIG9mIHdoaWNoIGhpZ2hsaWdodCBjYW1lIGZyb20gd2hpY2ggc291cmNlIGZpbGUuJyxcclxuXHRcdFx0KVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XHJcblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZEZvb3Rub3Rlcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hZGRGb290bm90ZXMgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0F1dG8tY2FwaXRhbGl6ZSBmaXJzdCBsZXR0ZXInKVxyXG5cdFx0XHQuc2V0RGVzYyhcclxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgY2FwaXRhbGl6ZXMgdGhlIGZpcnN0IGxldHRlciBvZiBlYWNoIGhpZ2hsaWdodC4nLFxyXG5cdFx0XHQpXHJcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cclxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b0NhcGl0YWxpemUpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b0NhcGl0YWxpemUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0KTtcclxuXHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdDcmVhdGUgbGlua3MnKVxyXG5cdFx0XHQuc2V0RGVzYyhcclxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCB0dXJuIGVhY2ggaGlnaGxpZ2h0IGludG8gYSBbWyBsaW5rIF1dIHRvIGNyZWF0ZSBhIGhpZ2hsaWdodCBNT0MnLFxyXG5cdFx0XHQpXHJcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cclxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTGlua3MpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTGlua3MgPSB2YWx1ZTtcclxuXHJcblx0XHRcdFx0XHQvLyBkaXNhYmxlIGV4cGxvZGUgbm90ZXMgbW9kZVxyXG5cdFx0XHRcdFx0aWYodGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyAmJiB2YWx1ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnT3BlbiBuZXcgZmlsZSB3aXRoIGhpZ2hsaWdodHMnKVxyXG5cdFx0XHQuc2V0RGVzYyhcclxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgb3BlbnMgYSBuZXcgZmlsZSB3aXRoIHRoZSBoaWdobGlnaHRzIGNvcGllZCBpbnRvLicsXHJcblx0XHRcdClcclxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxyXG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmNyZWF0ZU5ld0ZpbGUgPSB2YWx1ZTtcclxuXHJcblx0XHRcdFx0XHQvLyBkaXNhYmxlIGV4cGxvZGUgbm90ZXMgbW9kZVxyXG5cdFx0XHRcdFx0aWYodGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyAmJiB2YWx1ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHQpO1xyXG5cdFx0XHRcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnS2VlcCBIaWdodGxpZ2h0IE1hcmtzICg9PSkgaW4gdGhlIGV4dHJhY3RlZCB0ZXh0JylcclxuXHRcdFx0LnNldERlc2MoXHJcblx0XHRcdFx0J0lmIGVuYWJsZWQsIHdpbGwga2VlcCB0aGUgaGlnaGxpZ2h0IG1hcmtzICg9PSkgaW4gdGhlIGV4dHJhY3RlZCB0ZXh0JyxcclxuXHRcdFx0KVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XHJcblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmtlZXBIaWdobGlnaHRNYXJrcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5rZWVwSGlnaGxpZ2h0TWFya3MgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0KVxyXG5cclxuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdLZWVwIEJvbGQgTWFya3MgKCoqKSBpbiB0aGUgZXh0cmFjdGVkIHRleHQnKVxyXG5cdFx0XHQuc2V0RGVzYyhcclxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCBrZWVwIHRoZSBib2xkIG1hcmtzICgqKikgaW4gdGhlIGV4dHJhY3RlZCB0ZXh0JyxcclxuXHRcdFx0KVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XHJcblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmtlZXBCb2xkTWFya3MpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Mua2VlcEJvbGRNYXJrcyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHQpXHJcblxyXG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0tlZXAgSFRNTCBNYXJrcyAoPG1hcms+KSBpbiB0aGUgZXh0cmFjdGVkIHRleHQnKVxyXG5cdFx0XHQuc2V0RGVzYyhcclxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCBrZWVwIHRoZSBib2xkIG1hcmtzICg8bWFyaz4pIGluIHRoZSBleHRyYWN0ZWQgdGV4dCcsXHJcblx0XHRcdClcclxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxyXG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5rZWVwSFRNTE1hcmtNYXJrcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5rZWVwSFRNTE1hcmtNYXJrcyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHQpXHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7dGV4dDogXCLwn5KlIEV4cGxvZGUgTm90ZXMgTW9kZSDwn5KlXCJ9KTtcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwicFwiLCB7dGV4dDogXCJBIHNlY3JldCBtb2RlIHRoYXQgd2lsbCB0YWtlIHlvdXIgaGlnaGxpZ2h0aW5nIHRvIHRoZSBuZXh0IGxldmVsLiBPbmx5IGF2YWlsYWJsZSBpZiB5b3UgaGF2ZSAgJ0NyZWF0ZSBMaW5rcycgYW5kICdDcmVhdGUgbmV3IEZpbGUnIGVuYWJsZWQuIEFmdGVyIGVuYWJsaW5nIGJvdGgsIGNsb3NlIHRoaXMgd2luZG93IGFuZCBvcGVuIGFnYWluIHRvIHNlZSBvcHRpb25zLlwifSk7XHJcblxyXG5cdFx0aWYodGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTGlua3MgJiYgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTmV3RmlsZSkge1xyXG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0XHQuc2V0TmFtZSgnRXhwbG9kZSBsaW5rcyBpbnRvIG5vdGVzJylcclxuXHRcdFx0XHQuc2V0RGVzYyhcclxuXHRcdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIHR1cm4gZWFjaCBoaWdobGlnaHQgaW50byBhIG5vdGUgd2l0aCB0aGUgaGlnaGxpZ2h0ZWQgdGV4dCBhcyBxdW90ZSBhbmQgYSBiYWNrbGluayB0byB0aGUgTU9DIGFuZCBzb3VyY2UtZmlsZS4gVGhlIGhpZ2hsaWdodCBtYXJrcyBhbmQgY2xhc3NpYyBib2xkIG1hcmtzIHdpbGwgYWxzbyBiZSByb21vdmVkIGJ5IGZvcmNlIGZyb21lIHRoZSBleHRyYWN0aW9uLiBWZXJ5IHBvd2VyZnVsIGJ1dCB1c2Ugd2l0aCBjYXV0aW9uIScsXHJcblx0XHRcdFx0KVxyXG5cdFx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cclxuXHRcdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcblx0XHRcdFx0XHR9KSxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdFx0LnNldE5hbWUoJ09wZW4gZXhwbG9kZWQgbm90ZXMgb24gY3JlYXRpb24nKVxyXG5cdFx0XHRcdC5zZXREZXNjKFxyXG5cdFx0XHRcdFx0J0lmIGVuYWJsZWQsIHdpbGwgb3BlbiBlYWNoIG9mIHlvdXIgZXhwbG9kZWQgbm90ZXMgd2hlbiB5b3UgY3JlYXRlIHRoZW0uIEZ1biBhbmQgdXNlZnVsIHRvIGNvbnRpbnVlIHdvcmtpbmcgaW4geW91ciBoaWdobGlnaHQtbm90ZXMgcmlnaHQgYXdheSEnLFxyXG5cdFx0XHRcdClcclxuXHRcdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XHJcblx0XHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkV4cGxvZGVkTm90ZXMpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRXhwbG9kZWROb3RlcyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcblx0XHRcdFx0XHR9KSxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdFx0LnNldE5hbWUoJ0NyZWF0ZSBjb250ZXh0dWFsIHF1b3RlcycpXHJcblx0XHRcdFx0LnNldERlc2MoXHJcblx0XHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCBxdW90ZSB0aGUgZnVsbCBsaW5lIG9mIHlvdXIgaGlnaGxpZ2h0LCBub3QganVzdCB0aGUgaGlnaGxpZ2h0IGl0c2VsZi4gVXNlZnVsIGZvciBrZWVwaW5nIHRoZSBjb250ZXh0IG9mIHlvdXIgaGlnaGxpZ2h0LicsXHJcblx0XHRcdFx0KVxyXG5cdFx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cclxuXHRcdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVDb250ZXh0dWFsUXVvdGVzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlQ29udGV4dHVhbFF1b3RlcyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcblx0XHRcdFx0XHR9KSxcclxuXHRcdFx0XHQpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlSGlnaGxpZ2h0IHtcclxuXHJcbiAgICB0b2dnbGVIaWdobGlnaHQoczogc3RyaW5nLCBjaD86IG51bWJlcikge1xyXG4gICAgICAgIGlmKHMgPT0gXCJcIikgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgaWYocy5pbmRleE9mKFwiLlwiKSA8IDApIHsgcmV0dXJuIFwiPT1cIiArIHMgKyBcIj09XCJ9XHJcblxyXG4gICAgICAgIGxldCBsZWZ0ID0gcy5zdWJzdHJpbmcoMCwgY2gpO1xyXG4gICAgICAgIGxldCByaWdodCA9IHMuc3Vic3RyaW5nKGNoKTtcclxuICAgICAgICBsZXQgbWFya2VkID0gbGVmdCArIFwiJENVUlNPUiRcIiArIHJpZ2h0O1xyXG5cclxuICAgICAgICAvLyBodHRwczovL3JlZ2V4MTAxLmNvbS9yL0JTcHZWNi83XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU1NTM5MjRcclxuICAgICAgICBsZXQgcCA9IG1hcmtlZC5tYXRjaCgvKD09KC4qPyk9PSl8W14uIT9cXHNdW14uIT9dKig/OlsuIT9dKD8hWydcIl0/XFxzfCQpW14uIT9dKikqWy4hP10/WydcIl0/KD89XFxzfCQpL2dtKTtcclxuXHJcbiAgICAgICAgbGV0IG5wID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgICAgIGlmKHAubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBwLmZvckVhY2goZnVuY3Rpb24gKHBhcnQpIHtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBwYXJ0ICE9PSAndW5kZWZpbmVkJyApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihwYXJ0LnRyaW0oKSA9PSBcIlwiKSB7ICByZXR1cm47IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFydC5pbmNsdWRlcyhcIiRDVVJTT1IkXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwYXJ0LnN0YXJ0c1dpdGgoXCI9PVwiKSAmJiBwYXJ0LmVuZHNXaXRoKFwiPT1cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnQgPSBwYXJ0LnJlcGxhY2UoLz09L2csIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydCA9IFwiPT1cIiArIHBhcnQgKyBcIj09XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnQucmVwbGFjZShcIiRDVVJTT1IkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnQgPSBwYXJ0LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBucC5wdXNoKHBhcnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBucC5qb2luKFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1BsdWdpbiwgTm90aWNlLCBhZGRJY29uLCBWaWV3LCBNYXJrZG93blZpZXcsIFdvcmtzcGFjZSwgTWFya2Rvd25FZGl0VmlldywgRWRpdG9yfSBmcm9tIFwib2JzaWRpYW5cIlxyXG5pbXBvcnQgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyBmcm9tIFwiLi9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzXCJcclxuaW1wb3J0IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIgZnJvbSBcIi4vRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5nc1RhYlwiXHJcbmltcG9ydCBUb2dnbGVIaWdobGlnaHQgZnJvbSBcIi4vVG9nZ2xlSGlnaGxpZ2h0XCI7XHJcblxyXG5hZGRJY29uKCd0YXJnZXQnLCAnPHBhdGggZD1cIk01MCA4OEMyOS4wMTMyIDg4IDEyIDcwLjk4NjggMTIgNTBDMTIgMjkuMDEzMiAyOS4wMTMyIDEyIDUwIDEyQzcwLjk4NjggMTIgODggMjkuMDEzMiA4OCA1MEM4Ny45NzYxIDcwLjk3NjkgNzAuOTc2OSA4Ny45NzYxIDUwIDg4Wk01MCAyMi44NTcxQzM1LjAwOTQgMjIuODU3MSAyMi44NTcxIDM1LjAwOTQgMjIuODU3MSA1MEMyMi44NTcxIDY0Ljk5MDYgMzUuMDA5NCA3Ny4xNDI5IDUwIDc3LjE0MjlDNjQuOTkwNiA3Ny4xNDI5IDc3LjE0MjkgNjQuOTkwNiA3Ny4xNDI5IDUwQzc3LjE0MjkgMzUuMDA5NCA2NC45OTA2IDIyLjg1NzEgNTAgMjIuODU3MVpNNTAgNjYuMjg1N0M0MS4wMDU2IDY2LjI4NTcgMzMuNzE0MyA1OC45OTQzIDMzLjcxNDMgNTBDMzMuNzE0MyA0MS4wMDU2IDQxLjAwNTYgMzMuNzE0MyA1MCAzMy43MTQzQzU4Ljk5NDMgMzMuNzE0MyA2Ni4yODU3IDQxLjAwNTYgNjYuMjg1NyA1MEM2Ni4yODU3IDU0LjMxOTIgNjQuNTY5OSA1OC40NjE2IDYxLjUxNTcgNjEuNTE1N0M1OC40NjE2IDY0LjU2OTkgNTQuMzE5MiA2Ni4yODU3IDUwIDY2LjI4NTdaXCIgZmlsbD1cIiM2NDY0NjRcIi8+JylcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHJcblx0cHVibGljIHNldHRpbmdzOiBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzO1xyXG5cdHB1YmxpYyBzdGF0dXNCYXI6IEhUTUxFbGVtZW50XHJcblx0cHVibGljIGNvdW50ZXI6IDA7XHJcblx0cHJpdmF0ZSBlZGl0b3I6IEVkaXRvcjtcclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0dGhpcy5jb3VudGVyID0gMDtcclxuXHRcdHRoaXMubG9hZFNldHRpbmdzKCk7XHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcblx0XHR0aGlzLnN0YXR1c0JhciA9IHRoaXMuYWRkU3RhdHVzQmFySXRlbSgpXHJcblxyXG5cdFx0dGhpcy5hZGRSaWJib25JY29uKCd0YXJnZXQnLCAnRXh0cmFjdCBIaWdobGlnaHRzJywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmV4dHJhY3RIaWdobGlnaHRzKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJzaG9ydGN1dC1leHRyYWN0LWhpZ2hsaWdodHNcIixcclxuXHRcdFx0bmFtZTogXCJTaG9ydGN1dCBmb3IgZXh0cmFjdGluZyBoaWdobGlnaHRzXCIsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmV4dHJhY3RIaWdobGlnaHRzKCksXHJcblx0XHRcdGhvdGtleXM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiLCBcIlNoaWZ0XCJdLFxyXG5cdFx0XHRcdFx0a2V5OiBcIsKxXCIsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiBcInNob3J0Y3V0LWhpZ2hsaWdodC1zZW50ZW5jZVwiLFxyXG5cdFx0XHRuYW1lOiBcIlNob3J0Y3V0IGZvciBoaWdobGlnaHRpbmcgc2VudGVuY2UgY3Vyc29yIGlzIGluXCIsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmNyZWF0ZUhpZ2hsaWdodCgpLFxyXG5cdFx0XHRob3RrZXlzOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bW9kaWZpZXJzOiBbXCJBbHRcIiwgXCJTaGlmdFwiXSxcclxuXHRcdFx0XHRcdGtleTogXCLigJRcIixcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRdLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRsb2FkU2V0dGluZ3MoKSB7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gbmV3IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3MoKTtcclxuXHRcdChhc3luYyAoKSA9PiB7XHJcblx0XHQgIGNvbnN0IGxvYWRlZFNldHRpbmdzID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xyXG5cdFx0ICBpZiAobG9hZGVkU2V0dGluZ3MpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJGb3VuZCBleGlzdGluZyBzZXR0aW5ncyBmaWxlXCIpO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmhlYWRsaW5lVGV4dCA9IGxvYWRlZFNldHRpbmdzLmhlYWRsaW5lVGV4dDtcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5hZGRGb290bm90ZXMgPSBsb2FkZWRTZXR0aW5ncy5hZGRGb290bm90ZXM7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuY3JlYXRlTGlua3MgPSBsb2FkZWRTZXR0aW5ncy5jcmVhdGVMaW5rcztcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSA9IGxvYWRlZFNldHRpbmdzLmF1dG9DYXBpdGFsaXplO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmNyZWF0ZU5ld0ZpbGUgPSBsb2FkZWRTZXR0aW5ncy5jcmVhdGVOZXdGaWxlO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXMgPSBsb2FkZWRTZXR0aW5ncy5leHBsb2RlSW50b05vdGVzO1xyXG5cdFx0XHR0aGlzLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gbG9hZGVkU2V0dGluZ3Mub3BlbkV4cGxvZGVkTm90ZXM7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuY3JlYXRlQ29udGV4dHVhbFF1b3RlcyA9IGxvYWRlZFNldHRpbmdzLmNyZWF0ZUNvbnRleHR1YWxRdW90ZXM7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3Mua2VlcEJvbGRNYXJrcyA9IGxvYWRlZFNldHRpbmdzLmtlZXBCb2xkTWFya3M7XHJcblx0XHRcdHRoaXMuc2V0dGluZ3Mua2VlcEhUTUxNYXJrTWFya3MgPSBsb2FkZWRTZXR0aW5ncy5rZWVwSFRNTE1hcmtNYXJrcztcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5rZWVwSGlnaGxpZ2h0TWFya3MgPSBsb2FkZWRTZXR0aW5ncy5rZWVwSGlnaGxpZ2h0TWFya3M7XHJcblx0XHQgIH0gZWxzZSB7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiTm8gc2V0dGluZ3MgZmlsZSBmb3VuZCwgc2F2aW5nLi4uXCIpO1xyXG5cdFx0XHR0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdFx0ICB9XHJcblx0XHR9KSgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZXh0cmFjdEhpZ2hsaWdodHMoKSB7XHJcblx0XHRsZXQgYWN0aXZlTGVhZjogYW55ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYgPz8gbnVsbFxyXG5cclxuXHRcdGxldCBuYW1lID0gYWN0aXZlTGVhZj8udmlldy5maWxlLmJhc2VuYW1lO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChhY3RpdmVMZWFmPy52aWV3Py5kYXRhKSB7XHJcblx0XHRcdFx0bGV0IHByb2Nlc3NSZXN1bHRzID0gdGhpcy5wcm9jZXNzSGlnaGxpZ2h0cyhhY3RpdmVMZWFmLnZpZXcpO1xyXG5cdFx0XHRcdGxldCBoaWdobGlnaHRzVGV4dCA9IHByb2Nlc3NSZXN1bHRzLm1hcmtkb3duO1xyXG5cdFx0XHRcdGxldCBoaWdobGlnaHRzID0gcHJvY2Vzc1Jlc3VsdHMuaGlnaGxpZ2h0cztcclxuXHRcdFx0XHRsZXQgYmFzZU5hbWVzID0gcHJvY2Vzc1Jlc3VsdHMuYmFzZU5hbWVzO1xyXG5cdFx0XHRcdGxldCBjb250ZXh0cyA9IHByb2Nlc3NSZXN1bHRzLmNvbnRleHRzO1xyXG5cdFx0XHRcdGxldCBzYXZlU3RhdHVzID0gdGhpcy5zYXZlVG9DbGlwYm9hcmQoaGlnaGxpZ2h0c1RleHQpO1xyXG5cdFx0XHRcdG5ldyBOb3RpY2Uoc2F2ZVN0YXR1cyk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IG5ld0Jhc2VuYW1lTU9DID0gXCJIaWdobGlnaHRzIGZvciBcIiArIG5hbWUgKyBcIi5tZFwiO1xyXG5cdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmNyZWF0ZU5ld0ZpbGUpIHtcclxuXHRcdFx0XHRcdC8vIEFkZCBsaW5rIGJhY2sgdG8gT3JpZ2luYWxcclxuXHRcdFx0XHRcdGhpZ2hsaWdodHNUZXh0ICs9IGAjIyBTb3VyY2VcXG4tIFtbJHtuYW1lfV1dYDtcclxuXHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnNhdmVUb0ZpbGUobmV3QmFzZW5hbWVNT0MsIGhpZ2hsaWdodHNUZXh0KTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQobmV3QmFzZW5hbWVNT0MsIG5ld0Jhc2VuYW1lTU9DLCB0cnVlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY3JlYXRlTmV3RmlsZSAmJiB0aGlzLnNldHRpbmdzLmNyZWF0ZUxpbmtzICYmIHRoaXMuc2V0dGluZ3MuZXhwbG9kZUludG9Ob3Rlcykge1xyXG5cdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGJhc2VOYW1lcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIGZpbGUgZm9yIFwiICsgYmFzZU5hbWVzW2ldKTtcclxuXHRcdFx0XHRcdFx0dmFyIGNvbnRlbnQgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHQvLyBhZGQgaGlnaGxpZ2h0IGFzIHF1b3RlXHJcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gXCIjIyBTb3VyY2VcXG5cIlxyXG5cdFx0XHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNyZWF0ZUNvbnRleHR1YWxRdW90ZXMpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBjb250ZXh0IHF1b3RlXHJcblx0XHRcdFx0XHRcdFx0Y29udGVudCArPSBgPiAke2NvbnRleHRzW2ldfVteMV1gO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdC8vIHJlZ3VsYXIgaGlnaGxpZ2h0IHF1b3RlXHJcblx0XHRcdFx0XHRcdFx0Y29udGVudCArPSBgPiAke2hpZ2hsaWdodHNbaV19W14xXWA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0Y29udGVudCArPSBcIlxcblxcblwiO1xyXG5cdFx0XHRcdFx0XHRjb250ZW50ICs9IGBbXjFdOiBbWyR7bmFtZX1dXWA7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gXCJcXG5cIjtcclxuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coY29udGVudCk7XHJcblxyXG5cdFx0XHRcdFx0XHRjb25zdCBuZXdCYXNlbmFtZSA9IGJhc2VOYW1lc1tpXSArIFwiLm1kXCI7XHJcblxyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnNhdmVUb0ZpbGUobmV3QmFzZW5hbWUsIGNvbnRlbnQpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5vcGVuRXhwbG9kZWROb3Rlcykge1xyXG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQobmV3QmFzZW5hbWUsIG5ld0Jhc2VuYW1lLCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bmV3IE5vdGljZShcIk5vIGhpZ2hsaWdodHMgdG8gZXh0cmFjdC5cIik7XHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coZS5tZXNzYWdlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVRvRmlsZShmaWxlUGF0aDogc3RyaW5nLCBtZFN0cmluZzogc3RyaW5nKSB7XHJcblx0XHQvL0lmIGZpbGVzIGV4aXN0cyB0aGVuIGFwcGVuZCBjb250ZW50IHRvIGV4aXN0aW5nIGZpbGVcclxuXHRcdGNvbnN0IGZpbGVFeGlzdHMgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhmaWxlUGF0aCk7XHJcblx0XHRpZiAoZmlsZUV4aXN0cykge1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIkZpbGUgZXhpc3RzIGFscmVhZHkuLi5cIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGUoZmlsZVBhdGgsIG1kU3RyaW5nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb2Nlc3NIaWdobGlnaHRzKHZpZXc6IGFueSkge1xyXG5cclxuXHRcdHZhciByZTtcclxuXHJcblx0XHRpZih0aGlzLnNldHRpbmdzLnVzZUJvbGRGb3JIaWdobGlnaHRzKSB7XHJcblx0XHRcdHJlID0gLyg9PXxcXDxtYXJrXFw+fFxcKlxcKikoW1xcc1xcU10qPykoPT18XFw8XFwvbWFya1xcPnxcXCpcXCopL2c7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZSA9IC8oPT18XFw8bWFya1xcPikoW1xcc1xcU10qPykoPT18XFw8XFwvbWFya1xcPikvZztcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbWFya2Rvd25UZXh0ID0gdmlldy5kYXRhO1xyXG5cdFx0bGV0IGJhc2VuYW1lID0gdmlldy5maWxlLmJhc2VuYW1lO1xyXG5cdFx0bGV0IG1hdGNoZXMgPSBtYXJrZG93blRleHQubWF0Y2gocmUpO1xyXG5cdFx0dGhpcy5jb3VudGVyICs9IDE7XHJcblxyXG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XHJcblx0XHR2YXIgaGlnaGxpZ2h0cyA9IFtdO1xyXG5cdFx0dmFyIGJhc2VOYW1lcyA9IFtdO1xyXG5cdFx0bGV0IGNvbnRleHRzOiBhbnlbXVtdID0gW107XHJcblx0XHRsZXQgbGluZXMgPSBtYXJrZG93blRleHQuc3BsaXQoXCJcXG5cIik7XHJcblx0XHRsZXQgY2xlYW5lZExpbmVzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmKCEobGluZXNbaV0gPT0gXCJcIikpIHtcclxuXHRcdFx0XHRjbGVhbmVkTGluZXMucHVzaChsaW5lc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAobWF0Y2hlcyAhPSBudWxsKSB7XHJcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuaGVhZGxpbmVUZXh0ICE9IFwiXCIpIHsgXHJcblx0XHRcdFx0bGV0IHRleHQgPSB0aGlzLnNldHRpbmdzLmhlYWRsaW5lVGV4dC5yZXBsYWNlKC9cXCROT1RFX1RJVExFLywgYCR7YmFzZW5hbWV9YClcclxuXHRcdFx0XHRyZXN1bHQgKz0gYCMjICR7dGV4dH1cXG5gO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKGxldCBlbnRyeSBvZiBtYXRjaGVzKSB7XHJcblx0XHRcdFx0Ly8gS2VlcCBzdXJyb3VuZGluZyBwYXJhZ3JhcGggZm9yIGNvbnRleHRcclxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNyZWF0ZUNvbnRleHR1YWxRdW90ZXMpIHtcclxuXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBjbGVhbmVkTGluZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0bGV0IG1hdGNoID0gY2xlYW5lZExpbmVzW2ldLm1hdGNoKGVudHJ5KTtcclxuXHRcdFx0XHRcdFx0aWYoIShtYXRjaCA9PSBudWxsKSAmJiBtYXRjaC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IHZhbCA9IGNsZWFuZWRMaW5lc1tpXTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYoIWNvbnRleHRzLmNvbnRhaW5zKHZhbCkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHRzLnB1c2godmFsKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIENsZWFuIHVwIGhpZ2hsaWdodGluZyBtYXRjaFxyXG5cdFx0XHRcdHZhciByZW1vdmVOZXdsaW5lID0gZW50cnkucmVwbGFjZSgvXFxuL2csIFwiIFwiKTtcclxuXHRcdFx0XHRsZXQgcmVtb3ZlSGlnaGxpZ2h0U3RhcnQgPSByZW1vdmVOZXdsaW5lLnJlcGxhY2UoLz09L2csIFwiXCIpXHJcblx0XHRcdFx0bGV0IHJlbW92ZUhpZ2hsaWdodEVuZCA9IHJlbW92ZUhpZ2hsaWdodFN0YXJ0LnJlcGxhY2UoL1xcPG1hcmtcXD4vZywgXCJcIilcclxuXHRcdFx0XHRsZXQgcmVtb3ZlTWFya0Nsb3NpbmcgPSByZW1vdmVIaWdobGlnaHRFbmQucmVwbGFjZSgvXFw8XFwvbWFya1xcPi9nLCBcIlwiKVxyXG5cdFx0XHRcdGxldCByZW1vdmVCb2xkID0gcmVtb3ZlTWFya0Nsb3NpbmcucmVwbGFjZSgvXFwqXFwqL2csIFwiXCIpXHJcblx0XHRcdFx0bGV0IHJlbW92ZURvdWJsZVNwYWNlcyA9IHJlbW92ZUJvbGQucmVwbGFjZShcIiAgXCIsIFwiIFwiKTtcclxuXHRcdFx0XHRyZW1vdmVEb3VibGVTcGFjZXMgPSByZW1vdmVEb3VibGVTcGFjZXMucmVwbGFjZShcIiAgXCIsIFwiIFwiKTtcclxuXHRcdFx0XHRyZW1vdmVEb3VibGVTcGFjZXMgPSByZW1vdmVEb3VibGVTcGFjZXMudHJpbSgpO1xyXG5cclxuXHRcdFx0XHQvLyBjcmVhdGUgYSBvdGhlciBwaXBsaW5lIGZvciB0aGUgaGlnaGxpZ2h0IG91dHB1dFxyXG5cdFx0XHRcdHZhciBoaWdobGlnaHRNYXJrZG93bk91dHB1dF9yZW1vdmVOZXdsaW5lID0gZW50cnkucmVwbGFjZSgvXFxuL2csIFwiIFwiKTtcclxuXHRcdFx0XHRsZXQgaGlnaGxpZ2h0TWFya2Rvd25PdXRwdXRfcmVtb3ZlSGlnaGxpZ2h0TWFyayA9IGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZU5ld2xpbmU7XHJcblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5rZWVwSGlnaGxpZ2h0TWFya3MgPT0gZmFsc2Upe1xyXG5cdFx0XHRcdFx0aGlnaGxpZ2h0TWFya2Rvd25PdXRwdXRfcmVtb3ZlSGlnaGxpZ2h0TWFyayA9IGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZU5ld2xpbmUucmVwbGFjZSgvPT0vZywgXCJcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBoaWdobGlnaHRNYXJrZG93bk91dHB1dF9yZW1vdmVNYXJrU3RhcnQgPSBoaWdobGlnaHRNYXJrZG93bk91dHB1dF9yZW1vdmVIaWdobGlnaHRNYXJrO1xyXG5cdFx0XHRcdGxldCBoaWdobGlnaHRNYXJrZG93bk91dHB1dF9yZW1vdmVNYXJrQ2xvc2luZyA9IGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZU1hcmtTdGFydDtcclxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmtlZXBIVE1MTWFya01hcmtzID09IGZhbHNlKXtcclxuXHRcdFx0XHRcdGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZU1hcmtTdGFydCA9IGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZUhpZ2hsaWdodE1hcmsucmVwbGFjZSgvXFw8bWFya1xcPi9nLCBcIlwiKVxyXG5cdFx0XHRcdFx0aGlnaGxpZ2h0TWFya2Rvd25PdXRwdXRfcmVtb3ZlTWFya0Nsb3NpbmcgPSBoaWdobGlnaHRNYXJrZG93bk91dHB1dF9yZW1vdmVNYXJrU3RhcnQucmVwbGFjZSgvXFw8XFwvbWFya1xcPi9nLCBcIlwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgaGlnaGxpZ2h0TWFya2Rvd25PdXRwdXRfcmVtb3ZlQm9sZCA9IGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZU1hcmtDbG9zaW5nO1xyXG5cdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3Mua2VlcEJvbGRNYXJrcyA9PSBmYWxzZSl7XHJcblx0XHRcdFx0XHRoaWdobGlnaHRNYXJrZG93bk91dHB1dF9yZW1vdmVCb2xkID0gaGlnaGxpZ2h0TWFya2Rvd25PdXRwdXRfcmVtb3ZlTWFya0Nsb3NpbmcucmVwbGFjZSgvXFwqXFwqL2csIFwiXCIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBoaWdobGlnaHRNYXJrZG93bk91dHB1dF9yZW1vdmVEb3VibGVTcGFjZXMgPSBoaWdobGlnaHRNYXJrZG93bk91dHB1dF9yZW1vdmVCb2xkLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XHJcblx0XHRcdFx0aGlnaGxpZ2h0TWFya2Rvd25PdXRwdXRfcmVtb3ZlRG91YmxlU3BhY2VzID0gaGlnaGxpZ2h0TWFya2Rvd25PdXRwdXRfcmVtb3ZlQm9sZC5yZXBsYWNlKFwiICBcIiwgXCIgXCIpO1xyXG5cdFx0XHRcdGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZURvdWJsZVNwYWNlcyA9IGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZURvdWJsZVNwYWNlcy50cmltKClcclxuXHJcblxyXG5cdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuYXV0b0NhcGl0YWxpemUpIHtcclxuXHRcdFx0XHRcdGlmKHJlbW92ZURvdWJsZVNwYWNlcyAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdHJlbW92ZURvdWJsZVNwYWNlcyA9IHRoaXMuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHJlbW92ZURvdWJsZVNwYWNlcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXN1bHQgKz0gXCItIFwiXHJcblxyXG5cdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY3JlYXRlTGlua3MpIHtcclxuXHRcdFx0XHRcdC8vIEZpcnN0LCBzYW5pdGl6ZSBoaWdobGlnaHQgdG8gYmUgdXNlZCBhcyBhIGZpbGUtbGlua1xyXG5cdFx0XHRcdFx0Ly8gKiBcIiBcXCAvIHwgPCA+IDogP1xyXG5cdFx0XHRcdFx0bGV0IHNhbml0aXplZCA9IHJlbW92ZURvdWJsZVNwYWNlcy5yZXBsYWNlKC9cXCp8XFxcInxcXFxcfFxcL3xcXDx8XFw+fFxcOnxcXD98XFx8L2dtLCBcIlwiKTtcclxuXHRcdFx0XHRcdHNhbml0aXplZCA9IHNhbml0aXplZC50cmltKCk7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGJhc2VOYW1lID0gc2FuaXRpemVkO1xyXG5cdFx0XHRcdFx0aWYoYmFzZU5hbWUubGVuZ3RoID4gMTAwKSB7XHJcblx0XHRcdFx0XHRcdGJhc2VOYW1lID0gYmFzZU5hbWUuc3Vic3RyKDAsIDk5KTtcclxuXHRcdFx0XHRcdFx0YmFzZU5hbWUgKz0gXCIuLi5cIlxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJlc3VsdCArPSBcIltbXCIgKyBiYXNlTmFtZSArIFwiXV1cIjtcclxuXHRcdFx0XHRcdGhpZ2hsaWdodHMucHVzaChzYW5pdGl6ZWQpO1xyXG5cdFx0XHRcdFx0YmFzZU5hbWVzLnB1c2goYmFzZU5hbWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXN1bHQgKz0gaGlnaGxpZ2h0TWFya2Rvd25PdXRwdXRfcmVtb3ZlRG91YmxlU3BhY2VzO1xyXG5cdFx0XHRcdFx0aGlnaGxpZ2h0cy5wdXNoKGhpZ2hsaWdodE1hcmtkb3duT3V0cHV0X3JlbW92ZURvdWJsZVNwYWNlcyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmFkZEZvb3Rub3Rlcykge1xyXG5cdFx0XHRcdFx0cmVzdWx0ICs9IGBbXiR7dGhpcy5jb3VudGVyfV1gO1xyXG5cdFx0XHRcdH0gXHJcblxyXG5cdFx0XHRcdHJlc3VsdCArPSBcIlxcblwiO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmFkZEZvb3Rub3Rlcykge1xyXG5cdFx0XHRcdHJlc3VsdCArPSBcIlxcblwiXHJcblx0XHRcdFx0cmVzdWx0ICs9IGBbXiR7dGhpcy5jb3VudGVyfV06IFtbJHtiYXNlbmFtZX1dXVxcbmBcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVzdWx0ICs9IFwiXFxuXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHttYXJrZG93bjogcmVzdWx0LCBiYXNlTmFtZXM6IGJhc2VOYW1lcywgaGlnaGxpZ2h0czogaGlnaGxpZ2h0cywgY29udGV4dHM6IGNvbnRleHRzfTtcclxuXHR9XHJcblxyXG5cdHNhdmVUb0NsaXBib2FyZChkYXRhOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0aWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChkYXRhKTtcclxuXHRcdFx0cmV0dXJuIFwiSGlnaGxpZ2h0cyBjb3BpZWQgdG8gY2xpcGJvYXJkIVwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIFwiTm8gaGlnaGxpZ2h0cyBmb3VuZFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlSGlnaGxpZ2h0KCkge1xyXG5cdFx0Ly9jb25zdCBtZFZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3IGFzIE1hcmtkb3duVmlldztcclxuXHRcdC8vY29uc3QgZG9jID0gbWRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHRjb25zdCBtZFZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xyXG5cdFx0Y29uc3QgZG9jID0gbWRWaWV3LmVkaXRvcjtcclxuXHRcdHRoaXMuZWRpdG9yID0gZG9jO1xyXG5cclxuXHRcdGNvbnN0IGN1cnNvclBvc2l0aW9uID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yKCk7XHJcblx0XHRsZXQgbGluZVRleHQgPSB0aGlzLmVkaXRvci5nZXRMaW5lKGN1cnNvclBvc2l0aW9uLmxpbmUpO1xyXG5cclxuXHRcdC8vIHVzZSBvdXIgZmFuY3kgY2xhc3MgdG8gZmlndXJlIHRoaXMgb3V0XHJcblx0XHRsZXQgdGggPSBuZXcgVG9nZ2xlSGlnaGxpZ2h0KCk7XHJcblx0XHRsZXQgcmVzdWx0ID0gdGgudG9nZ2xlSGlnaGxpZ2h0KGxpbmVUZXh0LCBjdXJzb3JQb3NpdGlvbi5jaCk7XHJcblxyXG5cdFx0Ly8gY2F0Y2ggdXAgb24gY3Vyc29yXHJcblx0XHRsZXQgY3Vyc29yRGlmZmVyZW5jZSA9IC0yO1xyXG5cdFx0aWYocmVzdWx0Lmxlbmd0aCA+IGxpbmVUZXh0Lmxlbmd0aCkgeyBjdXJzb3JEaWZmZXJlbmNlID0gMiB9XHJcblxyXG5cdFx0dGhpcy5lZGl0b3IucmVwbGFjZVJhbmdlKHJlc3VsdCwge2xpbmU6IGN1cnNvclBvc2l0aW9uLmxpbmUsIGNoOiAwfSwge2xpbmU6IGN1cnNvclBvc2l0aW9uLmxpbmUsIGNoOiBsaW5lVGV4dC5sZW5ndGh9KVxyXG5cdFx0dGhpcy5lZGl0b3Iuc2V0Q3Vyc29yKHtsaW5lOiBjdXJzb3JQb3NpdGlvbi5saW5lLCBjaDogY3Vyc29yUG9zaXRpb24uY2ggKyBjdXJzb3JEaWZmZXJlbmNlfSk7XHJcblx0fVxyXG5cclxuXHJcblx0Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHM6IHN0cmluZykge1xyXG5cdFx0cmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xyXG5cdH1cclxufVxyXG4iXSwibmFtZXMiOlsiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJhZGRJY29uIiwiTm90aWNlIiwiTWFya2Rvd25WaWV3IiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ25GLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FB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
