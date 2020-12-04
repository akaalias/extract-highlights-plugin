import 'mocha';
import { assert } from 'chai';
import ToggleHighlight from "../src/ToggleHighlight";

let subject: ToggleHighlight = null;

describe("Toggle Highlights", () => {
    before(async () => {
        subject = new ToggleHighlight();
    });

    describe("Empty input", () => {
        it("Returns an empty string", () => {
            const result = subject.toggleHighlight("");
            assert.equal(result, "");
        });
    });

    describe("Turning Highlights on", () => {
        it("Returns a highlighted string", () => {
            const result = subject.toggleHighlight("Foo");
            assert.equal(result, "==Foo==");

        });

        it("Returns first highlighted sentence with cursor position 0", () => {
            const result = subject.toggleHighlight("Foo. Bar.", 0);
            assert.equal(result, "==Foo.== Bar.");
        });

        it("Returns second highlighted sentence with cursor position 4", () => {
            const result = subject.toggleHighlight("Foo. Bar.", 4);
            assert.equal(result, "Foo. ==Bar.==");
        });

        it("Returns second highlighted sentence with cursor position 6", () => {
            const result = subject.toggleHighlight("Foo. Bar.", 6);
            assert.equal(result, "Foo. ==Bar.==");
        });

        it("Returns no highlighted sentence with cursor position 9", () => {
            const result = subject.toggleHighlight("Foo. Bar.", 9);
            assert.equal(result, "Foo. Bar.");
        });
    });
});