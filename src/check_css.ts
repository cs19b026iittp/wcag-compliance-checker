import { TextDecoder } from 'util';
import * as vscode from 'vscode';

var util = require('util');

   export async function css_file(){
      console.log("ClassA>method1"); 
      const active = vscode.window.activeTextEditor;
      if (!active)
		return;

        console.log(active.document.uri);
        console.log(active.document.uri.path);
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
        let source = await vscode.workspace.openTextDocument(setting);
          //  vscode.window.showTextDocument(source,vscode.ViewColumn.Beside,true).then(e => {
                console.log(source);
                s5 = source.getText();
                console.log(s5);
        
	console.log("-------------------------------------------------------------");

    let content = await vscode.workspace.fs.readFile(setting);
    console.log(new TextDecoder("utf-8").decode(content));
        let result = s5;

        let src_code = result.split('\n');

        let css_keywords = ["strong"]
        let regex,match_keyword;
        for (let i = 0; i < src_code.length; i++) {
			for (let j = 0; j < css_keywords.length; j++) {
                if (src_code[i].includes(css_keywords[j])) {
                    if(j==0){   // found strong 
                        regex = /(strong)/
                        match_keyword = src_code[i].match(regex)

                        if(match_keyword !==null && match_keyword.index !== undefined){
							let end_index=i;
							for(var k=i;k<src_code.length;k++){		// for finding the closing tag
								console.log(src_code[k]);
								if(src_code[k].includes("}")){
									console.log(k);
									end_index=k;
									break;
								}
							}
                            var font_size_ind;
                            for(var k=i; k<end_index;k++){
                                if(src_code[k].includes("font-size")){
                                    font_size_ind=k;
                                    var x = src_code[k].indexOf(":");
                                    var y;
                                    if(src_code[k].includes("%")){
                                        y = src_code[k].indexOf("%");
                                        var s = src_code[k].substring(x+1,y);
                                        var font_size_per: number = +s;
                                        if(font_size_per<=100){
                                             console.log("sholud be greater than 100 1.4.4")
                                        }
                                    }
                                    else if(src_code[k].includes("em")){
                                        y = src_code[k].indexOf("em");
                                        var s = src_code[k].substring(x+1,y);
                                        var font_size_per = parseFloat(s);
                                        if(font_size_per<=1){
                                             console.log("sholud be greater than 1 1.4.4")
                                        }
                                    }
                                    else{
                                        var s = src_code[k].substring(x+1);
                                        s.replace(/\s/g, "");
                                        if(s!="larger"){
                                            console.log("sholud be larger 1 1.4.4")
                                        }
                                    }
                                    
                                    break;
                                }
                            }
                            
                    }
                }
            }
        }

    } 
}