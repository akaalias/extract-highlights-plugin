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
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
    };
    return ExtractHighlightsPluginSettingsTab;
}(obsidian.PluginSettingTab));

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
                this.registerEvent(this.app.on('codemirror', function (cm) {
                    if ('sourceMode' in cm) {
                        _this.editor = cm.sourceMode.cmEditor;
                    }
                    else {
                        _this.editor = cm;
                    }
                }));
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
                    callback: function () { return _this.toggleLineHighlight(); },
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
    ExtractHighlightsPlugin.prototype.toggleHighlight = function () {
        this.toggleLineHighlight();
        // this.toggleFullLine();
    };
    ExtractHighlightsPlugin.prototype.toggleLineHighlight = function () {
        var cursorPosition = this.editor.getCursor();
        var ch = cursorPosition.ch;
        var line = cursorPosition.line;
        var lineText = this.editor.getLine(cursorPosition.line);
        var allTextLeftOfCursor = lineText.substr(0, cursorPosition.ch);
        var allTextRightOfCursor = lineText.substr(cursorPosition.ch);
        var periodIndexLeftOfCursor = allTextLeftOfCursor.lastIndexOf(".");
        if (periodIndexLeftOfCursor == -1) {
            periodIndexLeftOfCursor = 0;
        }
        var sentenceUntilLeftOfCursor = allTextLeftOfCursor.substr(periodIndexLeftOfCursor, ch - periodIndexLeftOfCursor);
        if (sentenceUntilLeftOfCursor.startsWith(". ")) {
            sentenceUntilLeftOfCursor = sentenceUntilLeftOfCursor.replace(". ", "");
        }
        var periodIndexRightOfCursor = allTextRightOfCursor.indexOf(".");
        if (periodIndexRightOfCursor == -1) {
            periodIndexRightOfCursor = allTextRightOfCursor.length;
        }
        var sentenceUntilRightOfCursor = allTextRightOfCursor.substr(0, periodIndexRightOfCursor + 1);
        var currentSentence = sentenceUntilLeftOfCursor + sentenceUntilRightOfCursor;
        var absolutePeriodIndexRightOfCursor = periodIndexRightOfCursor + allTextLeftOfCursor.length;
        currentSentence = "==" + currentSentence + "==";
        var replaceOffset = periodIndexLeftOfCursor;
        if (allTextLeftOfCursor.contains(".")) {
            replaceOffset = periodIndexLeftOfCursor + 2;
        }
        this.editor.replaceRange(currentSentence, { line: line, ch: replaceOffset }, { line: line, ch: absolutePeriodIndexRightOfCursor + 1 });
        this.editor.setCursor(cursorPosition);
    };
    ExtractHighlightsPlugin.prototype.toggleFullLine = function () {
        var cursorPosition = this.editor.getCursor();
        var lineText = this.editor.getLine(cursorPosition.line);
        var highlightedLine = "";
        var startPosition;
        var endPosition;
        if (lineText.startsWith("==") && lineText.endsWith("==")) {
            highlightedLine = lineText.replace(/==/g, "");
            startPosition = { line: cursorPosition.line, ch: 0 };
            endPosition = { line: cursorPosition.line, ch: highlightedLine.length + 4 };
        }
        else {
            highlightedLine = "==" + lineText + "==";
            startPosition = { line: cursorPosition.line, ch: 0 };
            endPosition = { line: cursorPosition.line, ch: highlightedLine.length };
        }
        this.editor.replaceRange(highlightedLine, startPosition, endPosition);
        this.editor.setCursor(cursorPosition);
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
                result += "- " + removeDoubleSpaces;
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
            navigator.clipboard.writeText(data);
            return "Highlights copied to clipboard!";
        }
        else {
            return "No highlights found";
        }
    };
    return ExtractHighlightsPlugin;
}(obsidian.Plugin));

module.exports = ExtractHighlightsPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzLnRzIiwic3JjL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIudHMiLCJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzIHtcbiAgcHVibGljIGhlYWRsaW5lVGV4dDogc3RyaW5nO1xuICBwdWJsaWMgYWRkRm9vdG5vdGVzOiBib29sZWFuO1xuICBwdWJsaWMgdXNlQm9sZEZvckhpZ2hsaWdodHM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZWFkbGluZVRleHQgPSBcIlwiO1xuICAgIHRoaXMuYWRkRm9vdG5vdGVzID0gZmFsc2U7XG4gICAgdGhpcy51c2VCb2xkRm9ySGlnaGxpZ2h0cyA9IGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0cHJpdmF0ZSByZWFkb25seSBwbHVnaW46IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luKSB7XG5cdCAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuXHQgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXHR9XG4gIFxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHQgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gIFxuXHQgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gIFxuXHQgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkV4dHJhY3QgSGlnaGxpZ2h0cyBQbHVnaW5cIiB9KTtcblx0ICBcblx0ICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHQuc2V0TmFtZShcIkhlYWRpbmcgVGV4dFwiKVxuXHRcdC5zZXREZXNjKFwiSWYgc2V0LCB3aWxsIGFkZCBgIyMgWW91ciBUZXh0YC4gVXNlICROT1RFX1RJVExFIHRvIGluY2x1ZGUgdGl0bGUuIExlYXZlIGJsYW5rIHRvIG9taXQuIFwiKVxuXHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdCAgdGV4dFxuXHRcdFx0LnNldFBsYWNlaG9sZGVyKFwiSGlnaGxpZ2h0cyBmb3IgJE5PVEVfVElUTEVcIilcblx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkbGluZVRleHQpXG5cdFx0XHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHQgIHRoaXMucGx1Z2luLnNldHRpbmdzLmhlYWRsaW5lVGV4dCA9IHZhbHVlO1xuXHRcdFx0ICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cdFx0XHR9KVxuXHRcdCk7XG5cblx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0LnNldE5hbWUoJ1VzZSBib2xkIGZvciBoaWdobGlnaHRzJylcblx0XHQuc2V0RGVzYyhcblx0XHQgICdJZiBlbmFibGVkLCB3aWxsIGluY2x1ZGUgY2xhc3NpYyBtYXJrZG93biBib2xkICgqKikgc2VjdGlvbnMgYXMgaGlnaGxpZ2h0cycsXG5cdFx0KVxuXHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHQgIHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cykub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VCb2xkRm9ySGlnaGxpZ2h0cyA9IHZhbHVlO1xuXHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdCAgfSksXG5cdFx0KTtcblxuXHRcblx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0LnNldE5hbWUoJ0VuYWJsZSBGb290bm90ZXMnKVxuXHRcdC5zZXREZXNjKFxuXHRcdCAgJ0lmIGVuYWJsZWQsIHdpbGwgYWRkIGEgZm9vdG5vdGUgdG8gdGhlIGN1cnJlbnQgZG9jdW1lbnQgdG8gZWFjaCBoaWdobGlnaHQgaW4geW91ciBsaXN0LiBVc2VmdWwgd2hlbiB5b3Ugd2FuIHRvIGtlZXAgdHJhY2sgb2Ygd2hpY2ggaGlnaGxpZ2h0IGNhbWUgZnJvbSB3aGljaCBzb3VyY2UgZmlsZS4nLFxuXHRcdClcblx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0ICB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWRkRm9vdG5vdGVzKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZEZvb3Rub3RlcyA9IHZhbHVlO1xuXHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuXHRcdCAgfSksXG5cdFx0KTtcbiAgXG5cdH1cbn0iLCJpbXBvcnQge1BsdWdpbiwgTm90aWNlLCBhZGRJY29uLCBWaWV3LCBNYXJrZG93blZpZXd9IGZyb20gXCJvYnNpZGlhblwiXG5pbXBvcnQgRXh0cmFjdEhpZ2hsaWdodHNQbHVnaW5TZXR0aW5ncyBmcm9tIFwiLi9FeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzXCJcbmltcG9ydCBFeHRyYWN0SGlnaGxpZ2h0c1BsdWdpblNldHRpbmdzVGFiIGZyb20gXCIuL0V4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWJcIlxuaW1wb3J0IHtQb3NpdGlvbn0gZnJvbSBcImNvZGVtaXJyb3JcIjtcblxuYWRkSWNvbigndGFyZ2V0JywgJzxwYXRoIGQ9XCJNNTAgODhDMjkuMDEzMiA4OCAxMiA3MC45ODY4IDEyIDUwQzEyIDI5LjAxMzIgMjkuMDEzMiAxMiA1MCAxMkM3MC45ODY4IDEyIDg4IDI5LjAxMzIgODggNTBDODcuOTc2MSA3MC45NzY5IDcwLjk3NjkgODcuOTc2MSA1MCA4OFpNNTAgMjIuODU3MUMzNS4wMDk0IDIyLjg1NzEgMjIuODU3MSAzNS4wMDk0IDIyLjg1NzEgNTBDMjIuODU3MSA2NC45OTA2IDM1LjAwOTQgNzcuMTQyOSA1MCA3Ny4xNDI5QzY0Ljk5MDYgNzcuMTQyOSA3Ny4xNDI5IDY0Ljk5MDYgNzcuMTQyOSA1MEM3Ny4xNDI5IDM1LjAwOTQgNjQuOTkwNiAyMi44NTcxIDUwIDIyLjg1NzFaTTUwIDY2LjI4NTdDNDEuMDA1NiA2Ni4yODU3IDMzLjcxNDMgNTguOTk0MyAzMy43MTQzIDUwQzMzLjcxNDMgNDEuMDA1NiA0MS4wMDU2IDMzLjcxNDMgNTAgMzMuNzE0M0M1OC45OTQzIDMzLjcxNDMgNjYuMjg1NyA0MS4wMDU2IDY2LjI4NTcgNTBDNjYuMjg1NyA1NC4zMTkyIDY0LjU2OTkgNTguNDYxNiA2MS41MTU3IDYxLjUxNTdDNTguNDYxNiA2NC41Njk5IDU0LjMxOTIgNjYuMjg1NyA1MCA2Ni4yODU3WlwiIGZpbGw9XCIjNjQ2NDY0XCIvPicpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcblxuXHRwdWJsaWMgc2V0dGluZ3M6IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3M7XG5cdHB1YmxpYyBzdGF0dXNCYXI6IEhUTUxFbGVtZW50XG5cdHB1YmxpYyBjb3VudGVyOiAwO1xuXHRwcml2YXRlIGVkaXRvcjogQ29kZU1pcnJvci5FZGl0b3I7XG5cblx0YXN5bmMgb25sb2FkKCkge1xuXHRcdHRoaXMuY291bnRlciA9IDA7XG5cdFx0dGhpcy5sb2FkU2V0dGluZ3MoKTtcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuXHRcdHRoaXMuc3RhdHVzQmFyID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKClcblxuXHRcdHRoaXMuYWRkUmliYm9uSWNvbigndGFyZ2V0JywgJ0V4dHJhY3QgSGlnaGxpZ2h0cycsICgpID0+IHtcblx0XHRcdHRoaXMuZXh0cmFjdEhpZ2hsaWdodHMoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudChcblx0XHRcdHRoaXMuYXBwLm9uKCdjb2RlbWlycm9yJywgKGNtOiBDb2RlTWlycm9yLkVkaXRvciB8IE1hcmtkb3duVmlldykgPT4ge1xuXHRcdFx0XHRpZiAoJ3NvdXJjZU1vZGUnIGluIGNtKSB7XG5cdFx0XHRcdFx0dGhpcy5lZGl0b3IgPSBjbS5zb3VyY2VNb2RlLmNtRWRpdG9yO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZWRpdG9yID0gY207XG5cdFx0XHRcdH1cblx0XHRcdH0pLFxuXHRcdCk7XG5cblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6IFwic2hvcnRjdXQtZXh0cmFjdC1oaWdobGlnaHRzXCIsXG5cdFx0XHRuYW1lOiBcIlNob3J0Y3V0IGZvciBleHRyYWN0aW5nIGhpZ2hsaWdodHNcIixcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmV4dHJhY3RIaWdobGlnaHRzKCksXG5cdFx0XHRob3RrZXlzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiLCBcIlNoaWZ0XCJdLFxuXHRcdFx0XHRcdGtleTogXCLCsVwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogXCJzaG9ydGN1dC1oaWdobGlnaHQtc2VudGVuY2VcIixcblx0XHRcdG5hbWU6IFwiU2hvcnRjdXQgZm9yIGhpZ2hsaWdodGluZyBzZW50ZW5jZSBjdXJzb3IgaXMgaW5cIixcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLnRvZ2dsZUxpbmVIaWdobGlnaHQoKSxcblx0XHRcdGhvdGtleXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1vZGlmaWVyczogW1wiQWx0XCIsIFwiU2hpZnRcIl0sXG5cdFx0XHRcdFx0a2V5OiBcIuKAlFwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9KTtcblx0fVxuXG5cdGxvYWRTZXR0aW5ncygpIHtcblx0XHR0aGlzLnNldHRpbmdzID0gbmV3IEV4dHJhY3RIaWdobGlnaHRzUGx1Z2luU2V0dGluZ3MoKTtcblx0XHQoYXN5bmMgKCkgPT4ge1xuXHRcdCAgY29uc3QgbG9hZGVkU2V0dGluZ3MgPSBhd2FpdCB0aGlzLmxvYWREYXRhKCk7XG5cdFx0ICBpZiAobG9hZGVkU2V0dGluZ3MpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiRm91bmQgZXhpc3Rpbmcgc2V0dGluZ3MgZmlsZVwiKTtcblx0XHRcdHRoaXMuc2V0dGluZ3MuaGVhZGxpbmVUZXh0ID0gbG9hZGVkU2V0dGluZ3MuaGVhZGxpbmVUZXh0O1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5hZGRGb290bm90ZXMgPSBsb2FkZWRTZXR0aW5ncy5hZGRGb290bm90ZXM7XG5cdFx0ICB9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2coXCJObyBzZXR0aW5ncyBmaWxlIGZvdW5kLCBzYXZpbmcuLi5cIik7XG5cdFx0XHR0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuXHRcdCAgfVxuXHRcdH0pKCk7XG5cdH1cblxuXHRleHRyYWN0SGlnaGxpZ2h0cygpOiB2b2lkIHtcblx0XHRsZXQgYWN0aXZlTGVhZjogYW55ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYgPz8gbnVsbFxuXG5cdFx0dHJ5IHtcblx0XHRcdGlmIChhY3RpdmVMZWFmPy52aWV3Py5kYXRhKSB7XG5cdFx0XHRcdGxldCBoaWdobGlnaHRzVGV4dCA9IHRoaXMucHJvY2Vzc0hpZ2hsaWdodHMoYWN0aXZlTGVhZi52aWV3KTtcblx0XHRcdFx0bGV0IHNhdmVTdGF0dXMgPSB0aGlzLnNhdmVUb0NsaXBib2FyZChoaWdobGlnaHRzVGV4dCk7XG5cdFx0XHRcdG5ldyBOb3RpY2Uoc2F2ZVN0YXR1cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXcgTm90aWNlKFwiTm8gaGlnaGxpZ2h0cyB0byBleHRyYWN0LlwiKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhlLm1lc3NhZ2UpXG5cdFx0fVxuXHR9XG5cblx0dG9nZ2xlSGlnaGxpZ2h0KCkge1xuXHRcdHRoaXMudG9nZ2xlTGluZUhpZ2hsaWdodCgpO1xuXHRcdC8vIHRoaXMudG9nZ2xlRnVsbExpbmUoKTtcblx0fVxuXG5cdHRvZ2dsZUxpbmVIaWdobGlnaHQoKSB7XG5cdFx0Y29uc3QgY3Vyc29yUG9zaXRpb24gPSB0aGlzLmVkaXRvci5nZXRDdXJzb3IoKTtcblx0XHRjb25zdCBjaCA9IGN1cnNvclBvc2l0aW9uLmNoO1xuXHRcdGNvbnN0IGxpbmUgPSBjdXJzb3JQb3NpdGlvbi5saW5lO1xuXHRcdGNvbnN0IGxpbmVUZXh0ID0gdGhpcy5lZGl0b3IuZ2V0TGluZShjdXJzb3JQb3NpdGlvbi5saW5lKTtcblxuXHRcdGNvbnN0IGFsbFRleHRMZWZ0T2ZDdXJzb3IgPSBsaW5lVGV4dC5zdWJzdHIoMCwgY3Vyc29yUG9zaXRpb24uY2gpO1xuXHRcdGNvbnN0IGFsbFRleHRSaWdodE9mQ3Vyc29yID0gbGluZVRleHQuc3Vic3RyKGN1cnNvclBvc2l0aW9uLmNoKTtcblxuXG5cdFx0XHRsZXQgcGVyaW9kSW5kZXhMZWZ0T2ZDdXJzb3IgPSBhbGxUZXh0TGVmdE9mQ3Vyc29yLmxhc3RJbmRleE9mKFwiLlwiKTtcblxuXHRcdFx0aWYocGVyaW9kSW5kZXhMZWZ0T2ZDdXJzb3IgPT0gLTEpIHsgcGVyaW9kSW5kZXhMZWZ0T2ZDdXJzb3IgPSAwOyB9XG5cblx0XHRcdGxldCBzZW50ZW5jZVVudGlsTGVmdE9mQ3Vyc29yID0gYWxsVGV4dExlZnRPZkN1cnNvci5zdWJzdHIocGVyaW9kSW5kZXhMZWZ0T2ZDdXJzb3IsIGNoIC0gcGVyaW9kSW5kZXhMZWZ0T2ZDdXJzb3IpO1xuXG5cdFx0XHRpZihzZW50ZW5jZVVudGlsTGVmdE9mQ3Vyc29yLnN0YXJ0c1dpdGgoXCIuIFwiKSkge1xuXHRcdFx0XHRzZW50ZW5jZVVudGlsTGVmdE9mQ3Vyc29yID0gc2VudGVuY2VVbnRpbExlZnRPZkN1cnNvci5yZXBsYWNlKFwiLiBcIiwgXCJcIilcblx0XHRcdH1cblxuXHRcdFx0bGV0IHBlcmlvZEluZGV4UmlnaHRPZkN1cnNvciA9IGFsbFRleHRSaWdodE9mQ3Vyc29yLmluZGV4T2YoXCIuXCIpO1xuXG5cdFx0XHRpZihwZXJpb2RJbmRleFJpZ2h0T2ZDdXJzb3IgPT0gLTEpIHtcblx0XHRcdFx0cGVyaW9kSW5kZXhSaWdodE9mQ3Vyc29yID0gYWxsVGV4dFJpZ2h0T2ZDdXJzb3IubGVuZ3RoXG5cdFx0XHR9XG5cblx0XHRcdGxldCBzZW50ZW5jZVVudGlsUmlnaHRPZkN1cnNvciA9IGFsbFRleHRSaWdodE9mQ3Vyc29yLnN1YnN0cigwLCBwZXJpb2RJbmRleFJpZ2h0T2ZDdXJzb3IgKyAxKTtcblx0XHRcdGxldCBjdXJyZW50U2VudGVuY2UgPSBzZW50ZW5jZVVudGlsTGVmdE9mQ3Vyc29yICsgc2VudGVuY2VVbnRpbFJpZ2h0T2ZDdXJzb3I7XG5cdFx0XHRsZXQgYWJzb2x1dGVQZXJpb2RJbmRleFJpZ2h0T2ZDdXJzb3IgPSBwZXJpb2RJbmRleFJpZ2h0T2ZDdXJzb3IgKyBhbGxUZXh0TGVmdE9mQ3Vyc29yLmxlbmd0aDtcblxuXHRcdFx0Y3VycmVudFNlbnRlbmNlID0gXCI9PVwiICsgY3VycmVudFNlbnRlbmNlICsgXCI9PVwiO1xuXG5cdFx0XHRsZXQgcmVwbGFjZU9mZnNldCA9IHBlcmlvZEluZGV4TGVmdE9mQ3Vyc29yO1xuXG5cdFx0XHRpZihhbGxUZXh0TGVmdE9mQ3Vyc29yLmNvbnRhaW5zKFwiLlwiKSkge1xuXHRcdFx0XHRyZXBsYWNlT2Zmc2V0ID0gcGVyaW9kSW5kZXhMZWZ0T2ZDdXJzb3IgKyAyXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZWRpdG9yLnJlcGxhY2VSYW5nZShjdXJyZW50U2VudGVuY2UsIHtsaW5lOiBsaW5lLCBjaDogcmVwbGFjZU9mZnNldH0sIHtsaW5lOiBsaW5lLCBjaDogYWJzb2x1dGVQZXJpb2RJbmRleFJpZ2h0T2ZDdXJzb3IgKyAxfSk7XG5cdFx0XHR0aGlzLmVkaXRvci5zZXRDdXJzb3IoY3Vyc29yUG9zaXRpb24pO1xuXG5cblx0fVxuXG5cdHRvZ2dsZUZ1bGxMaW5lKCkge1xuXHRcdGNvbnN0IGN1cnNvclBvc2l0aW9uID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yKCk7XG5cdFx0bGV0IGxpbmVUZXh0ID0gdGhpcy5lZGl0b3IuZ2V0TGluZShjdXJzb3JQb3NpdGlvbi5saW5lKTtcblxuXHRcdGxldCBoaWdobGlnaHRlZExpbmUgPSBcIlwiO1xuXHRcdGxldCBzdGFydFBvc2l0aW9uOiBQb3NpdGlvbjtcblx0XHRsZXQgZW5kUG9zaXRpb246IFBvc2l0aW9uO1xuXG5cdFx0aWYobGluZVRleHQuc3RhcnRzV2l0aChcIj09XCIpICYmIGxpbmVUZXh0LmVuZHNXaXRoKFwiPT1cIikpIHtcblx0XHRcdGhpZ2hsaWdodGVkTGluZSA9IGxpbmVUZXh0LnJlcGxhY2UoLz09L2csIFwiXCIpO1xuXHRcdFx0c3RhcnRQb3NpdGlvbiA9IHtsaW5lOiBjdXJzb3JQb3NpdGlvbi5saW5lLCBjaDogMH07XG5cdFx0XHRlbmRQb3NpdGlvbiA9IHtsaW5lOiBjdXJzb3JQb3NpdGlvbi5saW5lLCBjaDogaGlnaGxpZ2h0ZWRMaW5lLmxlbmd0aCArIDR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoaWdobGlnaHRlZExpbmUgPSBcIj09XCIgKyBsaW5lVGV4dCArIFwiPT1cIjtcblx0XHRcdHN0YXJ0UG9zaXRpb24gPSB7bGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IDB9O1xuXHRcdFx0ZW5kUG9zaXRpb24gPSB7bGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IGhpZ2hsaWdodGVkTGluZS5sZW5ndGh9O1xuXHRcdH1cblxuXHRcdHRoaXMuZWRpdG9yLnJlcGxhY2VSYW5nZShoaWdobGlnaHRlZExpbmUsIHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcblx0XHR0aGlzLmVkaXRvci5zZXRDdXJzb3IoY3Vyc29yUG9zaXRpb24pO1xuXHR9XG5cblx0cHJvY2Vzc0hpZ2hsaWdodHModmlldzogYW55KTogc3RyaW5nIHtcblxuXHRcdHZhciByZTtcblxuXHRcdGlmKHRoaXMuc2V0dGluZ3MudXNlQm9sZEZvckhpZ2hsaWdodHMpIHtcblx0XHRcdHJlID0gLyg9PXxcXDxtYXJrXFw+fFxcKlxcKikoW1xcc1xcU10qPykoPT18XFw8XFwvbWFya1xcPnxcXCpcXCopL2c7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlID0gLyg9PXxcXDxtYXJrXFw+KShbXFxzXFxTXSo/KSg9PXxcXDxcXC9tYXJrXFw+KS9nO1xuXHRcdH1cblxuXHRcdGxldCBkYXRhID0gdmlldy5kYXRhO1xuXHRcdGxldCBiYXNlbmFtZSA9IHZpZXcuZmlsZS5iYXNlbmFtZTtcblx0XHRsZXQgbWF0Y2hlcyA9IGRhdGEubWF0Y2gocmUpO1xuXHRcdHRoaXMuY291bnRlciArPSAxO1xuXG5cdFx0Y29uc29sZS5sb2cobWF0Y2hlcy5sZW5ndGgpO1xuXG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cblx0XHRpZiAobWF0Y2hlcyAhPSBudWxsKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmhlYWRsaW5lVGV4dCAhPSBcIlwiKSB7IFxuXHRcdFx0XHRsZXQgdGV4dCA9IHRoaXMuc2V0dGluZ3MuaGVhZGxpbmVUZXh0LnJlcGxhY2UoL1xcJE5PVEVfVElUTEUvLCBgJHtiYXNlbmFtZX1gKVxuXHRcdFx0XHRyZXN1bHQgKz0gYCMjICR7dGV4dH1cXG5gO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBlbnRyeSBvZiBtYXRjaGVzKSB7XG5cdFx0XHRcdHZhciByZW1vdmVOZXdsaW5lID0gZW50cnkucmVwbGFjZSgvXFxuL2csIFwiIFwiKTtcblx0XHRcdFx0bGV0IHJlbW92ZUhpZ2hsaWdodFN0YXJ0ID0gcmVtb3ZlTmV3bGluZS5yZXBsYWNlKC89PS9nLCBcIlwiKVxuXHRcdFx0XHRsZXQgcmVtb3ZlSGlnaGxpZ2h0RW5kID0gcmVtb3ZlSGlnaGxpZ2h0U3RhcnQucmVwbGFjZSgvXFw8bWFya1xcPi9nLCBcIlwiKVxuXHRcdFx0XHRsZXQgcmVtb3ZlTWFya0Nsb3NpbmcgPSByZW1vdmVIaWdobGlnaHRFbmQucmVwbGFjZSgvXFw8XFwvbWFya1xcPi9nLCBcIlwiKVxuXHRcdFx0XHRsZXQgcmVtb3ZlQm9sZCA9IHJlbW92ZU1hcmtDbG9zaW5nLnJlcGxhY2UoL1xcKlxcKi9nLCBcIlwiKVxuXHRcdFx0XHRsZXQgcmVtb3ZlRG91YmxlU3BhY2VzID0gcmVtb3ZlQm9sZC5yZXBsYWNlKFwiICBcIiwgXCIgXCIpO1xuXG5cdFx0XHRcdHJlbW92ZURvdWJsZVNwYWNlcyA9IHJlbW92ZURvdWJsZVNwYWNlcy5yZXBsYWNlKFwiICBcIiwgXCIgXCIpO1xuXHRcdFx0XHRyZW1vdmVEb3VibGVTcGFjZXMgPSByZW1vdmVEb3VibGVTcGFjZXMudHJpbSgpO1xuXG5cdFx0XHRcdHJlc3VsdCArPSBcIi0gXCIgKyByZW1vdmVEb3VibGVTcGFjZXNcblxuXHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmFkZEZvb3Rub3Rlcykge1xuXHRcdFx0XHRcdHJlc3VsdCArPSBgW14ke3RoaXMuY291bnRlcn1dYDtcblx0XHRcdFx0fSBcblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcXG5cIjtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5hZGRGb290bm90ZXMpIHtcblx0XHRcdFx0cmVzdWx0ICs9IFwiXFxuXCJcblx0XHRcdFx0cmVzdWx0ICs9IGBbXiR7dGhpcy5jb3VudGVyfV06IFtbJHtiYXNlbmFtZX1dXVxcbmBcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0ICs9IFwiXFxuXCI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdHNhdmVUb0NsaXBib2FyZChkYXRhOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGlmIChkYXRhLmxlbmd0aCA+IDApIHtcblx0XHRcdG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGRhdGEpO1xuXHRcdFxuXHRcdFx0cmV0dXJuIFwiSGlnaGxpZ2h0cyBjb3BpZWQgdG8gY2xpcGJvYXJkIVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gXCJObyBoaWdobGlnaHRzIGZvdW5kXCI7XG5cdFx0fVxuXHR9XG59XG4iXSwibmFtZXMiOlsiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJhZGRJY29uIiwiTm90aWNlIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUss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QUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdB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
