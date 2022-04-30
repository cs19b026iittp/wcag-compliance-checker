import { TextDecoder } from 'util';
import * as vscode from 'vscode';

var util = require('util');

let decorationsArray: vscode.DecorationOptions[] = [];

// for decorating the button tags which donot follow the guidelines
const decorationType = vscode.window.createTextEditorDecorationType({
	border: '1px solid red',
	
});

function hover_button():void{   // displaying the content on hover
vscode.languages.registerHoverProvider('html', {
    async provideHover(document, position, token) {
        const s4 = '<h4>Keep suitable contrast ratio</h4>'
        const markdown = new vscode.MarkdownString('');
		markdown.appendMarkdown(s4);
		markdown.appendMarkdown("chnage the colours such that contrast ration is >=3 for clear visibility");
        markdown.appendMarkdown("violating 1.4.3 AA"); 
		markdown.supportHtml=true;
		markdown.isTrusted=true;
		return	new vscode.Hover(markdown,new vscode.Range(position,position));
    }
});
}


   export async function  css_file_cr(model : {p1:string;p2:boolean,p3:any,p4:any,p5:any}){
      const active = vscode.window.activeTextEditor;
      if (!active)
		return false;

        let s1 = active.document.uri.path;
        console.log(s1);
        var found_s = 0;
        for(var i=0;i<s1.length;i++){
            if(s1[i]=='/')
                found_s=i;
        }
        let s2 = s1.substring(0,found_s);
        console.log(s2);
        s2=s2+"/"+"styles.css";  // checking with the css file
        var setting: vscode.Uri = vscode.Uri.parse(s2);
        let s5 = "";

    let content = await vscode.workspace.fs.readFile(setting);
   // console.log(new TextDecoder("utf-8").decode(content));
 
    s5 = new TextDecoder("utf-8").decode(content); // to convert the data into string
        
        let result = s5;

        let src_code = result.split('\n');
        console.log(src_code);
        let bc="",c="";
        for (let i = 0; i < src_code.length; i++) {
                if (src_code[i].includes(model.p1)) {
                    var flag_cr=0;
                        for(var k=i+1;k<src_code.length;k++){
                            if(src_code[k].includes("}")){
                                flag_cr=1;
                                break;
                            }
                            if(src_code[k].includes("background-color")){ 
                                // getting the background colour
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                bc = src_code[k].substring(x+1,y1);
                                bc=bc.replace(/\s/g, "");
                            }
                            if(src_code[k].includes("color")){
                                // getting the colour
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                c = src_code[k].substring(x+1,y1);
                                c=c.replace(/\s/g, "");
                            }

                        }
                        console.log(c);
                        console.log(bc);
                   var c_r=0;
                   // setting up some values and their corresponding values
                   var colours = ["red","blue","white","yellow","orange"]
                   var values = [4,2.21,8.52,8.28,6.04]

                   var contrast_ratio_val = values[colours.indexOf(c)]/values[colours.indexOf(bc)];
                   if(contrast_ratio_val < 3){
                       // contrast value is less than 3
                       model.p2=true;
                       // decorations
                       let range = new vscode.Range(
                        new vscode.Position(model.p5, model.p3),
                        new vscode.Position(model.p5, model.p3 + model.p4)
                      );
                      let decoration = { range };
                      decorationsArray.push(decoration); 
                      hover_button();
                   }  
                
            }
    } 
    active.setDecorations(decorationType, decorationsArray);
}