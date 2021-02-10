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
        containerEl.createEl("h2", { text: "💥 Explode Notes Mode 💥" });
        containerEl.createEl("p", { text: "A secret mode that will take your highlighting to the next level. Only available if you have  'Create Links' and 'Create new File' enabled. After enabling both, close this window and open again to see options." });
        if (this.plugin.settings.createLinks && this.plugin.settings.createNewFile) {
            new obsidian.Setting(containerEl)
                .setName('Explode links into notes')
                .setDesc('If enabled, will turn each highlight into a note with the highlighted text as quote and a backlink to the MOC and source-file. Very powerful but use with caution!')
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
                            console.log("Found existing settings file");
                            this.settings.headlineText = loadedSettings.headlineText;
                            this.settings.addFootnotes = loadedSettings.addFootnotes;
                            this.settings.createLinks = loadedSettings.createLinks;
                            this.settings.autoCapitalize = loadedSettings.autoCapitalize;
                            this.settings.createNewFile = loadedSettings.createNewFile;
                            this.settings.explodeIntoNotes = loadedSettings.explodeIntoNotes;
                            this.settings.openExplodedNotes = loadedSettings.openExplodedNotes;
                        }
                        else {
                            console.log("No settings file found, saving...");
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
            var activeLeaf, name, highlightsText, highlights, baseNames, saveStatus, newBasenameMOC, i, content, newBasename, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        activeLeaf = (_a = this.app.workspace.activeLeaf) !== null && _a !== void 0 ? _a : null;
                        name = activeLeaf === null || activeLeaf === void 0 ? void 0 : activeLeaf.view.file.basename;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 12, , 13]);
                        if (!((_b = activeLeaf === null || activeLeaf === void 0 ? void 0 : activeLeaf.view) === null || _b === void 0 ? void 0 : _b.data)) return [3 /*break*/, 10];
                        highlightsText = this.processHighlights(activeLeaf.view).markdown;
                        highlights = this.processHighlights(activeLeaf.view).highlights;
                        baseNames = this.processHighlights(activeLeaf.view).baseNames;
                        saveStatus = this.saveToClipboard(highlightsText);
                        new obsidian.Notice(saveStatus);
                        newBasenameMOC = "Highlights for " + name + ".md";
                        if (!this.settings.createNewFile) return [3 /*break*/, 4];
                        // Add link back to Original
                        highlightsText += "## Source\n- [[" + name + "]]";
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
                        console.log("Creating file for " + baseNames[i]);
                        content = "";
                        // add highlight as quote
                        content += "## Source\n";
                        content += "> " + highlights[i] + "[^1]";
                        content += "\n\n";
                        content += "[^1]: [[" + name + "]]";
                        content += "\n";
                        console.log(content);
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
                        console.log("File exists already...");
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
        var data = view.data;
        var basename = view.file.basename;
        var matches = data.match(re);
        this.counter += 1;
        var result = "";
        var highlights = [];
        var baseNames = [];
        if (matches != null) {
            if (this.settings.headlineText != "") {
                var text = this.settings.headlineText.replace(/\$NOTE_TITLE/, "" + basename);
                result += "## " + text + "\n";
            }
            for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
                var entry = matches_1[_i];
                var removeNewline = entry.replace(/\n/g, " ");
                var removeHighlightStart = removeNewline.replace(/==/g, "");
                var removeHighlightEnd = removeHighlightStart.replace(/\<mark\>/g, "");
                var removeMarkClosing = removeHighlightEnd.replace(/\<\/mark\>/g, "");
                var removeBold = removeMarkClosing.replace(/\*\*/g, "");
                var removeDoubleSpaces = removeBold.replace("  ", " ");
                removeDoubleSpaces = removeDoubleSpaces.replace("  ", " ");
                removeDoubleSpaces = removeDoubleSpaces.trim();
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
                    result += removeDoubleSpaces;
                    highlights.push(removeDoubleSpaces);
                }
                if (this.settings.addFootnotes) {
                    result += "[^" + this.counter + "]";
                }
                result += "\n";
            }
            if (this.settings.addFootnotes) {
                result += "\n";
                result += "[^" + this.counter + "]: [[" + basename + "]]\n";
            }
            result += "\n";
        }
        return { markdown: result, baseNames: baseNames, highlights: highlights };
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
        var mdView = this.app.workspace.activeLeaf.view;
        var doc = mdView.sourceMode.cmEditor;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzLnRzIiwic3JjL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIudHMiLCJzcmMvVG9nZ2xlSGlnaGxpZ2h0LnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyB7XG4gIHB1YmxpYyBoZWFkbGluZVRleHQ6IHN0cmluZztcbiAgcHVibGljIGFkZEZvb3Rub3RlczogYm9vbGVhbjtcbiAgcHVibGljIHVzZUJvbGRGb3JIaWdobGlnaHRzOiBib29sZWFuO1xuICBwdWJsaWMgY3JlYXRlTGlua3M6IGJvb2xlYW47XG4gIHB1YmxpYyBhdXRvQ2FwaXRhbGl6ZTogYm9vbGVhbjtcbiAgcHVibGljIGNyZWF0ZU5ld0ZpbGU6IGJvb2xlYW47XG4gIHB1YmxpYyBleHBsb2RlSW50b05vdGVzOiBib29sZWFuO1xuICBwdWJsaWMgb3BlbkV4cGxvZGVkTm90ZXM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZWFkbGluZVRleHQgPSBcIlwiO1xuICAgIHRoaXMuYWRkRm9vdG5vdGVzID0gZmFsc2U7XG4gICAgdGhpcy51c2VCb2xkRm9ySGlnaGxpZ2h0cyA9IGZhbHNlO1xuICAgIHRoaXMuY3JlYXRlTGlua3MgPSBmYWxzZTtcbiAgICB0aGlzLmF1dG9DYXBpdGFsaXplID0gZmFsc2U7XG4gICAgdGhpcy5jcmVhdGVOZXdGaWxlID0gZmFsc2U7XG4gICAgdGhpcy5leHBsb2RlSW50b05vdGVzID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuRXhwbG9kZWROb3RlcyA9IGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQge0FwcCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZ30gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpbjtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpbikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7dGV4dDogXCJFeHRyYWN0IEhpZ2hsaWdodHMgUGx1Z2luXCJ9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJIZWFkaW5nIFRleHRcIilcblx0XHRcdC5zZXREZXNjKFwiSWYgc2V0LCB3aWxsIGFkZCBgIyMgWW91ciBUZXh0YC4gVXNlICROT1RFX1RJVExFIHRvIGluY2x1ZGUgdGl0bGUuIExlYXZlIGJsYW5rIHRvIG9taXQuIFwiKVxuXHRcdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0XHRcdHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoXCJIaWdobGlnaHRzIGZvciAkTk9URV9USVRMRVwiKVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkbGluZVRleHQpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGxpbmVUZXh0ID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdVc2UgYm9sZCBmb3IgaGlnaGxpZ2h0cycpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIHdpbGwgaW5jbHVkZSBjbGFzc2ljIG1hcmtkb3duIGJvbGQgKCoqKSBzZWN0aW9ucyBhcyBoaWdobGlnaHRzJyxcblx0XHRcdClcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUJvbGRGb3JIaWdobGlnaHRzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cyA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdFbmFibGUgRm9vdG5vdGVzJylcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCBhZGQgYSBmb290bm90ZSB0byB0aGUgY3VycmVudCBkb2N1bWVudCB0byBlYWNoIGhpZ2hsaWdodCBpbiB5b3VyIGxpc3QuIFVzZWZ1bCB3aGVuIHlvdSB3YW4gdG8ga2VlcCB0cmFjayBvZiB3aGljaCBoaWdobGlnaHQgY2FtZSBmcm9tIHdoaWNoIHNvdXJjZSBmaWxlLicsXG5cdFx0XHQpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hZGRGb290bm90ZXMpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZEZvb3Rub3RlcyA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnQXV0by1jYXBpdGFsaXplIGZpcnN0IGxldHRlcicpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIGNhcGl0YWxpemVzIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCBoaWdobGlnaHQuJyxcblx0XHRcdClcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmF1dG9DYXBpdGFsaXplKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdDcmVhdGUgbGlua3MnKVxuXHRcdFx0LnNldERlc2MoXG5cdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIHR1cm4gZWFjaCBoaWdobGlnaHQgaW50byBhIFtbIGxpbmsgXV0gdG8gY3JlYXRlIGEgaGlnaGxpZ2h0IE1PQycsXG5cdFx0XHQpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVMaW5rcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTGlua3MgPSB2YWx1ZTtcblxuXHRcdFx0XHRcdC8vIGRpc2FibGUgZXhwbG9kZSBub3RlcyBtb2RlXG5cdFx0XHRcdFx0aWYodGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyAmJiB2YWx1ZSA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkV4cGxvZGVkTm90ZXMgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ09wZW4gbmV3IGZpbGUgd2l0aCBoaWdobGlnaHRzJylcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgb3BlbnMgYSBuZXcgZmlsZSB3aXRoIHRoZSBoaWdobGlnaHRzIGNvcGllZCBpbnRvLicsXG5cdFx0XHQpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlID0gdmFsdWU7XG5cblx0XHRcdFx0XHQvLyBkaXNhYmxlIGV4cGxvZGUgbm90ZXMgbW9kZVxuXHRcdFx0XHRcdGlmKHRoaXMucGx1Z2luLnNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXMgJiYgdmFsdWUgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXMgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHt0ZXh0OiBcIvCfkqUgRXhwbG9kZSBOb3RlcyBNb2RlIPCfkqVcIn0pO1xuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwicFwiLCB7dGV4dDogXCJBIHNlY3JldCBtb2RlIHRoYXQgd2lsbCB0YWtlIHlvdXIgaGlnaGxpZ2h0aW5nIHRvIHRoZSBuZXh0IGxldmVsLiBPbmx5IGF2YWlsYWJsZSBpZiB5b3UgaGF2ZSAgJ0NyZWF0ZSBMaW5rcycgYW5kICdDcmVhdGUgbmV3IEZpbGUnIGVuYWJsZWQuIEFmdGVyIGVuYWJsaW5nIGJvdGgsIGNsb3NlIHRoaXMgd2luZG93IGFuZCBvcGVuIGFnYWluIHRvIHNlZSBvcHRpb25zLlwifSk7XG5cblx0XHRpZih0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVMaW5rcyAmJiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlKSB7XG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdFx0LnNldE5hbWUoJ0V4cGxvZGUgbGlua3MgaW50byBub3RlcycpXG5cdFx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIHR1cm4gZWFjaCBoaWdobGlnaHQgaW50byBhIG5vdGUgd2l0aCB0aGUgaGlnaGxpZ2h0ZWQgdGV4dCBhcyBxdW90ZSBhbmQgYSBiYWNrbGluayB0byB0aGUgTU9DIGFuZCBzb3VyY2UtZmlsZS4gVmVyeSBwb3dlcmZ1bCBidXQgdXNlIHdpdGggY2F1dGlvbiEnLFxuXHRcdFx0XHQpXG5cdFx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3Rlcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdCk7XG5cblx0XHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0XHQuc2V0TmFtZSgnT3BlbiBleHBsb2RlZCBub3RlcyBvbiBjcmVhdGlvbicpXG5cdFx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIG9wZW4gZWFjaCBvZiB5b3VyIGV4cGxvZGVkIG5vdGVzIHdoZW4geW91IGNyZWF0ZSB0aGVtLiBGdW4gYW5kIHVzZWZ1bCB0byBjb250aW51ZSB3b3JraW5nIGluIHlvdXIgaGlnaGxpZ2h0LW5vdGVzIHJpZ2h0IGF3YXkhJyxcblx0XHRcdFx0KVxuXHRcdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdCk7XG5cblx0XHR9XG5cblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZUhpZ2hsaWdodCB7XG5cbiAgICB0b2dnbGVIaWdobGlnaHQoczogc3RyaW5nLCBjaD86IG51bWJlcikge1xuICAgICAgICBpZihzID09IFwiXCIpIHJldHVybiBcIlwiO1xuICAgICAgICBpZihzLmluZGV4T2YoXCIuXCIpIDwgMCkgeyByZXR1cm4gXCI9PVwiICsgcyArIFwiPT1cIn1cblxuICAgICAgICBsZXQgbGVmdCA9IHMuc3Vic3RyaW5nKDAsIGNoKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcy5zdWJzdHJpbmcoY2gpO1xuICAgICAgICBsZXQgbWFya2VkID0gbGVmdCArIFwiJENVUlNPUiRcIiArIHJpZ2h0O1xuXG4gICAgICAgIC8vIGh0dHBzOi8vcmVnZXgxMDEuY29tL3IvQlNwdlY2LzdcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU1NTM5MjRcbiAgICAgICAgbGV0IHAgPSBtYXJrZWQubWF0Y2goLyg9PSguKj8pPT0pfFteLiE/XFxzXVteLiE/XSooPzpbLiE/XSg/IVsnXCJdP1xcc3wkKVteLiE/XSopKlsuIT9dP1snXCJdPyg/PVxcc3wkKS9nbSk7XG5cbiAgICAgICAgbGV0IG5wID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgaWYocC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwLmZvckVhY2goZnVuY3Rpb24gKHBhcnQpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcGFydCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnQudHJpbSgpID09IFwiXCIpIHsgIHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnQuaW5jbHVkZXMoXCIkQ1VSU09SJFwiKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwYXJ0LnN0YXJ0c1dpdGgoXCI9PVwiKSAmJiBwYXJ0LmVuZHNXaXRoKFwiPT1cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC5yZXBsYWNlKC89PS9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydCA9IFwiPT1cIiArIHBhcnQgKyBcIj09XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC5yZXBsYWNlKFwiJENVUlNPUiRcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBucC5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbnAuam9pbihcIiBcIik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtQbHVnaW4sIE5vdGljZSwgYWRkSWNvbiwgVmlldywgTWFya2Rvd25WaWV3LCBXb3Jrc3BhY2V9IGZyb20gXCJvYnNpZGlhblwiXG5pbXBvcnQgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyBmcm9tIFwiLi9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzXCJcbmltcG9ydCBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzVGFiIGZyb20gXCIuL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWJcIlxuaW1wb3J0IFRvZ2dsZUhpZ2hsaWdodCBmcm9tIFwiLi9Ub2dnbGVIaWdobGlnaHRcIjtcblxuYWRkSWNvbigndGFyZ2V0JywgJzxwYXRoIGQ9XCJNNTAgODhDMjkuMDEzMiA4OCAxMiA3MC45ODY4IDEyIDUwQzEyIDI5LjAxMzIgMjkuMDEzMiAxMiA1MCAxMkM3MC45ODY4IDEyIDg4IDI5LjAxMzIgODggNTBDODcuOTc2MSA3MC45NzY5IDcwLjk3NjkgODcuOTc2MSA1MCA4OFpNNTAgMjIuODU3MUMzNS4wMDk0IDIyLjg1NzEgMjIuODU3MSAzNS4wMDk0IDIyLjg1NzEgNTBDMjIuODU3MSA2NC45OTA2IDM1LjAwOTQgNzcuMTQyOSA1MCA3Ny4xNDI5QzY0Ljk5MDYgNzcuMTQyOSA3Ny4xNDI5IDY0Ljk5MDYgNzcuMTQyOSA1MEM3Ny4xNDI5IDM1LjAwOTQgNjQuOTkwNiAyMi44NTcxIDUwIDIyLjg1NzFaTTUwIDY2LjI4NTdDNDEuMDA1NiA2Ni4yODU3IDMzLjcxNDMgNTguOTk0MyAzMy43MTQzIDUwQzMzLjcxNDMgNDEuMDA1NiA0MS4wMDU2IDMzLjcxNDMgNTAgMzMuNzE0M0M1OC45OTQzIDMzLjcxNDMgNjYuMjg1NyA0MS4wMDU2IDY2LjI4NTcgNTBDNjYuMjg1NyA1NC4zMTkyIDY0LjU2OTkgNTguNDYxNiA2MS41MTU3IDYxLjUxNTdDNTguNDYxNiA2NC41Njk5IDU0LjMxOTIgNjYuMjg1NyA1MCA2Ni4yODU3WlwiIGZpbGw9XCIjNjQ2NDY0XCIvPicpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuXHRwdWJsaWMgc2V0dGluZ3M6IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3M7XG5cdHB1YmxpYyBzdGF0dXNCYXI6IEhUTUxFbGVtZW50XG5cdHB1YmxpYyBjb3VudGVyOiAwO1xuXHRwcml2YXRlIGVkaXRvcjogQ29kZU1pcnJvci5FZGl0b3I7XG5cblx0YXN5bmMgb25sb2FkKCkge1xuXHRcdHRoaXMuY291bnRlciA9IDA7XG5cdFx0dGhpcy5sb2FkU2V0dGluZ3MoKTtcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuXHRcdHRoaXMuc3RhdHVzQmFyID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKClcblxuXHRcdHRoaXMuYWRkUmliYm9uSWNvbigndGFyZ2V0JywgJ0V4dHJhY3QgSGlnaGxpZ2h0cycsICgpID0+IHtcblx0XHRcdHRoaXMuZXh0cmFjdEhpZ2hsaWdodHMoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogXCJzaG9ydGN1dC1leHRyYWN0LWhpZ2hsaWdodHNcIixcblx0XHRcdG5hbWU6IFwiU2hvcnRjdXQgZm9yIGV4dHJhY3RpbmcgaGlnaGxpZ2h0c1wiLFxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuZXh0cmFjdEhpZ2hsaWdodHMoKSxcblx0XHRcdGhvdGtleXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1vZGlmaWVyczogW1wiQWx0XCIsIFwiU2hpZnRcIl0sXG5cdFx0XHRcdFx0a2V5OiBcIsKxXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0pO1xuXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiBcInNob3J0Y3V0LWhpZ2hsaWdodC1zZW50ZW5jZVwiLFxuXHRcdFx0bmFtZTogXCJTaG9ydGN1dCBmb3IgaGlnaGxpZ2h0aW5nIHNlbnRlbmNlIGN1cnNvciBpcyBpblwiLFxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuY3JlYXRlSGlnaGxpZ2h0KCksXG5cdFx0XHRob3RrZXlzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiLCBcIlNoaWZ0XCJdLFxuXHRcdFx0XHRcdGtleTogXCLigJRcIixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0fSk7XG5cdH1cblxuXHRsb2FkU2V0dGluZ3MoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IG5ldyBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzKCk7XG5cdFx0KGFzeW5jICgpID0+IHtcblx0XHQgIGNvbnN0IGxvYWRlZFNldHRpbmdzID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xuXHRcdCAgaWYgKGxvYWRlZFNldHRpbmdzKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkZvdW5kIGV4aXN0aW5nIHNldHRpbmdzIGZpbGVcIik7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmhlYWRsaW5lVGV4dCA9IGxvYWRlZFNldHRpbmdzLmhlYWRsaW5lVGV4dDtcblx0XHRcdHRoaXMuc2V0dGluZ3MuYWRkRm9vdG5vdGVzID0gbG9hZGVkU2V0dGluZ3MuYWRkRm9vdG5vdGVzO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5jcmVhdGVMaW5rcyA9IGxvYWRlZFNldHRpbmdzLmNyZWF0ZUxpbmtzO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSA9IGxvYWRlZFNldHRpbmdzLmF1dG9DYXBpdGFsaXplO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlID0gbG9hZGVkU2V0dGluZ3MuY3JlYXRlTmV3RmlsZTtcblx0XHRcdHRoaXMuc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyA9IGxvYWRlZFNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXM7XG5cdFx0XHR0aGlzLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gbG9hZGVkU2V0dGluZ3Mub3BlbkV4cGxvZGVkTm90ZXM7XG5cdFx0ICB9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coXCJObyBzZXR0aW5ncyBmaWxlIGZvdW5kLCBzYXZpbmcuLi5cIik7XG5cdFx0XHR0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuXHRcdCAgfVxuXHRcdH0pKCk7XG5cdH1cblxuXHRhc3luYyBleHRyYWN0SGlnaGxpZ2h0cygpIHtcblx0XHRsZXQgYWN0aXZlTGVhZjogYW55ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYgPz8gbnVsbFxuXG5cdFx0bGV0IG5hbWUgPSBhY3RpdmVMZWFmPy52aWV3LmZpbGUuYmFzZW5hbWU7XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKGFjdGl2ZUxlYWY/LnZpZXc/LmRhdGEpIHtcblx0XHRcdFx0bGV0IGhpZ2hsaWdodHNUZXh0ID0gdGhpcy5wcm9jZXNzSGlnaGxpZ2h0cyhhY3RpdmVMZWFmLnZpZXcpLm1hcmtkb3duO1xuXHRcdFx0XHRsZXQgaGlnaGxpZ2h0cyA9IHRoaXMucHJvY2Vzc0hpZ2hsaWdodHMoYWN0aXZlTGVhZi52aWV3KS5oaWdobGlnaHRzO1xuXHRcdFx0XHRsZXQgYmFzZU5hbWVzID0gdGhpcy5wcm9jZXNzSGlnaGxpZ2h0cyhhY3RpdmVMZWFmLnZpZXcpLmJhc2VOYW1lcztcblx0XHRcdFx0bGV0IHNhdmVTdGF0dXMgPSB0aGlzLnNhdmVUb0NsaXBib2FyZChoaWdobGlnaHRzVGV4dCk7XG5cdFx0XHRcdG5ldyBOb3RpY2Uoc2F2ZVN0YXR1cyk7XG5cblx0XHRcdFx0Y29uc3QgbmV3QmFzZW5hbWVNT0MgPSBcIkhpZ2hsaWdodHMgZm9yIFwiICsgbmFtZSArIFwiLm1kXCI7XG5cdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmNyZWF0ZU5ld0ZpbGUpIHtcblx0XHRcdFx0XHQvLyBBZGQgbGluayBiYWNrIHRvIE9yaWdpbmFsXG5cdFx0XHRcdFx0aGlnaGxpZ2h0c1RleHQgKz0gYCMjIFNvdXJjZVxcbi0gW1ske25hbWV9XV1gO1xuXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5zYXZlVG9GaWxlKG5ld0Jhc2VuYW1lTU9DLCBoaWdobGlnaHRzVGV4dCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChuZXdCYXNlbmFtZU1PQywgbmV3QmFzZW5hbWVNT0MsIHRydWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlICYmIHRoaXMuc2V0dGluZ3MuY3JlYXRlTGlua3MgJiYgdGhpcy5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzKSB7XG5cdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGJhc2VOYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJDcmVhdGluZyBmaWxlIGZvciBcIiArIGJhc2VOYW1lc1tpXSk7XG5cdFx0XHRcdFx0XHR2YXIgY29udGVudCA9IFwiXCI7XG5cdFx0XHRcdFx0XHQvLyBhZGQgaGlnaGxpZ2h0IGFzIHF1b3RlXG5cdFx0XHRcdFx0XHRjb250ZW50ICs9IFwiIyMgU291cmNlXFxuXCJcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gYD4gJHtoaWdobGlnaHRzW2ldfVteMV1gO1xuXHRcdFx0XHRcdFx0Y29udGVudCArPSBcIlxcblxcblwiO1xuXHRcdFx0XHRcdFx0Y29udGVudCArPSBgW14xXTogW1ske25hbWV9XV1gO1xuXHRcdFx0XHRcdFx0Y29udGVudCArPSBcIlxcblwiO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coY29udGVudCk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG5ld0Jhc2VuYW1lID0gYmFzZU5hbWVzW2ldICsgXCIubWRcIjtcblxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5zYXZlVG9GaWxlKG5ld0Jhc2VuYW1lLCBjb250ZW50KTtcblxuXHRcdFx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5vcGVuRXhwbG9kZWROb3Rlcykge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcC53b3Jrc3BhY2Uub3BlbkxpbmtUZXh0KG5ld0Jhc2VuYW1lLCBuZXdCYXNlbmFtZSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ldyBOb3RpY2UoXCJObyBoaWdobGlnaHRzIHRvIGV4dHJhY3QuXCIpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKGUubWVzc2FnZSlcblx0XHR9XG5cdH1cblxuXHRhc3luYyBzYXZlVG9GaWxlKGZpbGVQYXRoOiBzdHJpbmcsIG1kU3RyaW5nOiBzdHJpbmcpIHtcblx0XHQvL0lmIGZpbGVzIGV4aXN0cyB0aGVuIGFwcGVuZCBjb250ZW50IHRvIGV4aXN0aW5nIGZpbGVcblx0XHRjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5leGlzdHMoZmlsZVBhdGgpO1xuXHRcdGlmIChmaWxlRXhpc3RzKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkZpbGUgZXhpc3RzIGFscmVhZHkuLi5cIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZShmaWxlUGF0aCwgbWRTdHJpbmcpO1xuXHRcdH1cblx0fVxuXG5cdHByb2Nlc3NIaWdobGlnaHRzKHZpZXc6IGFueSkge1xuXG5cdFx0dmFyIHJlO1xuXG5cdFx0aWYodGhpcy5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cykge1xuXHRcdFx0cmUgPSAvKD09fFxcPG1hcmtcXD58XFwqXFwqKShbXFxzXFxTXSo/KSg9PXxcXDxcXC9tYXJrXFw+fFxcKlxcKikvZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmUgPSAvKD09fFxcPG1hcmtcXD4pKFtcXHNcXFNdKj8pKD09fFxcPFxcL21hcmtcXD4pL2c7XG5cdFx0fVxuXG5cdFx0bGV0IGRhdGEgPSB2aWV3LmRhdGE7XG5cdFx0bGV0IGJhc2VuYW1lID0gdmlldy5maWxlLmJhc2VuYW1lO1xuXHRcdGxldCBtYXRjaGVzID0gZGF0YS5tYXRjaChyZSk7XG5cdFx0dGhpcy5jb3VudGVyICs9IDE7XG5cblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0XHR2YXIgaGlnaGxpZ2h0cyA9IFtdO1xuXHRcdHZhciBiYXNlTmFtZXMgPSBbXTtcblxuXHRcdGlmIChtYXRjaGVzICE9IG51bGwpIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuaGVhZGxpbmVUZXh0ICE9IFwiXCIpIHsgXG5cdFx0XHRcdGxldCB0ZXh0ID0gdGhpcy5zZXR0aW5ncy5oZWFkbGluZVRleHQucmVwbGFjZSgvXFwkTk9URV9USVRMRS8sIGAke2Jhc2VuYW1lfWApXG5cdFx0XHRcdHJlc3VsdCArPSBgIyMgJHt0ZXh0fVxcbmA7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobGV0IGVudHJ5IG9mIG1hdGNoZXMpIHtcblx0XHRcdFx0dmFyIHJlbW92ZU5ld2xpbmUgPSBlbnRyeS5yZXBsYWNlKC9cXG4vZywgXCIgXCIpO1xuXHRcdFx0XHRsZXQgcmVtb3ZlSGlnaGxpZ2h0U3RhcnQgPSByZW1vdmVOZXdsaW5lLnJlcGxhY2UoLz09L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVIaWdobGlnaHRFbmQgPSByZW1vdmVIaWdobGlnaHRTdGFydC5yZXBsYWNlKC9cXDxtYXJrXFw+L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVNYXJrQ2xvc2luZyA9IHJlbW92ZUhpZ2hsaWdodEVuZC5yZXBsYWNlKC9cXDxcXC9tYXJrXFw+L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVCb2xkID0gcmVtb3ZlTWFya0Nsb3NpbmcucmVwbGFjZSgvXFwqXFwqL2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVEb3VibGVTcGFjZXMgPSByZW1vdmVCb2xkLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XG5cblx0XHRcdFx0cmVtb3ZlRG91YmxlU3BhY2VzID0gcmVtb3ZlRG91YmxlU3BhY2VzLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XG5cdFx0XHRcdHJlbW92ZURvdWJsZVNwYWNlcyA9IHJlbW92ZURvdWJsZVNwYWNlcy50cmltKCk7XG5cblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSkge1xuXHRcdFx0XHRcdGlmKHJlbW92ZURvdWJsZVNwYWNlcyAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVEb3VibGVTcGFjZXMgPSB0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlcihyZW1vdmVEb3VibGVTcGFjZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCArPSBcIi0gXCJcblxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNyZWF0ZUxpbmtzKSB7XG5cdFx0XHRcdFx0Ly8gRmlyc3QsIHNhbml0aXplIGhpZ2hsaWdodCB0byBiZSB1c2VkIGFzIGEgZmlsZS1saW5rXG5cdFx0XHRcdFx0Ly8gKiBcIiBcXCAvIHwgPCA+IDogP1xuXHRcdFx0XHRcdGxldCBzYW5pdGl6ZWQgPSByZW1vdmVEb3VibGVTcGFjZXMucmVwbGFjZSgvXFwqfFxcXCJ8XFxcXHxcXC98XFw8fFxcPnxcXDp8XFw/fFxcfC9nbSwgXCJcIik7XG5cdFx0XHRcdFx0c2FuaXRpemVkID0gc2FuaXRpemVkLnRyaW0oKTtcblxuXHRcdFx0XHRcdGxldCBiYXNlTmFtZSA9IHNhbml0aXplZDtcblx0XHRcdFx0XHRpZihiYXNlTmFtZS5sZW5ndGggPiAxMDApIHtcblx0XHRcdFx0XHRcdGJhc2VOYW1lID0gYmFzZU5hbWUuc3Vic3RyKDAsIDk5KTtcblx0XHRcdFx0XHRcdGJhc2VOYW1lICs9IFwiLi4uXCJcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHQgKz0gXCJbW1wiICsgYmFzZU5hbWUgKyBcIl1dXCI7XG5cdFx0XHRcdFx0aGlnaGxpZ2h0cy5wdXNoKHNhbml0aXplZCk7XG5cdFx0XHRcdFx0YmFzZU5hbWVzLnB1c2goYmFzZU5hbWUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCArPSByZW1vdmVEb3VibGVTcGFjZXM7XG5cdFx0XHRcdFx0aGlnaGxpZ2h0cy5wdXNoKHJlbW92ZURvdWJsZVNwYWNlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmFkZEZvb3Rub3Rlcykge1xuXHRcdFx0XHRcdHJlc3VsdCArPSBgW14ke3RoaXMuY291bnRlcn1dYDtcblx0XHRcdFx0fSBcblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcXG5cIjtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hZGRGb290bm90ZXMpIHtcblx0XHRcdFx0cmVzdWx0ICs9IFwiXFxuXCJcblx0XHRcdFx0cmVzdWx0ICs9IGBbXiR7dGhpcy5jb3VudGVyfV06IFtbJHtiYXNlbmFtZX1dXVxcbmBcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0ICs9IFwiXFxuXCI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHttYXJrZG93bjogcmVzdWx0LCBiYXNlTmFtZXM6IGJhc2VOYW1lcywgaGlnaGxpZ2h0czogaGlnaGxpZ2h0c307XG5cdH1cblxuXHRzYXZlVG9DbGlwYm9hcmQoZGF0YTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG5cdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChkYXRhKTtcblx0XHRcdHJldHVybiBcIkhpZ2hsaWdodHMgY29waWVkIHRvIGNsaXBib2FyZCFcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFwiTm8gaGlnaGxpZ2h0cyBmb3VuZFwiO1xuXHRcdH1cblx0fVxuXG5cdGNyZWF0ZUhpZ2hsaWdodCgpIHtcblx0XHRjb25zdCBtZFZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3IGFzIE1hcmtkb3duVmlldztcblx0XHRjb25zdCBkb2MgPSBtZFZpZXcuc291cmNlTW9kZS5jbUVkaXRvcjtcblx0XHR0aGlzLmVkaXRvciA9IGRvYztcblxuXHRcdGNvbnN0IGN1cnNvclBvc2l0aW9uID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yKCk7XG5cdFx0bGV0IGxpbmVUZXh0ID0gdGhpcy5lZGl0b3IuZ2V0TGluZShjdXJzb3JQb3NpdGlvbi5saW5lKTtcblxuXHRcdC8vIHVzZSBvdXIgZmFuY3kgY2xhc3MgdG8gZmlndXJlIHRoaXMgb3V0XG5cdFx0bGV0IHRoID0gbmV3IFRvZ2dsZUhpZ2hsaWdodCgpO1xuXHRcdGxldCByZXN1bHQgPSB0aC50b2dnbGVIaWdobGlnaHQobGluZVRleHQsIGN1cnNvclBvc2l0aW9uLmNoKTtcblxuXHRcdC8vIGNhdGNoIHVwIG9uIGN1cnNvclxuXHRcdGxldCBjdXJzb3JEaWZmZXJlbmNlID0gLTI7XG5cdFx0aWYocmVzdWx0Lmxlbmd0aCA+IGxpbmVUZXh0Lmxlbmd0aCkgeyBjdXJzb3JEaWZmZXJlbmNlID0gMiB9XG5cblx0XHR0aGlzLmVkaXRvci5yZXBsYWNlUmFuZ2UocmVzdWx0LCB7bGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IDB9LCB7bGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IGxpbmVUZXh0Lmxlbmd0aH0pXG5cdFx0dGhpcy5lZGl0b3Iuc2V0Q3Vyc29yKHtsaW5lOiBjdXJzb3JQb3NpdGlvbi5saW5lLCBjaDogY3Vyc29yUG9zaXRpb24uY2ggKyBjdXJzb3JEaWZmZXJlbmNlfSk7XG5cdH1cblxuXG5cdGNhcGl0YWxpemVGaXJzdExldHRlcihzOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6WyJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsImFkZEljb24iLCJOb3RpY2UiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbkYsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCO0FBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUss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
