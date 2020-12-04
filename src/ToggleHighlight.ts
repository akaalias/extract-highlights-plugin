export default class ToggleHighlight {

    toggleHighlight(s: string, ch?: number) {
        console.log(s);
        console.log(ch);

        if(s == "") return "";

        // insert cursor-marker
        let left = s.substring(0, ch);
        let right = s.substring(ch, s.length);
        let markedLine = left + "$CURSOR$" + right;

        if(ch != null) {

            if(ch == s.length) { return s; }

            const parts = markedLine.split(".");

            if(ch <= 0) { return "==" + parts[0].replace("$CURSOR$", "") + ".== " + parts[1].trimLeft() + "."; }

            let result = ""

            for (let entry of parts) {
                if(entry.indexOf("$CURSOR$") >= 0) {
                    entry = entry.replace("$CURSOR$", "");
                    entry = ". ==" + entry.trimLeft() + ".==";
                }
                result += entry;
            }

            return result;
        } else {
            return `==${s}==`;
        }
    }
}