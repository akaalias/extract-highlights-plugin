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
            .setName('Create links')
            .setDesc('If enabled, will turn each highlight into a [[ link ]] to create a highlight MOC')
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.createLinks).onChange(function (value) {
                _this.plugin.settings.createLinks = value;
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
        var activeLeaf = (_a = this.app.workspace.activeLeaf) !== null && _a !== void 0 ? _a : null;
        try {
            if ((_b = activeLeaf === null || activeLeaf === void 0 ? void 0 : activeLeaf.view) === null || _b === void 0 ? void 0 : _b.data) {
                var highlightsText = this.processHighlights(activeLeaf.view);
                var saveStatus = this.saveToClipboard(highlightsText);
                new obsidian.Notice(saveStatus);
            }
            else {
                new obsidian.Notice("No highlights to extract.");
            }
        }
        catch (e) {
            console.log(e.message);
        }
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
        console.log(matches.length);
        var result = "";
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
                    result += "[[" + removeDoubleSpaces + "]]";
                }
                else {
                    result += removeDoubleSpaces;
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
        return result;
    };
    ExtractHighlightsPlugin.prototype.saveToClipboard = function (data) {
        if (data.length > 0) {
            console.log(data);
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
        console.log("capitalizing...");
        return s.charAt(0).toUpperCase() + s.slice(1);
    };
    return ExtractHighlightsPlugin;
}(obsidian.Plugin));

module.exports = ExtractHighlightsPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzLnRzIiwic3JjL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIudHMiLCJzcmMvVG9nZ2xlSGlnaGxpZ2h0LnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyB7XG4gIHB1YmxpYyBoZWFkbGluZVRleHQ6IHN0cmluZztcbiAgcHVibGljIGFkZEZvb3Rub3RlczogYm9vbGVhbjtcbiAgcHVibGljIHVzZUJvbGRGb3JIaWdobGlnaHRzOiBib29sZWFuO1xuICBwdWJsaWMgY3JlYXRlTGlua3M6IGJvb2xlYW47XG4gIHB1YmxpYyBhdXRvQ2FwaXRhbGl6ZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhlYWRsaW5lVGV4dCA9IFwiXCI7XG4gICAgdGhpcy5hZGRGb290bm90ZXMgPSBmYWxzZTtcbiAgICB0aGlzLnVzZUJvbGRGb3JIaWdobGlnaHRzID0gZmFsc2U7XG4gICAgdGhpcy5jcmVhdGVMaW5rcyA9IGZhbHNlO1xuICAgIHRoaXMuYXV0b0NhcGl0YWxpemUgPSBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmd9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luIGZyb20gXCIuL21haW5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5nc1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXHRwcml2YXRlIHJlYWRvbmx5IHBsdWdpbjogRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW47XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW4pIHtcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzO1xuXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcblxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwge3RleHQ6IFwiRXh0cmFjdCBIaWdobGlnaHRzIFBsdWdpblwifSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiSGVhZGluZyBUZXh0XCIpXG5cdFx0XHQuc2V0RGVzYyhcIklmIHNldCwgd2lsbCBhZGQgYCMjIFlvdXIgVGV4dGAuIFVzZSAkTk9URV9USVRMRSB0byBpbmNsdWRlIHRpdGxlLiBMZWF2ZSBibGFuayB0byBvbWl0LiBcIilcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKFwiSGlnaGxpZ2h0cyBmb3IgJE5PVEVfVElUTEVcIilcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGxpbmVUZXh0KVxuXHRcdFx0XHRcdC5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmhlYWRsaW5lVGV4dCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnVXNlIGJvbGQgZm9yIGhpZ2hsaWdodHMnKVxuXHRcdFx0LnNldERlc2MoXG5cdFx0XHRcdCdJZiBlbmFibGVkLCB3aWxsIGluY2x1ZGUgY2xhc3NpYyBtYXJrZG93biBib2xkICgqKikgc2VjdGlvbnMgYXMgaGlnaGxpZ2h0cycsXG5cdFx0XHQpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlQm9sZEZvckhpZ2hsaWdodHMgPSB2YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnRW5hYmxlIEZvb3Rub3RlcycpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIHdpbGwgYWRkIGEgZm9vdG5vdGUgdG8gdGhlIGN1cnJlbnQgZG9jdW1lbnQgdG8gZWFjaCBoaWdobGlnaHQgaW4geW91ciBsaXN0LiBVc2VmdWwgd2hlbiB5b3Ugd2FuIHRvIGtlZXAgdHJhY2sgb2Ygd2hpY2ggaGlnaGxpZ2h0IGNhbWUgZnJvbSB3aGljaCBzb3VyY2UgZmlsZS4nLFxuXHRcdFx0KVxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWRkRm9vdG5vdGVzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hZGRGb290bm90ZXMgPSB2YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ0NyZWF0ZSBsaW5rcycpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIHdpbGwgdHVybiBlYWNoIGhpZ2hsaWdodCBpbnRvIGEgW1sgbGluayBdXSB0byBjcmVhdGUgYSBoaWdobGlnaHQgTU9DJyxcblx0XHRcdClcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNyZWF0ZUxpbmtzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVMaW5rcyA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnQXV0by1jYXBpdGFsaXplIGZpcnN0IGxldHRlcicpXG5cdFx0XHQuc2V0RGVzYyhcblx0XHRcdFx0J0lmIGVuYWJsZWQsIGNhcGl0YWxpemVzIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCBoaWdobGlnaHQuJyxcblx0XHRcdClcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0dG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmF1dG9DYXBpdGFsaXplKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1x0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZUhpZ2hsaWdodCB7XG5cbiAgICB0b2dnbGVIaWdobGlnaHQoczogc3RyaW5nLCBjaD86IG51bWJlcikge1xuICAgICAgICBpZihzID09IFwiXCIpIHJldHVybiBcIlwiO1xuICAgICAgICBpZihzLmluZGV4T2YoXCIuXCIpIDwgMCkgeyByZXR1cm4gXCI9PVwiICsgcyArIFwiPT1cIn1cblxuICAgICAgICBsZXQgbGVmdCA9IHMuc3Vic3RyaW5nKDAsIGNoKTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gcy5zdWJzdHJpbmcoY2gpO1xuICAgICAgICBsZXQgbWFya2VkID0gbGVmdCArIFwiJENVUlNPUiRcIiArIHJpZ2h0O1xuXG4gICAgICAgIC8vIGh0dHBzOi8vcmVnZXgxMDEuY29tL3IvQlNwdlY2LzdcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU1NTM5MjRcbiAgICAgICAgbGV0IHAgPSBtYXJrZWQubWF0Y2goLyg9PSguKj8pPT0pfFteLiE/XFxzXVteLiE/XSooPzpbLiE/XSg/IVsnXCJdP1xcc3wkKVteLiE/XSopKlsuIT9dP1snXCJdPyg/PVxcc3wkKS9nbSk7XG5cbiAgICAgICAgbGV0IG5wID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgaWYocC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBwLmZvckVhY2goZnVuY3Rpb24gKHBhcnQpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcGFydCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnQudHJpbSgpID09IFwiXCIpIHsgIHJldHVybjsgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnQuaW5jbHVkZXMoXCIkQ1VSU09SJFwiKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwYXJ0LnN0YXJ0c1dpdGgoXCI9PVwiKSAmJiBwYXJ0LmVuZHNXaXRoKFwiPT1cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC5yZXBsYWNlKC89PS9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydCA9IFwiPT1cIiArIHBhcnQgKyBcIj09XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC5yZXBsYWNlKFwiJENVUlNPUiRcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcGFydC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHBhcnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBucC5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbnAuam9pbihcIiBcIik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtQbHVnaW4sIE5vdGljZSwgYWRkSWNvbiwgVmlldywgTWFya2Rvd25WaWV3LCBXb3Jrc3BhY2V9IGZyb20gXCJvYnNpZGlhblwiXG5pbXBvcnQgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyBmcm9tIFwiLi9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzXCJcbmltcG9ydCBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzVGFiIGZyb20gXCIuL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWJcIlxuaW1wb3J0IHtQb3NpdGlvbn0gZnJvbSBcImNvZGVtaXJyb3JcIjtcbmltcG9ydCBUb2dnbGVIaWdobGlnaHQgZnJvbSBcIi4vVG9nZ2xlSGlnaGxpZ2h0XCI7XG5cbmFkZEljb24oJ3RhcmdldCcsICc8cGF0aCBkPVwiTTUwIDg4QzI5LjAxMzIgODggMTIgNzAuOTg2OCAxMiA1MEMxMiAyOS4wMTMyIDI5LjAxMzIgMTIgNTAgMTJDNzAuOTg2OCAxMiA4OCAyOS4wMTMyIDg4IDUwQzg3Ljk3NjEgNzAuOTc2OSA3MC45NzY5IDg3Ljk3NjEgNTAgODhaTTUwIDIyLjg1NzFDMzUuMDA5NCAyMi44NTcxIDIyLjg1NzEgMzUuMDA5NCAyMi44NTcxIDUwQzIyLjg1NzEgNjQuOTkwNiAzNS4wMDk0IDc3LjE0MjkgNTAgNzcuMTQyOUM2NC45OTA2IDc3LjE0MjkgNzcuMTQyOSA2NC45OTA2IDc3LjE0MjkgNTBDNzcuMTQyOSAzNS4wMDk0IDY0Ljk5MDYgMjIuODU3MSA1MCAyMi44NTcxWk01MCA2Ni4yODU3QzQxLjAwNTYgNjYuMjg1NyAzMy43MTQzIDU4Ljk5NDMgMzMuNzE0MyA1MEMzMy43MTQzIDQxLjAwNTYgNDEuMDA1NiAzMy43MTQzIDUwIDMzLjcxNDNDNTguOTk0MyAzMy43MTQzIDY2LjI4NTcgNDEuMDA1NiA2Ni4yODU3IDUwQzY2LjI4NTcgNTQuMzE5MiA2NC41Njk5IDU4LjQ2MTYgNjEuNTE1NyA2MS41MTU3QzU4LjQ2MTYgNjQuNTY5OSA1NC4zMTkyIDY2LjI4NTcgNTAgNjYuMjg1N1pcIiBmaWxsPVwiIzY0NjQ2NFwiLz4nKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cblx0cHVibGljIHNldHRpbmdzOiBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzO1xuXHRwdWJsaWMgc3RhdHVzQmFyOiBIVE1MRWxlbWVudFxuXHRwdWJsaWMgY291bnRlcjogMDtcblx0cHJpdmF0ZSBlZGl0b3I6IENvZGVNaXJyb3IuRWRpdG9yO1xuXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHR0aGlzLmNvdW50ZXIgPSAwO1xuXHRcdHRoaXMubG9hZFNldHRpbmdzKCk7XG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cblx0XHR0aGlzLnN0YXR1c0JhciA9IHRoaXMuYWRkU3RhdHVzQmFySXRlbSgpXG5cblx0XHR0aGlzLmFkZFJpYmJvbkljb24oJ3RhcmdldCcsICdFeHRyYWN0IEhpZ2hsaWdodHMnLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmV4dHJhY3RIaWdobGlnaHRzKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6IFwic2hvcnRjdXQtZXh0cmFjdC1oaWdobGlnaHRzXCIsXG5cdFx0XHRuYW1lOiBcIlNob3J0Y3V0IGZvciBleHRyYWN0aW5nIGhpZ2hsaWdodHNcIixcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmV4dHJhY3RIaWdobGlnaHRzKCksXG5cdFx0XHRob3RrZXlzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiLCBcIlNoaWZ0XCJdLFxuXHRcdFx0XHRcdGtleTogXCLCsVwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogXCJzaG9ydGN1dC1oaWdobGlnaHQtc2VudGVuY2VcIixcblx0XHRcdG5hbWU6IFwiU2hvcnRjdXQgZm9yIGhpZ2hsaWdodGluZyBzZW50ZW5jZSBjdXJzb3IgaXMgaW5cIixcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmNyZWF0ZUhpZ2hsaWdodCgpLFxuXHRcdFx0aG90a2V5czogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bW9kaWZpZXJzOiBbXCJBbHRcIiwgXCJTaGlmdFwiXSxcblx0XHRcdFx0XHRrZXk6IFwi4oCUXCIsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0pO1xuXHR9XG5cblx0bG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBuZXcgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncygpO1xuXHRcdChhc3luYyAoKSA9PiB7XG5cdFx0ICBjb25zdCBsb2FkZWRTZXR0aW5ncyA9IGF3YWl0IHRoaXMubG9hZERhdGEoKTtcblx0XHQgIGlmIChsb2FkZWRTZXR0aW5ncykge1xuXHRcdFx0Y29uc29sZS5sb2coXCJGb3VuZCBleGlzdGluZyBzZXR0aW5ncyBmaWxlXCIpO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5oZWFkbGluZVRleHQgPSBsb2FkZWRTZXR0aW5ncy5oZWFkbGluZVRleHQ7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmFkZEZvb3Rub3RlcyA9IGxvYWRlZFNldHRpbmdzLmFkZEZvb3Rub3Rlcztcblx0XHRcdHRoaXMuc2V0dGluZ3MuY3JlYXRlTGlua3MgPSBsb2FkZWRTZXR0aW5ncy5jcmVhdGVMaW5rcztcblx0XHRcdHRoaXMuc2V0dGluZ3MuYXV0b0NhcGl0YWxpemUgPSBsb2FkZWRTZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZTtcblx0XHQgIH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIk5vIHNldHRpbmdzIGZpbGUgZm91bmQsIHNhdmluZy4uLlwiKTtcblx0XHRcdHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdFx0ICB9XG5cdFx0fSkoKTtcblx0fVxuXG5cdGV4dHJhY3RIaWdobGlnaHRzKCk6IHZvaWQge1xuXHRcdGxldCBhY3RpdmVMZWFmOiBhbnkgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiA/PyBudWxsXG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKGFjdGl2ZUxlYWY/LnZpZXc/LmRhdGEpIHtcblx0XHRcdFx0bGV0IGhpZ2hsaWdodHNUZXh0ID0gdGhpcy5wcm9jZXNzSGlnaGxpZ2h0cyhhY3RpdmVMZWFmLnZpZXcpO1xuXHRcdFx0XHRsZXQgc2F2ZVN0YXR1cyA9IHRoaXMuc2F2ZVRvQ2xpcGJvYXJkKGhpZ2hsaWdodHNUZXh0KTtcblx0XHRcdFx0bmV3IE5vdGljZShzYXZlU3RhdHVzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ldyBOb3RpY2UoXCJObyBoaWdobGlnaHRzIHRvIGV4dHJhY3QuXCIpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKGUubWVzc2FnZSlcblx0XHR9XG5cdH1cblxuXHRwcm9jZXNzSGlnaGxpZ2h0cyh2aWV3OiBhbnkpOiBzdHJpbmcge1xuXG5cdFx0dmFyIHJlO1xuXG5cdFx0aWYodGhpcy5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cykge1xuXHRcdFx0cmUgPSAvKD09fFxcPG1hcmtcXD58XFwqXFwqKShbXFxzXFxTXSo/KSg9PXxcXDxcXC9tYXJrXFw+fFxcKlxcKikvZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmUgPSAvKD09fFxcPG1hcmtcXD4pKFtcXHNcXFNdKj8pKD09fFxcPFxcL21hcmtcXD4pL2c7XG5cdFx0fVxuXG5cdFx0bGV0IGRhdGEgPSB2aWV3LmRhdGE7XG5cdFx0bGV0IGJhc2VuYW1lID0gdmlldy5maWxlLmJhc2VuYW1lO1xuXHRcdGxldCBtYXRjaGVzID0gZGF0YS5tYXRjaChyZSk7XG5cdFx0dGhpcy5jb3VudGVyICs9IDE7XG5cblx0XHRjb25zb2xlLmxvZyhtYXRjaGVzLmxlbmd0aCk7XG5cblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcblxuXHRcdGlmIChtYXRjaGVzICE9IG51bGwpIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuaGVhZGxpbmVUZXh0ICE9IFwiXCIpIHsgXG5cdFx0XHRcdGxldCB0ZXh0ID0gdGhpcy5zZXR0aW5ncy5oZWFkbGluZVRleHQucmVwbGFjZSgvXFwkTk9URV9USVRMRS8sIGAke2Jhc2VuYW1lfWApXG5cdFx0XHRcdHJlc3VsdCArPSBgIyMgJHt0ZXh0fVxcbmA7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAobGV0IGVudHJ5IG9mIG1hdGNoZXMpIHtcblx0XHRcdFx0dmFyIHJlbW92ZU5ld2xpbmUgPSBlbnRyeS5yZXBsYWNlKC9cXG4vZywgXCIgXCIpO1xuXHRcdFx0XHRsZXQgcmVtb3ZlSGlnaGxpZ2h0U3RhcnQgPSByZW1vdmVOZXdsaW5lLnJlcGxhY2UoLz09L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVIaWdobGlnaHRFbmQgPSByZW1vdmVIaWdobGlnaHRTdGFydC5yZXBsYWNlKC9cXDxtYXJrXFw+L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVNYXJrQ2xvc2luZyA9IHJlbW92ZUhpZ2hsaWdodEVuZC5yZXBsYWNlKC9cXDxcXC9tYXJrXFw+L2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVCb2xkID0gcmVtb3ZlTWFya0Nsb3NpbmcucmVwbGFjZSgvXFwqXFwqL2csIFwiXCIpXG5cdFx0XHRcdGxldCByZW1vdmVEb3VibGVTcGFjZXMgPSByZW1vdmVCb2xkLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XG5cblx0XHRcdFx0cmVtb3ZlRG91YmxlU3BhY2VzID0gcmVtb3ZlRG91YmxlU3BhY2VzLnJlcGxhY2UoXCIgIFwiLCBcIiBcIik7XG5cdFx0XHRcdHJlbW92ZURvdWJsZVNwYWNlcyA9IHJlbW92ZURvdWJsZVNwYWNlcy50cmltKCk7XG5cblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hdXRvQ2FwaXRhbGl6ZSkge1xuXHRcdFx0XHRcdGlmKHJlbW92ZURvdWJsZVNwYWNlcyAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVEb3VibGVTcGFjZXMgPSB0aGlzLmNhcGl0YWxpemVGaXJzdExldHRlcihyZW1vdmVEb3VibGVTcGFjZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCArPSBcIi0gXCJcblxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNyZWF0ZUxpbmtzKSB7XG5cdFx0XHRcdFx0cmVzdWx0ICs9IFwiW1tcIiArIHJlbW92ZURvdWJsZVNwYWNlcyArIFwiXV1cIjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gcmVtb3ZlRG91YmxlU3BhY2VzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hZGRGb290bm90ZXMpIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gYFteJHt0aGlzLmNvdW50ZXJ9XWA7XG5cdFx0XHRcdH0gXG5cblx0XHRcdFx0cmVzdWx0ICs9IFwiXFxuXCI7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuYWRkRm9vdG5vdGVzKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBcIlxcblwiXG5cdFx0XHRcdHJlc3VsdCArPSBgW14ke3RoaXMuY291bnRlcn1dOiBbWyR7YmFzZW5hbWV9XV1cXG5gXG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdCArPSBcIlxcblwiO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRzYXZlVG9DbGlwYm9hcmQoZGF0YTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblxuXHRcdFx0bmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZGF0YSk7XG5cdFx0XG5cdFx0XHRyZXR1cm4gXCJIaWdobGlnaHRzIGNvcGllZCB0byBjbGlwYm9hcmQhXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIk5vIGhpZ2hsaWdodHMgZm91bmRcIjtcblx0XHR9XG5cdH1cblxuXHRjcmVhdGVIaWdobGlnaHQoKSB7XG5cdFx0Y29uc3QgbWRWaWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldyBhcyBNYXJrZG93blZpZXc7XG5cdFx0Y29uc3QgZG9jID0gbWRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XG5cdFx0dGhpcy5lZGl0b3IgPSBkb2M7XG5cblx0XHRjb25zdCBjdXJzb3JQb3NpdGlvbiA9IHRoaXMuZWRpdG9yLmdldEN1cnNvcigpO1xuXHRcdGxldCBsaW5lVGV4dCA9IHRoaXMuZWRpdG9yLmdldExpbmUoY3Vyc29yUG9zaXRpb24ubGluZSk7XG5cblx0XHQvLyB1c2Ugb3VyIGZhbmN5IGNsYXNzIHRvIGZpZ3VyZSB0aGlzIG91dFxuXHRcdGxldCB0aCA9IG5ldyBUb2dnbGVIaWdobGlnaHQoKTtcblx0XHRsZXQgcmVzdWx0ID0gdGgudG9nZ2xlSGlnaGxpZ2h0KGxpbmVUZXh0LCBjdXJzb3JQb3NpdGlvbi5jaCk7XG5cblx0XHQvLyBjYXRjaCB1cCBvbiBjdXJzb3Jcblx0XHRsZXQgY3Vyc29yRGlmZmVyZW5jZSA9IC0yO1xuXHRcdGlmKHJlc3VsdC5sZW5ndGggPiBsaW5lVGV4dC5sZW5ndGgpIHsgY3Vyc29yRGlmZmVyZW5jZSA9IDIgfVxuXG5cdFx0dGhpcy5lZGl0b3IucmVwbGFjZVJhbmdlKHJlc3VsdCwge2xpbmU6IGN1cnNvclBvc2l0aW9uLmxpbmUsIGNoOiAwfSwge2xpbmU6IGN1cnNvclBvc2l0aW9uLmxpbmUsIGNoOiBsaW5lVGV4dC5sZW5ndGh9KVxuXHRcdHRoaXMuZWRpdG9yLnNldEN1cnNvcih7bGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IGN1cnNvclBvc2l0aW9uLmNoICsgY3Vyc29yRGlmZmVyZW5jZX0pO1xuXHR9XG5cblxuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoczogc3RyaW5nKSB7XG5cdFx0Y29uc29sZS5sb2coXCJjYXBpdGFsaXppbmcuLi5cIik7XG5cdFx0cmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xuXHR9XG59XG4iXSwibmFtZXMiOlsiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJhZGRJY29uIiwiTm90aWNlIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ25GLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdB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
