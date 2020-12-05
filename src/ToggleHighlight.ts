export default class ToggleHighlight {

    toggleHighlight(s: string, ch?: number) {
        if(s == "") return "";
        if(s.indexOf(".") < 0) { return "==" + s + "=="}

        let left = s.substring(0, ch);
        let right = s.substring(ch);
        let marked = left + "$CURSOR$" + right;

        // https://regex101.com/r/BSpvV6/7
        // https://stackoverflow.com/a/5553924
        let p = marked.match(/(==(.*?)==)|[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/gm);

        let np = new Array();

        if(p.length > 0) {
            p.forEach(function (part) {
                if(typeof part !== 'undefined' ) {
                    if(part.trim() == "") {  return; }

                    if(part.includes("$CURSOR$")) {

                        if(part.startsWith("==") && part.endsWith("==")) {
                            part = part.replace(/==/g, "");
                        } else {
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
    }
}