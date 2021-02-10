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
                    var sanitized = removeDoubleSpaces.replace(/\*|\"|\\|\/|\<|\>|\:|\?|\|\[\]_/gm, "");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzLnRzIiwic3JjL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIudHMiLCJzcmMvVG9nZ2xlSGlnaGxpZ2h0LnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyB7XG4gIHB1YmxpYyBoZWFkbGluZVRleHQ6IHN0cmluZztcbiAgcHVibGljIGFkZEZvb3Rub3RlczogYm9vbGVhbjtcbiAgcHVibGljIHVzZUJvbGRGb3JIaWdobGlnaHRzOiBib29sZWFuO1xuICBwdWJsaWMgY3JlYXRlTGlua3M6IGJvb2xlYW47XG4gIHB1YmxpYyBhdXRvQ2FwaXRhbGl6ZTogYm9vbGVhbjtcbiAgcHVibGljIGNyZWF0ZU5ld0ZpbGU6IGJvb2xlYW47XG4gIHB1YmxpYyBleHBsb2RlSW50b05vdGVzOiBib29sZWFuO1xuICBwdWJsaWMgb3BlbkV4cGxvZGVkTm90ZXM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZWFkbGluZVRleHQgPSBcIlwiO1xuICAgIHRoaXMuYWRkRm9vdG5vdGVzID0gZmFsc2U7XG4gICAgdGhpcy51c2VCb2xkRm9ySGlnaGxpZ2h0cyA9IGZhbHNlO1xuICAgIHRoaXMuY3JlYXRlTGlua3MgPSBmYWxzZTtcbiAgICB0aGlzLmF1dG9DYXBpdGFsaXplID0gZmFsc2U7XG4gICAgdGhpcy5jcmVhdGVOZXdGaWxlID0gZmFsc2U7XG4gICAgdGhpcy5leHBsb2RlSW50b05vdGVzID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuRXhwbG9kZWROb3RlcyA9IGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQge0FwcCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZ30gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpbjtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpbikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7dGV4dDogXCJFeHRyYWN0IEhpZ2hsaWdodHMgUGx1Z2luXCJ9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJIZWFkaW5nIFRleHRcIilcblx0XHRcdC5zZXREZXNjKFwiSWYgc2V0LCB3aWxsIGFkZCBgIyMgWW91ciBUZXh0YC4gVXNlICROT1RFX1RJVExFIHRvIGluY2x1ZGUgdGl0bGUuIExlYXZlIGJsYW5rIHRvIG9taXQuIFwiKVxuXHRcdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0XHRcdHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoXCJIaWdobGlnaHRzIGZvciAkTk9URV9USVRMRVwiKVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkbGluZVRleHQpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGxpbmVUZXh0ID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdVc2UgYm9sZCBmb3IgaGlnaGxpZ2h0cycpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIHdpbGwgaW5jbHVkZSBjbGFzc2ljIG1hcmtkb3duIGJvbGQgKCoqKSBzZWN0aW9ucyBhcyBoaWdobGlnaHRzJyxcblx0XHRcdClcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUJvbGRGb3JIaWdobGlnaHRzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cyA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdFbmFibGUgRm9vdG5vdGVzJylcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgd2lsbCBhZGQgYSBmb290bm90ZSB0byB0aGUgY3VycmVudCBkb2N1bWVudCB0byBlYWNoIGhpZ2hsaWdodCBpbiB5b3VyIGxpc3QuIFVzZWZ1bCB3aGVuIHlvdSB3YW4gdG8ga2VlcCB0cmFjayBvZiB3aGljaCBoaWdobGlnaHQgY2FtZSBmcm9tIHdoaWNoIHNvdXJjZSBmaWxlLicsXG5cdFx0XHQpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hZGRGb290bm90ZXMpLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZEZvb3Rub3RlcyA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnQXV0by1jYXBpdGFsaXplIGZpcnN0IGxldHRlcicpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIGNhcGl0YWxpemVzIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCBoaWdobGlnaHQuJyxcblx0XHRcdClcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmF1dG9DYXBpdGFsaXplKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdDcmVhdGUgbGlua3MnKVxuXHRcdFx0LnNldERlc2MoXG5cdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIHR1cm4gZWFjaCBoaWdobGlnaHQgaW50byBhIFtbIGxpbmsgXV0gdG8gY3JlYXRlIGEgaGlnaGxpZ2h0IE1PQycsXG5cdFx0XHQpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVMaW5rcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlTGlua3MgPSB2YWx1ZTtcblxuXHRcdFx0XHRcdC8vIGRpc2FibGUgZXhwbG9kZSBub3RlcyBtb2RlXG5cdFx0XHRcdFx0aWYodGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyAmJiB2YWx1ZSA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkV4cGxvZGVkTm90ZXMgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ09wZW4gbmV3IGZpbGUgd2l0aCBoaWdobGlnaHRzJylcblx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHQnSWYgZW5hYmxlZCwgb3BlbnMgYSBuZXcgZmlsZSB3aXRoIHRoZSBoaWdobGlnaHRzIGNvcGllZCBpbnRvLicsXG5cdFx0XHQpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlID0gdmFsdWU7XG5cblx0XHRcdFx0XHQvLyBkaXNhYmxlIGV4cGxvZGUgbm90ZXMgbW9kZVxuXHRcdFx0XHRcdGlmKHRoaXMucGx1Z2luLnNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXMgJiYgdmFsdWUgPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXMgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHt0ZXh0OiBcIvCfkqUgRXhwbG9kZSBOb3RlcyBNb2RlIPCfkqVcIn0pO1xuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwicFwiLCB7dGV4dDogXCJBIHNlY3JldCBtb2RlIHRoYXQgd2lsbCB0YWtlIHlvdXIgaGlnaGxpZ2h0aW5nIHRvIHRoZSBuZXh0IGxldmVsLiBPbmx5IGF2YWlsYWJsZSBpZiB5b3UgaGF2ZSAgJ0NyZWF0ZSBMaW5rcycgYW5kICdDcmVhdGUgbmV3IEZpbGUnIGVuYWJsZWQuIEFmdGVyIGVuYWJsaW5nIGJvdGgsIGNsb3NlIHRoaXMgd2luZG93IGFuZCBvcGVuIGFnYWluIHRvIHNlZSBvcHRpb25zLlwifSk7XG5cblx0XHRpZih0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVMaW5rcyAmJiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlKSB7XG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdFx0LnNldE5hbWUoJ0V4cGxvZGUgbGlua3MgaW50byBub3RlcycpXG5cdFx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIHR1cm4gZWFjaCBoaWdobGlnaHQgaW50byBhIG5vdGUgd2l0aCB0aGUgaGlnaGxpZ2h0ZWQgdGV4dCBhcyBxdW90ZSBhbmQgYSBiYWNrbGluayB0byB0aGUgTU9DIGFuZCBzb3VyY2UtZmlsZS4gVmVyeSBwb3dlcmZ1bCBidXQgdXNlIHdpdGggY2F1dGlvbiEnLFxuXHRcdFx0XHQpXG5cdFx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwbG9kZUludG9Ob3Rlcykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdCk7XG5cblx0XHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0XHQuc2V0TmFtZSgnT3BlbiBleHBsb2RlZCBub3RlcyBvbiBjcmVhdGlvbicpXG5cdFx0XHRcdC5zZXREZXNjKFxuXHRcdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIG9wZW4gZWFjaCBvZiB5b3VyIGV4cGxvZGVkIG5vdGVzIHdoZW4geW91IGNyZWF0ZSB0aGVtLiBGdW4gYW5kIHVzZWZ1bCB0byBjb250aW51ZSB3b3JraW5nIGluIHlvdXIgaGlnaGxpZ2h0LW5vdGVzIHJpZ2h0IGF3YXkhJyxcblx0XHRcdFx0KVxuXHRcdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdCk7XG5cblx0XHR9XG5cblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZUhpZ2hsaWdodCB7XG5cbiAgICB0b2dnbGVIaWdobGlnaHQoczogc3RyaW5nLCBjaD86IG51bWJlcikge1xuICAgICAgICBpZihzID09IFwiXCIpIHJldHVybiBcIlwiO1xuICAgICAgICBpZihzLmluZGV4T2YoXCIuXCIpIDwgMCkgeyByZXR1cm4gXCI9PVwiICsgcyArIFwiPT1cIn1cblxuICAgICAgICBsZXQgbGVmdCA9IHMuc3Vic3RyaW5nKDAsIGNoKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcy5zdWJzdHJpbmcoY2gpO1xuICAgICAgICBsZXQgbWFya2VkID0gbGVmdCArIFwiJENVUlNPUiRcIiArIHJpZ2h0O1xuXG4gICAgICAgIC8vIGh0dHBzOi8vcmVnZXgxMDEuY29tL3IvQlNwdlY2LzdcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU1NTM5MjRcbiAgICAgICAgbGV0IHAgPSBtYXJrZWQubWF0Y2goLyg9PSguKj8pPT0pfFteLiE/XFxzXVteLiE/XSooPzpbLiE/XSg/IVsnXCJdP1xcc3wkKVteLiE/XSopKlsuIT9dP1snXCJdPyg/PVxcc3wkKS9nbSk7XG5cbiAgICAgICAgbGV0IG5wID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgaWYocC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwLmZvckVhY2goZnVuY3Rpb24gKHBhcnQpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcGFydCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnQudHJpbSgpID09IFwiXCIpIHsgIHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnQuaW5jbHVkZXMoXCIkQ1VSU09SJFwiKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwYXJ0LnN0YXJ0c1dpdGgoXCI9PVwiKSAmJiBwYXJ0LmVuZHNXaXRoKFwiPT1cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC5yZXBsYWNlKC89PS9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydCA9IFwiPT1cIiArIHBhcnQgKyBcIj09XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC5yZXBsYWNlKFwiJENVUlNPUiRcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBucC5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbnAuam9pbihcIiBcIik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtQbHVnaW4sIE5vdGljZSwgYWRkSWNvbiwgVmlldywgTWFya2Rvd25WaWV3LCBXb3Jrc3BhY2V9IGZyb20gXCJvYnNpZGlhblwiXG5pbXBvcnQgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyBmcm9tIFwiLi9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzXCJcbmltcG9ydCBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzVGFiIGZyb20gXCIuL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWJcIlxuaW1wb3J0IFRvZ2dsZUhpZ2hsaWdodCBmcm9tIFwiLi9Ub2dnbGVIaWdobGlnaHRcIjtcblxuYWRkSWNvbigndGFyZ2V0JywgJzxwYXRoIGQ9XCJNNTAgODhDMjkuMDEzMiA4OCAxMiA3MC45ODY4IDEyIDUwQzEyIDI5LjAxMzIgMjkuMDEzMiAxMiA1MCAxMkM3MC45ODY4IDEyIDg4IDI5LjAxMzIgODggNTBDODcuOTc2MSA3MC45NzY5IDcwLjk3NjkgODcuOTc2MSA1MCA4OFpNNTAgMjIuODU3MUMzNS4wMDk0IDIyLjg1NzEgMjIuODU3MSAzNS4wMDk0IDIyLjg1NzEgNTBDMjIuODU3MSA2NC45OTA2IDM1LjAwOTQgNzcuMTQyOSA1MCA3Ny4xNDI5QzY0Ljk5MDYgNzcuMTQyOSA3Ny4xNDI5IDY0Ljk5MDYgNzcuMTQyOSA1MEM3Ny4xNDI5IDM1LjAwOTQgNjQuOTkwNiAyMi44NTcxIDUwIDIyLjg1NzFaTTUwIDY2LjI4NTdDNDEuMDA1NiA2Ni4yODU3IDMzLjcxNDMgNTguOTk0MyAzMy43MTQzIDUwQzMzLjcxNDMgNDEuMDA1NiA0MS4wMDU2IDMzLjcxNDMgNTAgMzMuNzE0M0M1OC45OTQzIDMzLjcxNDMgNjYuMjg1NyA0MS4wMDU2IDY2LjI4NTcgNTBDNjYuMjg1NyA1NC4zMTkyIDY0LjU2OTkgNTguNDYxNiA2MS41MTU3IDYxLjUxNTdDNTguNDYxNiA2NC41Njk5IDU0LjMxOTIgNjYuMjg1NyA1MCA2Ni4yODU3WlwiIGZpbGw9XCIjNjQ2NDY0XCIvPicpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuXHRwdWJsaWMgc2V0dGluZ3M6IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3M7XG5cdHB1YmxpYyBzdGF0dXNCYXI6IEhUTUxFbGVtZW50XG5cdHB1YmxpYyBjb3VudGVyOiAwO1xuXHRwcml2YXRlIGVkaXRvcjogQ29kZU1pcnJvci5FZGl0b3I7XG5cblx0YXN5bmMgb25sb2FkKCkge1xuXHRcdHRoaXMuY291bnRlciA9IDA7XG5cdFx0dGhpcy5sb2FkU2V0dGluZ3MoKTtcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuXHRcdHRoaXMuc3RhdHVzQmFyID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKClcblxuXHRcdHRoaXMuYWRkUmliYm9uSWNvbigndGFyZ2V0JywgJ0V4dHJhY3QgSGlnaGxpZ2h0cycsICgpID0+IHtcblx0XHRcdHRoaXMuZXh0cmFjdEhpZ2hsaWdodHMoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogXCJzaG9ydGN1dC1leHRyYWN0LWhpZ2hsaWdodHNcIixcblx0XHRcdG5hbWU6IFwiU2hvcnRjdXQgZm9yIGV4dHJhY3RpbmcgaGlnaGxpZ2h0c1wiLFxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuZXh0cmFjdEhpZ2hsaWdodHMoKSxcblx0XHRcdGhvdGtleXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1vZGlmaWVyczogW1wiQWx0XCIsIFwiU2hpZnRcIl0sXG5cdFx0XHRcdFx0a2V5OiBcIsKxXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0pO1xuXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiBcInNob3J0Y3V0LWhpZ2hsaWdodC1zZW50ZW5jZVwiLFxuXHRcdFx0bmFtZTogXCJTaG9ydGN1dCBmb3IgaGlnaGxpZ2h0aW5nIHNlbnRlbmNlIGN1cnNvciBpcyBpblwiLFxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuY3JlYXRlSGlnaGxpZ2h0KCksXG5cdFx0XHRob3RrZXlzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiLCBcIlNoaWZ0XCJdLFxuXHRcdFx0XHRcdGtleTogXCLigJRcIixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0fSk7XG5cdH1cblxuXHRsb2FkU2V0dGluZ3MoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IG5ldyBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzKCk7XG5cdFx0KGFzeW5jICgpID0+IHtcblx0XHQgIGNvbnN0IGxvYWRlZFNldHRpbmdzID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xuXHRcdCAgaWYgKGxvYWRlZFNldHRpbmdzKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkZvdW5kIGV4aXN0aW5nIHNldHRpbmdzIGZpbGVcIik7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmhlYWRsaW5lVGV4dCA9IGxvYWRlZFNldHRpbmdzLmhlYWRsaW5lVGV4dDtcblx0XHRcdHRoaXMuc2V0dGluZ3MuYWRkRm9vdG5vdGVzID0gbG9hZGVkU2V0dGluZ3MuYWRkRm9vdG5vdGVzO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5jcmVhdGVMaW5rcyA9IGxvYWRlZFNldHRpbmdzLmNyZWF0ZUxpbmtzO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSA9IGxvYWRlZFNldHRpbmdzLmF1dG9DYXBpdGFsaXplO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlID0gbG9hZGVkU2V0dGluZ3MuY3JlYXRlTmV3RmlsZTtcblx0XHRcdHRoaXMuc2V0dGluZ3MuZXhwbG9kZUludG9Ob3RlcyA9IGxvYWRlZFNldHRpbmdzLmV4cGxvZGVJbnRvTm90ZXM7XG5cdFx0XHR0aGlzLnNldHRpbmdzLm9wZW5FeHBsb2RlZE5vdGVzID0gbG9hZGVkU2V0dGluZ3Mub3BlbkV4cGxvZGVkTm90ZXM7XG5cdFx0ICB9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coXCJObyBzZXR0aW5ncyBmaWxlIGZvdW5kLCBzYXZpbmcuLi5cIik7XG5cdFx0XHR0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuXHRcdCAgfVxuXHRcdH0pKCk7XG5cdH1cblxuXHRhc3luYyBleHRyYWN0SGlnaGxpZ2h0cygpIHtcblx0XHRsZXQgYWN0aXZlTGVhZjogYW55ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYgPz8gbnVsbFxuXG5cdFx0bGV0IG5hbWUgPSBhY3RpdmVMZWFmPy52aWV3LmZpbGUuYmFzZW5hbWU7XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKGFjdGl2ZUxlYWY/LnZpZXc/LmRhdGEpIHtcblx0XHRcdFx0bGV0IGhpZ2hsaWdodHNUZXh0ID0gdGhpcy5wcm9jZXNzSGlnaGxpZ2h0cyhhY3RpdmVMZWFmLnZpZXcpLm1hcmtkb3duO1xuXHRcdFx0XHRsZXQgaGlnaGxpZ2h0cyA9IHRoaXMucHJvY2Vzc0hpZ2hsaWdodHMoYWN0aXZlTGVhZi52aWV3KS5oaWdobGlnaHRzO1xuXHRcdFx0XHRsZXQgYmFzZU5hbWVzID0gdGhpcy5wcm9jZXNzSGlnaGxpZ2h0cyhhY3RpdmVMZWFmLnZpZXcpLmJhc2VOYW1lcztcblx0XHRcdFx0bGV0IHNhdmVTdGF0dXMgPSB0aGlzLnNhdmVUb0NsaXBib2FyZChoaWdobGlnaHRzVGV4dCk7XG5cdFx0XHRcdG5ldyBOb3RpY2Uoc2F2ZVN0YXR1cyk7XG5cblx0XHRcdFx0Y29uc3QgbmV3QmFzZW5hbWVNT0MgPSBcIkhpZ2hsaWdodHMgZm9yIFwiICsgbmFtZSArIFwiLm1kXCI7XG5cdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmNyZWF0ZU5ld0ZpbGUpIHtcblx0XHRcdFx0XHQvLyBBZGQgbGluayBiYWNrIHRvIE9yaWdpbmFsXG5cdFx0XHRcdFx0aGlnaGxpZ2h0c1RleHQgKz0gYCMjIFNvdXJjZVxcbi0gW1ske25hbWV9XV1gO1xuXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5zYXZlVG9GaWxlKG5ld0Jhc2VuYW1lTU9DLCBoaWdobGlnaHRzVGV4dCk7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChuZXdCYXNlbmFtZU1PQywgbmV3QmFzZW5hbWVNT0MsIHRydWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jcmVhdGVOZXdGaWxlICYmIHRoaXMuc2V0dGluZ3MuY3JlYXRlTGlua3MgJiYgdGhpcy5zZXR0aW5ncy5leHBsb2RlSW50b05vdGVzKSB7XG5cdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGJhc2VOYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJDcmVhdGluZyBmaWxlIGZvciBcIiArIGJhc2VOYW1lc1tpXSk7XG5cdFx0XHRcdFx0XHR2YXIgY29udGVudCA9IFwiXCI7XG5cdFx0XHRcdFx0XHQvLyBhZGQgaGlnaGxpZ2h0IGFzIHF1b3RlXG5cdFx0XHRcdFx0XHRjb250ZW50ICs9IFwiIyMgU291cmNlXFxuXCJcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gYD4gJHtoaWdobGlnaHRzW2ldfVteMV1gO1xuXHRcdFx0XHRcdFx0Y29udGVudCArPSBcIlxcblxcblwiO1xuXHRcdFx0XHRcdFx0Y29udGVudCArPSBgW14xXTogW1ske25hbWV9XV1gO1xuXHRcdFx0XHRcdFx0Y29udGVudCArPSBcIlxcblwiO1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coY29udGVudCk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG5ld0Jhc2VuYW1lID0gYmFzZU5hbWVzW2ldICsgXCIubWRcIjtcblxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5zYXZlVG9GaWxlKG5ld0Jhc2VuYW1lLCBjb250ZW50KTtcblxuXHRcdFx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5vcGVuRXhwbG9kZWROb3Rlcykge1xuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcC53b3Jrc3BhY2Uub3BlbkxpbmtUZXh0KG5ld0Jhc2VuYW1lLCBuZXdCYXNlbmFtZSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ldyBOb3RpY2UoXCJObyBoaWdobGlnaHRzIHRvIGV4dHJhY3QuXCIpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKGUubWVzc2FnZSlcblx0XHR9XG5cdH1cblxuXHRhc3luYyBzYXZlVG9GaWxlKGZpbGVQYXRoOiBzdHJpbmcsIG1kU3RyaW5nOiBzdHJpbmcpIHtcblx0XHQvL0lmIGZpbGVzIGV4aXN0cyB0aGVuIGFwcGVuZCBjb250ZW50IHRvIGV4aXN0aW5nIGZpbGVcblx0XHRjb25zdCBmaWxlRXhpc3RzID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5leGlzdHMoZmlsZVBhdGgpO1xuXHRcdGlmIChmaWxlRXhpc3RzKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkZpbGUgZXhpc3RzIGFscmVhZHkuLi5cIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZShmaWxlUGF0aCwgbWRTdHJpbmcpO1xuXHRcdH1cblx0fVxuXG5cdHByb2Nlc3NIaWdobGlnaHRzKHZpZXc6IGFueSkge1xuXG5cdFx0dmFyIHJlO1xuXG5cdFx0aWYodGhpcy5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cykge1xuXHRcdFx0cmUgPSAvKD09fFxcPG1hcmtcXD58XFwqXFwqKShbXFxzXFxTXSo/KSg9PXxcXDxcXC9tYXJrXFw+fFxcKlxcKikvZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmUgPSAvKD09fFxcPG1hcmtcXD4pKFtcXHNcXFNdKj8pKD09fFxcPFxcL21hcmtcXD4pL2c7XG5cdFx0fVxuXG5cdFx0bGV0IGRhdGEgPSB2aWV3LmRhdGE7XG5cdFx0bGV0IGJhc2VuYW1lID0gdmlldy5maWxlLmJhc2VuYW1lO1xuXHRcdGxldCBtYXRjaGVzID0gZGF0YS5tYXRjaChyZSk7XG5cdFx0dGhpcy5jb3VudGVyICs9IDE7XG5cblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0XHR2YXIgaGlnaGxpZ2h0cyA9IFtdO1xuXHRcdHZhciBiYXNlTmFtZXMgPSBbXTtcblxuXHRcdGlmIChtYXRjaGVzICE9IG51bGwpIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuaGVhZGxpbmVUZXh0ICE9IFwiXCIpIHsgXG5cdFx0XHRcdGxldCB0ZXh0ID0gdGhpcy5zZXR0aW5ncy5oZWFkbGluZVRleHQucmVwbGFjZSgvXFwkTk9URV9USVRMRS8sIGAke2Jhc2VuYW1lfWApXG5cdFx0XHRcdHJlc3VsdCArPSBgIyMgJHt0ZXh0fVxcbmA7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobGV0IGVudHJ5IG9mIG1hdGNoZXMpIHtcblx0XHRcdFx0dmFyIHJlbW92ZU5ld2xpbmUgPSBlbnRyeS5yZXBsYWNlKC9cXG4vZywgXCIgXCIpO1xuXHRcdFx0XHRsZXQgcmVtb3ZlSGlnaGxpZ2h0U3RhcnQgPSByZW1vdmVOZXdsaW5lLnJlcGxhY2UoLz09L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVIaWdobGlnaHRFbmQgPSByZW1vdmVIaWdobGlnaHRTdGFydC5yZXBsYWNlKC9cXDxtYXJrXFw+L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVNYXJrQ2xvc2luZyA9IHJlbW92ZUhpZ2hsaWdodEVuZC5yZXBsYWNlKC9cXDxcXC9tYXJrXFw+L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVCb2xkID0gcmVtb3ZlTWFya0Nsb3NpbmcucmVwbGFjZSgvXFwqXFwqL2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVEb3VibGVTcGFjZXMgPSByZW1vdmVCb2xkLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XG5cblx0XHRcdFx0cmVtb3ZlRG91YmxlU3BhY2VzID0gcmVtb3ZlRG91YmxlU3BhY2VzLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XG5cdFx0XHRcdHJlbW92ZURvdWJsZVNwYWNlcyA9IHJlbW92ZURvdWJsZVNwYWNlcy50cmltKCk7XG5cblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSkge1xuXHRcdFx0XHRcdGlmKHJlbW92ZURvdWJsZVNwYWNlcyAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVEb3VibGVTcGFjZXMgPSB0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlcihyZW1vdmVEb3VibGVTcGFjZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCArPSBcIi0gXCJcblxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNyZWF0ZUxpbmtzKSB7XG5cdFx0XHRcdFx0Ly8gRmlyc3QsIHNhbml0aXplIGhpZ2hsaWdodCB0byBiZSB1c2VkIGFzIGEgZmlsZS1saW5rXG5cdFx0XHRcdFx0Ly8gKiBcIiBcXCAvIHwgPCA+IDogP1xuXHRcdFx0XHRcdGxldCBzYW5pdGl6ZWQgPSByZW1vdmVEb3VibGVTcGFjZXMucmVwbGFjZSgvXFwqfFxcXCJ8XFxcXHxcXC98XFw8fFxcPnxcXDp8XFw/fFxcfFxcW1xcXV8vZ20sIFwiXCIpO1xuXHRcdFx0XHRcdHNhbml0aXplZCA9IHNhbml0aXplZC50cmltKCk7XG5cblx0XHRcdFx0XHRsZXQgYmFzZU5hbWUgPSBzYW5pdGl6ZWQ7XG5cdFx0XHRcdFx0aWYoYmFzZU5hbWUubGVuZ3RoID4gMTAwKSB7XG5cdFx0XHRcdFx0XHRiYXNlTmFtZSA9IGJhc2VOYW1lLnN1YnN0cigwLCA5OSk7XG5cdFx0XHRcdFx0XHRiYXNlTmFtZSArPSBcIi4uLlwiXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0ICs9IFwiW1tcIiArIGJhc2VOYW1lICsgXCJdXVwiO1xuXHRcdFx0XHRcdGhpZ2hsaWdodHMucHVzaChzYW5pdGl6ZWQpO1xuXHRcdFx0XHRcdGJhc2VOYW1lcy5wdXNoKGJhc2VOYW1lKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gcmVtb3ZlRG91YmxlU3BhY2VzO1xuXHRcdFx0XHRcdGhpZ2hsaWdodHMucHVzaChyZW1vdmVEb3VibGVTcGFjZXMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hZGRGb290bm90ZXMpIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gYFteJHt0aGlzLmNvdW50ZXJ9XWA7XG5cdFx0XHRcdH0gXG5cblx0XHRcdFx0cmVzdWx0ICs9IFwiXFxuXCI7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuYWRkRm9vdG5vdGVzKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBcIlxcblwiXG5cdFx0XHRcdHJlc3VsdCArPSBgW14ke3RoaXMuY291bnRlcn1dOiBbWyR7YmFzZW5hbWV9XV1cXG5gXG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdCArPSBcIlxcblwiO1xuXHRcdH1cblxuXHRcdHJldHVybiB7bWFya2Rvd246IHJlc3VsdCwgYmFzZU5hbWVzOiBiYXNlTmFtZXMsIGhpZ2hsaWdodHM6IGhpZ2hsaWdodHN9O1xuXHR9XG5cblx0c2F2ZVRvQ2xpcGJvYXJkKGRhdGE6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0aWYgKGRhdGEubGVuZ3RoID4gMCkge1xuXHRcdFx0bmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZGF0YSk7XG5cdFx0XHRyZXR1cm4gXCJIaWdobGlnaHRzIGNvcGllZCB0byBjbGlwYm9hcmQhXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIk5vIGhpZ2hsaWdodHMgZm91bmRcIjtcblx0XHR9XG5cdH1cblxuXHRjcmVhdGVIaWdobGlnaHQoKSB7XG5cdFx0Y29uc3QgbWRWaWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldyBhcyBNYXJrZG93blZpZXc7XG5cdFx0Y29uc3QgZG9jID0gbWRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XG5cdFx0dGhpcy5lZGl0b3IgPSBkb2M7XG5cblx0XHRjb25zdCBjdXJzb3JQb3NpdGlvbiA9IHRoaXMuZWRpdG9yLmdldEN1cnNvcigpO1xuXHRcdGxldCBsaW5lVGV4dCA9IHRoaXMuZWRpdG9yLmdldExpbmUoY3Vyc29yUG9zaXRpb24ubGluZSk7XG5cblx0XHQvLyB1c2Ugb3VyIGZhbmN5IGNsYXNzIHRvIGZpZ3VyZSB0aGlzIG91dFxuXHRcdGxldCB0aCA9IG5ldyBUb2dnbGVIaWdobGlnaHQoKTtcblx0XHRsZXQgcmVzdWx0ID0gdGgudG9nZ2xlSGlnaGxpZ2h0KGxpbmVUZXh0LCBjdXJzb3JQb3NpdGlvbi5jaCk7XG5cblx0XHQvLyBjYXRjaCB1cCBvbiBjdXJzb3Jcblx0XHRsZXQgY3Vyc29yRGlmZmVyZW5jZSA9IC0yO1xuXHRcdGlmKHJlc3VsdC5sZW5ndGggPiBsaW5lVGV4dC5sZW5ndGgpIHsgY3Vyc29yRGlmZmVyZW5jZSA9IDIgfVxuXG5cdFx0dGhpcy5lZGl0b3IucmVwbGFjZVJhbmdlKHJlc3VsdCwge2xpbmU6IGN1cnNvclBvc2l0aW9uLmxpbmUsIGNoOiAwfSwge2xpbmU6IGN1cnNvclBvc2l0aW9uLmxpbmUsIGNoOiBsaW5lVGV4dC5sZW5ndGh9KVxuXHRcdHRoaXMuZWRpdG9yLnNldEN1cnNvcih7bGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IGN1cnNvclBvc2l0aW9uLmNoICsgY3Vyc29yRGlmZmVyZW5jZX0pO1xuXHR9XG5cblxuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoczogc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xuXHR9XG59XG4iXSwibmFtZXMiOlsiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJhZGRJY29uIiwiTm90aWNlIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ25GLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FB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
