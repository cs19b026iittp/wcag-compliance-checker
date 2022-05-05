import { TextDecoder } from 'util';
import * as vscode from 'vscode';

var util = require('util');

let decorationsArray: vscode.DecorationOptions[] = [];

let hb1:number,hb2:number;
// for decorating the button tags which donot follow the guidelines
const decorationType = vscode.window.createTextEditorDecorationType({
	border: '1px solid red',
	
});

function hover_button():void{   // displaying the content on hover
vscode.languages.registerHoverProvider('html', {
    async provideHover(document, position, token) {
        var x=hb1,y=hb2;
        const range = document.getWordRangeAtPosition(position);
		const word = document.getText(range);
        const markdown = new vscode.MarkdownString('');
        
         
        if(word == "p" && y==1){ // for contrast ratio 4.5
            const s4 = '<h4>Keep suitable contrast ratio</h4>'
        markdown.appendMarkdown(s4);
        console.log("markdown = ", markdown)
        //markdown.appendMarkdown("chnage the colours such that contrast ration is >=3 for clear visibility");
        markdown.appendMarkdown("violating 1.4.3 contrast(minimum)          ");
            markdown.appendMarkdown("text");
            markdown.appendMarkdown("change the colours such that contrast ration is >=4.5 for clear visibility");
		    markdown.supportHtml=true;
		    markdown.isTrusted=true;
		    // return	{
            //     value: markdown.value,
            //     language: 'html'
            // };
            return	new vscode.Hover(markdown,new vscode.Range(position,position));
        }
        else if(word == "p" && y==2){// for contrast ratio 3
            const s4 = '<h4>Keep suitable contrast ratio</h4>'
        markdown.appendMarkdown(s4);
        //markdown.appendMarkdown("chnage the colours such that contrast ration is >=3 for clear visibility");
        markdown.appendMarkdown("violating 1.4.3 contrast(minimum)          ");
            markdown.appendMarkdown("text");
            markdown.appendMarkdown("chnage the colours such that contrast ration is >=3 for clear visibility");
            markdown.supportHtml=true;
		    markdown.isTrusted=true;
		    // return	new vscode.Hover({
            //         value: "poorna",
            //         language: 'html'
            //     });
            return	new vscode.Hover(markdown,new vscode.Range(position,position));
        }
    }
});
}

    // for checking css related to text
   export async function  css_file_txt(model : {p1:string;p2:boolean,p3:any,p4:any,p5:any,p6:any}){
       hover_button();
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
        console.log(model.p1);
        let bc="",c="",fw="",fs="";
        for (let i = 0; i < src_code.length; i++) {
                if (src_code[i].includes(model.p1)) { // searchong for class
                    var flag_cr=0;
                    var type =0;
                        for(var k=i+1;k<src_code.length;k++){
                            if(src_code[k].includes("}")){ // end of class
                                flag_cr=1;
                                break;
                            }
                            if(src_code[k].includes("font-size")){  // checking for the font-size
                                // getting the colour
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                fs = src_code[k].substring(x+1,y1);
                                fs=fs.replace(/\s/g, "");
                                fs=fs.substring(0,fs.length-2);
                                
                            }

                            if(src_code[k].includes("font-weight")){  // checking for the font-weight
                                // getting the colour
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                fw = src_code[k].substring(x+1,y1);
                                fw=fw.replace(/\s/g, "");
                            }

                            if(src_code[k].includes("background-color")){   // checking for background colour
                                // getting the background colour
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                bc = src_code[k].substring(x+1,y1);
                                bc=bc.replace(/\s/g, "");
                                //console.log(bc);
                            }
                            else if(src_code[k].includes("color")){  // checking for color
                                // getting the colour
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                c = src_code[k].substring(x+1,y1);
                                c=c.replace(/\s/g, "");
                                //console.log(c);
                            }
                        }
                        if(flag_cr==1){
                            break;
                        }
                    }
        }
                        var bold_type=0; // for is_bold type
                        if(fs==""){
                            fs="0";
                        }
                        var fs_val: number = +fs;  // convert string to int
                        if(fw == "bold"){
                            bold_type=1;
                        }
                       
                   var c_r=0;
                   // setting up some values and their corresponding values
                   var colours = ["red","blue","white","yellow","orange"]
                   var values = [4,2.21,8.52,8.28,6.04]

                   var contrast_ratio_val = values[colours.indexOf(c)]/values[colours.indexOf(bc)];
                   if((fs_val<18 && bold_type==0 )||(fs_val<14 && bold_type==1) ){
                       // font size < 18 and text is not bold
                        if(contrast_ratio_val < 4.5){
                            // contrast value is less than 4.5
                            model.p2=true;
                            // decorations
                            let range = new vscode.Range(
                                new vscode.Position(model.p5, model.p3),
                                new vscode.Position(model.p5, model.p3 + model.p4)
                        );
                       let decoration = { range };
                       decorationsArray.push(decoration); 
                       hb1=model.p6,hb2=1;
                    //    hover_button(model.p6,1);
                    }  
                    }
                    
                    if((fs_val>=18 && bold_type==0 )||(fs_val>=14 && bold_type==1) ){
                        // font size >=18 and text is not bold
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
                       hb1=model.p6,hb2=2;
                    //    hover_button(model.p6,2);
                    }  
                    }
                 
    active.setDecorations(decorationType, decorationsArray);
}