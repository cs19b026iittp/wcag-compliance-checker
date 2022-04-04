// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { cursorTo } from 'readline';
import * as vscode from 'vscode';
import { TSMap } from "typescript-map"

const decorationType = vscode.window.createTextEditorDecorationType({
	backgroundColor:'green',
	border: '2px solid white',
});



function highlight_keyword(		// for highlighting the keyword
	x: any,
	y: any,
	z: any,
	i: any,
	j: any,
	k: any,
	p: any,
	decorationsArray: vscode.DecorationOptions[]  // to store the elements for decoration
  ): void {
	let regex1;
	if (y == "image" && z == "alt") {	// highlight input if alt is not present
	  regex1 = /(alt)/;
	} else if (y == "text" && z == "autocomplete") {  // highlight the input of text type if autocomplete is not enabled
	  regex1 = /(autocomplete)/;
	} 
	// highlight form tag if the role is nt assigned
	else if (y == "form" && z == "role") {
	  regex1 = /(role)/;
	} else if(y=="html" && z=="lang"){
		regex1 = /(lang)/
	} else if(y=="label" && z=="for")
	{
		regex1=/(for)/
	}
	if (x.includes(y)) {
	  console.log("highlight");
	  let m1 = x.match(regex1);
	  if (m1 !== null && m1.index !== undefined) {
		// console.log(src_code[i]);
	  } else {
		let range = new vscode.Range(
		  new vscode.Position(i, j),
		  new vscode.Position(i, j + k)
		);
		let decoration = { range };
  
		decorationsArray.push(decoration);  // adding elements to the decoraton array

	  }
	}
  }
  

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	const active = vscode.window.activeTextEditor;

		if(!active)
			return;
	console.log('Congratulations, your extension "wcag-ext" is now active!');

	let disposable = vscode.commands.registerCommand('wcag-ext.helloWorld', () => {
		
		let keywords = ["<input","<a","<form","<html","<div","<label"]  // keyword to check 


		for(var x in keywords){
			console.log(keywords[x]);
		}


		vscode.workspace.openTextDocument(active.document.uri);  // opening the active document

		let result=active.document.getText();

		let regex;
		let match_keyword;
		let decorationsArray: vscode.DecorationOptions[] = [];

		const src_code = result.split('\n');
		
		// console.log("hii")
		for(let i=0;i<src_code.length;i++){   
			for(let j=0;j<keywords.length;j++){
				if(src_code[i].includes(keywords[j])){

					if(j == 0){
						regex = /(<input)/
						match_keyword = src_code[i].match(regex)
						if(match_keyword !==null && match_keyword.index !== undefined){

							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							  );
							  console.log(s1);
							  var ind1 = s1.indexOf("type=");

							  ind1 = ind1 + 5;
							  if (s1.substring(ind1).includes("image")) {
								highlight_keyword(
									src_code[i],
								//   s1.substring(ind1),
								  "image",

								  "alt",
								  i,
								  match_keyword.index,
								  match_keyword[1].length,
								  1,
								  decorationsArray
								);
							  }

							  if (s1.substring(ind1).includes("text")) { // highlighting the input 
								highlight_keyword(
								  s1.substring(ind1),
								  "text",
								  "autocomplete",
								  i,
								  match_keyword.index,
								  match_keyword[1].length,
								  1,
								  decorationsArray
								);
							  }
						}
					}
					if(j==1){
						// checking the compliance for the anchor tag
						regex = /(<a)/
						match_keyword = src_code[i].match(regex);
						// start of anchor tag found
						if(match_keyword != null && match_keyword.index!== undefined){
							let regex1=/(a>)/
							let m2 = src_code[i].match(regex1);
			
							if(m2!=null && m2.index!==undefined)
							{
								let x = m2.index
								let y = match_keyword.index + match_keyword[1].length
			
								let s1 = src_code[i].substring(y,x)
								let regex_a = /(>)/
								let ma = s1.match(regex_a);
								if(ma!=null && ma.index!==undefined){
									let z=ma.index
									s1=s1.substring(z+1,x)
								}
								console.log(s1)
								if(s1.length-2 == 0){
									let range = new vscode.Range(
										new vscode.Position(i,match_keyword.index),
										new vscode.Position(i,match_keyword.index + match_keyword[1].length)
									)
									let decoration = {range}
			
									decorationsArray.push(decoration)
								}
			
							}
			
						}


					}
					if(j==2){
						regex = /(<form)/
						match_keyword = src_code[i].match(regex)
						if(match_keyword != null && match_keyword.index!== undefined){
							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							  );
							highlight_keyword(
								src_code[i],
								"form",
								"role",
								i,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray
							  );
					}
					}
					if(j==3){
						// for chrcking the compliance wrt html tag
						regex = /(<html)/
						match_keyword = src_code[i].match(regex)
						if(match_keyword != null && match_keyword.index!== undefined){
							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							  );
							highlight_keyword(
								src_code[i],
								"html",
								"lang",
								i,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray
							  );
					    }
						
			        }
					if(j==5)
					{
						regex = /(<label)/
						match_keyword = src_code[i].match(regex)
						if(match_keyword != null && match_keyword.index!== undefined){
							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							  );
							highlight_keyword(
								src_code[i],
								"label",
								"for",
								i,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray
							  );
					    }
					}
			
	    }
	}

}
		active.setDecorations(decorationType, decorationsArray)
		console.log(result);
     
		vscode.window.showInformationMessage('Hello World from wcag-ext!');
	});

	context.subscriptions.push(disposable);


	vscode.languages.registerHoverProvider('html', {
		provideHover(document, position, token) {

			const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            if (word == "input") {

				return {
					contents: ["Include alt tag while using input tag"],
				  }
            }
			else if( word=="form")
			{
				return{
					   contents:["Include lang attribute for ease of change from one to another language "],
					
				}
			}
			else if( word=="label")
			{
				return{
					   contents:["use for attribute in label tag to represent id attribue in input tag "],
					
				}
			}
			return {
				contents:[],
			}
	
		}
	  });


}

// this method is called when your extension is deactivated
export function deactivate() {}
