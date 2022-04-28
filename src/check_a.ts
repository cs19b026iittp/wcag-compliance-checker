import { TextDecoder } from 'util';
import * as vscode from 'vscode';

var util = require('util');

   export async function  css_file_a(model : {p1:string;p2:boolean}){
      console.log("ClassA>method1   ==================="); 
      const active = vscode.window.activeTextEditor;
      if (!active)
		return false;

        // console.log(active.document.uri);
        // console.log(active.document.uri.path);
        let s1 = active.document.uri.path;
        console.log(s1);
        var found_s = 0;
        for(var i=0;i<s1.length;i++){
            if(s1[i]=='/')
                found_s=i;
        }
        let s2 = s1.substring(0,found_s);
        console.log(s2);
        s2=s2+"/"+"styles.css";
        var setting: vscode.Uri = vscode.Uri.parse(s2);
        let s5 = "";
       // let source = await vscode.workspace.openTextDocument(setting);
         //       console.log(source);
           //     s5 = source.getText();
             //   console.log(s5);
	console.log("-------------------------------------------------------------");

    let content = await vscode.workspace.fs.readFile(setting);
   // console.log(new TextDecoder("utf-8").decode(content));

    s5 = new TextDecoder("utf-8").decode(content);
        
        let result = s5;

        let src_code = result.split('\n');
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(src_code);
        for (let i = 0; i < src_code.length; i++) {
                if (src_code[i].includes(model.p1)) {
                    console.log("_______________________________");
                   for(var j=i;j<src_code.length;j++){
                        for(var k=j+1;j<src_code.length;k++){
                            if(src_code[k]=="}"){
                                break;
                            }
                            if(src_code[k].includes("font-style")){
                                console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}");
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                var s = src_code[k].substring(x+1,y1);
                                console.log("======");
                                console.log(s);
                                console.log("=======");
                                s=s.replace(/\s/g, "");
                                if(s === "italic"){
                                    console.log("violating 1.4.4 2.0AA")
                                    
                                   model.p2=true;
                                }
                            }
                        }
                   }
            }
    } 
}