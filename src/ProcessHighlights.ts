export default class ProcessHighlights {
    private includeBold: boolean;

    constructor(includeBold: boolean) {
        this.includeBold = includeBold;
    }
    
    process(data: string) {

        let re: RegExp;

        if(this.includeBold) {
            console.log("include Bold");
            re = /(==|\<mark\>|\*\*)([\s\S]*?)(==|\<\/mark\>|\*\*)/g;
        } else {
            console.log("Don't include Bold");
            re = /(==|\<mark\>)([\s\S]*?)(==|\<\/mark\>)/g;
        }

        let matches = data.match(re);

        var result = "";

        if(matches !== null) {
            for (let entry of matches) {
                var clean = "";
                clean = entry.replace(/==/g, "");
                clean = clean.replace(/\<mark\>/g, "");
                clean = clean.replace(/\<\/mark\>/g, "");
                clean = clean.replace(/\*\*/g, "");

                clean = "- " + clean;
                clean = clean + "\n";
                result += clean;
            }
        }

        return result;
    }
}
