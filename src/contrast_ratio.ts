import { TextDecoder } from 'util';
import * as vscode from 'vscode';

var util = require('util');

   export async function  css_file_a(model : {p1:string;p2:boolean}){
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
        s2=s2+"/"+"styles.css";
        var setting: vscode.Uri = vscode.Uri.parse(s2);
        let s5 = "";
       
	console.log("-------------------------------------------------------------");

    let content = await vscode.workspace.fs.readFile(setting);
   // console.log(new TextDecoder("utf-8").decode(content));

    s5 = new TextDecoder("utf-8").decode(content);
        
        let result = s5;

        let src_code = result.split('\n');
        console.log(src_code);
        let bc="",c="";
        for (let i = 0; i < src_code.length; i++) {
                if (src_code[i].includes(model.p1)) {
                    console.log("_______________________________");
                   for(var j=i;j<src_code.length;j++){
                        for(var k=j+1;j<src_code.length;k++){
                            if(src_code[k]=="}"){
                                break;
                            }
                            if(src_code[k].includes("background-color")){
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                bc = src_code[k].substring(x+1,y1);
                                bc=bc.replace(/\s/g, "");
                            }
                            if(src_code[k].includes("color")){
                                var x = src_code[k].indexOf(":");
                                var y1 = src_code[k].indexOf(";");
                                c = src_code[k].substring(x+1,y1);
                                c=c.replace(/\s/g, "");
                            }

                        }
                   }
                   var c_r=0;
                //    var bc_val=0;
                //    var c_var = 0;
                   var colours = ["red","blue","white","yellow","orange"]
                   var values = [4,2.21,8,52,8.28,6.04]

                   var contrast_ratio_val = values[colours.indexOf(c)]/values[colours.indexOf(bc)];
                   if(contrast_ratio_val < 3){
                       model.p2=true;
                   }
               

                
            }
    } 
}