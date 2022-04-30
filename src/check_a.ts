import { TextDecoder } from 'util';
import * as vscode from 'vscode';
var util = require('util');

let decorationsArray: vscode.DecorationOptions[] = [];

// for decorating the anchor tags which donot follow the guidelines
const decorationType = vscode.window.createTextEditorDecorationType({
	border: '1px solid red',
	
});

function hover_anchor():void{   // displaying the content on hover
    vscode.languages.registerHoverProvider('html', {
        async provideHover(document, position, token) {
            const s4 = '<h4>"italic style is used"</h4>'
            const markdown = new vscode.MarkdownString('');
            markdown.appendMarkdown(s4);
           // markdown.appendMarkdown("chnage the colours such that contrast ration is >=3 for clear visibility");
            markdown.appendMarkdown("violating 1.4.4 2.0AA"); 
            markdown.appendMarkdown("Use strong or em instead");  // content in the message
            markdown.supportHtml=true;
            markdown.isTrusted=true;
            return	new vscode.Hover(markdown,new vscode.Range(position,position));
        }
    });
}



   export async function  css_file_a(model : {p1:string;p2:boolean,p3:any,p4:any,p5:any}){
 
      const active = vscode.window.activeTextEditor;  // getting the active text editor
      if (!active)
		return false;

        let s1 = active.document.uri.path;  // getting the uri path
        console.log(s1);
        var found_s = 0;
        for(var i=0;i<s1.length;i++){   // parsing the uri to change it to get the css file
            if(s1[i]=='/')
                found_s=i;
        }
        let s2 = s1.substring(0,found_s);
        console.log(s2);
        s2=s2+"/"+"styles.css";
        var setting: vscode.Uri = vscode.Uri.parse(s2);
        let s5 = "";

    let content = await vscode.workspace.fs.readFile(setting);  // reading css file

    s5 = new TextDecoder("utf-8").decode(content);  // changing the utf-8 content to string
        
        let result = s5;

        let src_code = result.split('\n');
        console.log(src_code);
        for (let i = 0; i < src_code.length; i++) { // traversing 
                if (src_code[i].includes(model.p1)) {
                   for(var j=i;j<src_code.length;j++){
                        for(var k=j+1;j<src_code.length;k++){
                            if(src_code[k]=="}"){
                                break;
                            }
                            if(src_code[k].includes("font-style")){ // seraching for the font style
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                var s = src_code[k].substring(x+1,y1);
                                s=s.replace(/\s/g, "");
                                if(s === "italic"){     // if font style is italic
                                    console.log("-----");
                                   model.p2=true;
                                   let range = new vscode.Range(
                                    new vscode.Position(model.p5, model.p3),
                                    new vscode.Position(model.p5, model.p3 + model.p4)
                                  );
                                  let decoration = { range };
                                  decorationsArray.push(decoration);
                                   hover_anchor();      // for the hovering message
                                }
                            }
                        }
                   }
            }
    } 
    active.setDecorations(decorationType, decorationsArray); // setting the secorations
}