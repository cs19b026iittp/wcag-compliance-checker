// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { off } from 'process';
import { cursorTo } from 'readline';
import * as vscode from 'vscode';
import { TSMap } from "typescript-map"

let decorationsArray: vscode.DecorationOptions[] = [];
let remove_decorations: vscode.DecorationOptions[] = [];
let decorated: number[] = [];


const decorationType = vscode.window.createTextEditorDecorationType({
	// backgroundColor: 'green',
	border: '1px solid green',
	
});

const rem_decorationType = vscode.window.createTextEditorDecorationType({
	border: 'none',
});





let src_code : string[];

function hover(
	i: number,
	j: number,
	k: number,
	active: vscode.TextEditor,
	end_tag: number,
): void {
	vscode.languages.registerHoverProvider('html', {
		async provideHover(document, position, token) {
			console.log("inside hover");
			const range = document.getWordRangeAtPosition(position);
			const word = document.getText(range);

			console.log(word);

			
			// let decoration1 = {range1};
			// if (position.character>=j && position.character<=k && position.line==i)  {
				var flag_hover = 0;
				if(position.line==i){
				if (word == "input") {
					const markdown = new vscode.MarkdownString('');
					const markdown1 = new vscode.MarkdownString('');
					
					// var selectedText;
					if(! decorated.includes(i)){
						const s4 = '<h4>enter alt tag</h4>'
						markdown.appendMarkdown(s4);
						const s5 = '<a href = "https://code.visualstudio.com/api/references/vscode-api#workspace"> anchor <\a>';
						markdown.appendMarkdown(s5);
						markdown.supportHtml=true;
						markdown.isTrusted=true;
					const selectedText = await vscode.window.showInputBox();
					decorated.push(i);
					// {
					// 	placeHolder: "Search query",
					// 	prompt: "Search my snippets on Codever",
					// 	value: selectedText
	  				// }
	  				// if(searchQuery === ''){
					// 	console.log(searchQuery);
					// 	vscode.window.showErrorMessage('A search query is mandatory to execute this action');
	  				// }

					console.log("__________________________________________");
					console.log(selectedText);
					console.log("__________________________________________");

					if(selectedText === "y"){
						flag_hover=1;
						console.log("changing code");
						var z:string;
						var z1 = src_code[end_tag].indexOf("/>")
						var s1= src_code[end_tag].substring(0,z1);

						z=s1+"   alt="+"\""+"\""+"/>";
						active.edit(editBuilder =>{
							var line = active.document.lineAt(end_tag);
							var e=line.range.end.character;
							var sp = new vscode.Position(end_tag,0);
							var ep = new vscode.Position(end_tag,e+1);
							var range = new vscode.Range(sp,ep);
							editBuilder.replace(range,z);
							range = new vscode.Range(new vscode.Position(i, j),new vscode.Position(i, j + k));
							let d1 = { range };
							console.log("::::::::::::::::::::::::::::::::::::::::::::::::::");
							remove_decorations.push(d1);
							active.setDecorations(rem_decorationType,remove_decorations);
						})

						
					}
					else {
						console.log("wrong input");
					}
				}
					
						return	new vscode.Hover(markdown,new vscode.Range(position,position));
					
				}
				// message to appear for the form tag
				else if (word == "form") {
					return {
						contents: ["Include role"]
					}
				}
				else if (word == "label") {
					return {
						contents: ["use for attribute in label tag to represent id attribue in input tag "],

					}
				}
				else if (word == "nav") {
					return {
						contents: ["attach an aria-label attribute to your navigation to give users of assistive technology as much information as possible"]
					}
				}
				else if (word == "head") {
					return {
						contents: ["Using a Title is suggested as it gives better information about the data"]
					}
				}
			}
			return {
				contents: [],
			}

		}
	}); 
}


function highlight_keyword1(
	x: any,
	y: any,
	z: any,
	t: any,
	i: any,
	i1:any,
	j: any,
	k: any,
	p: any,
	decorationsArray: vscode.DecorationOptions[],
	active : vscode.TextEditor,
) : void{
	let regex1;
	if (y == "image" && z == "alt") {	// highlight input if alt is not present
	  regex1 = /(alt)/;
	}
	var flag=0;
	console.log("inside function");
	for(var a=i;a<=i1;a++) {
		console.log("highlight");
		let m1 = x[a].match(regex1);
		if (m1 !== null && m1.index !== undefined) {
		  // console.log(src_code[i]);
		} else {
			flag=1;
			break;
		}
	  }
	  if(flag==1){
		  console.log("inside flag");
		let range = new vscode.Range(
			new vscode.Position(t, j),
			new vscode.Position(t, j + k)
		  );
		  let decoration = { range };
			// decorated_range.push(range);
		  decorationsArray.push(decoration);  // adding elements to the decoraton array
		  console.log("go to hover");
		  hover(t,j,k,active,i1);
	  }
	}

function highlight_keyword(		// for highlighting the keyword
	x: any,
	y: any,
	z: any,
	i: any,
	i1: any,
	j: any,
	k: any,
	p: any,
	decorationsArray: vscode.DecorationOptions[], // to store the elements for decoration
	active: vscode.TextEditor
): void {
	let regex1;
	// highlight form tag if the role is nt assigned
	if (y == "form" && z == "role") {
		regex1 = /(role)/;
	}
	// checking for the presence of action in case of form
	else if (y == "form" && z == "action") {
		regex1 = /(action)/
	}
	// checking for the presence of lang in case of html tag
	else if (y == "html" && z == "lang") {
		regex1 = /(lang)/
	} else if (y == "label" && z == "for") {
		regex1 = /(for)/
	}
	else if (y == "nav" && z == "aria-label") {
		regex1 = /(aria-label)/
	}
	var flag=0;
	for(var a=i;a<=i1;a++) {
		console.log("highlight");
		let m1 = x[a].match(regex1);
		if (m1 !== null && m1.index !== undefined) {
		  // console.log(src_code[i]);
		} else {
			flag=1;
			break;
		}
	  }
	if(flag==1){
		let range = new vscode.Range(
			new vscode.Position(i, j),
			new vscode.Position(i, j + k)
		  );
		  let decoration = { range };
			// decorated_range.push(range);
		  decorationsArray.push(decoration);  // adding elements to the decoraton array
			hover(i,j,k,active,i1); 
	}
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// getting the active text editor
	const active = vscode.window.activeTextEditor;

	// no active editor
	if (!active)
		return;
	console.log('Congratulations, your extension "wcag-ext" is now active!');

	let disposable = vscode.commands.registerCommand('wcag-ext.helloWorld', () => {

		// keywords to check for
		let keywords = ["<input", "<a", "<form", "<html", "<div", "<label", "<nav", "<head"]

		for (var x in keywords) {
			console.log(keywords[x]);
		}


		vscode.workspace.openTextDocument(active.document.uri);  // opening the active document

		// to get the content of the file
		let result = active.document.getText();

		let regex;
		let match_keyword;


		// splitting the code line by line
		src_code = result.split('\n');
		

		// console.log("hii")
		for (let i = 0; i < src_code.length; i++) {
			for (let j = 0; j < keywords.length; j++) {
				if (src_code[i].includes(keywords[j])) {
					if(j == 0){
						
						regex = /(<input)/
						match_keyword = src_code[i].match(regex)
						if(match_keyword !==null && match_keyword.index !== undefined){
							let end_index=i;
							for(var k=i;k<src_code.length;k++){		// for finding the closing tag
								console.log(src_code[k]);
								if(src_code[k].includes("/>")){
									console.log(k);
									end_index=k;
									break;
								}
							}
							console.log(end_index);
							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							  );
							  console.log(s1);

							//   var flag1=0;
							  let type_index = i;
							  for(k=i;k<=end_index;k++){
								  if(src_code[k].includes("type=")){
							  		type_index=k;
									break;
								  }
							  }

							  for(var a=type_index;a<=end_index;a++){
								  if(src_code[a].includes("image")){
									  
									  highlight_keyword1(
										src_code,
										"image",
										"alt",
										i,
										a,
										end_index,
										match_keyword.index,
										match_keyword[1].length,
										1,
										decorationsArray,
										active
									  );
									  break;
								  }
								  else if(src_code[a].includes("text")){
									  
									highlight_keyword1(
									  src_code,
									  "text",
									  "autocomplete",
									  i,
									  a,
									  end_index,
									  match_keyword.index,
									  match_keyword[1].length,
									  1,
									  decorationsArray,
									  active
									);
									break;
								}
							  }
						}
					}
					if (j == 1) {
						// checking the compliance for the anchor tag
						regex = /(<a)/
						match_keyword = src_code[i].match(regex);
						// start of anchor tag found
						if (match_keyword != null && match_keyword.index !== undefined) {
							let regex1 = /(a>)/
							let m2 = src_code[i].match(regex1);

							if (m2 != null && m2.index !== undefined) {
								let x = m2.index
								let y = match_keyword.index + match_keyword[1].length

								let s1 = src_code[i].substring(y, x)
								let regex_a = /(>)/
								let ma = s1.match(regex_a);
								if (ma != null && ma.index !== undefined) {
									let z = ma.index
									s1 = s1.substring(z + 1, x)
								}
								console.log(s1)
								if (s1.length - 2 == 0) {
									let range = new vscode.Range(
										new vscode.Position(i, match_keyword.index),
										new vscode.Position(i, match_keyword.index + match_keyword[1].length)
									)
									let decoration = { range }

									decorationsArray.push(decoration)
								}

							}

						}


					}
					if (j == 2) {
						// checking the compliance for the form tag
						regex = /(<form)/
						match_keyword = src_code[i].match(regex)
						if (match_keyword != null && match_keyword.index !== undefined) {
							let end_index=i;
							for(var k=i;k<src_code.length;k++){		// for finding the closing tag
								console.log(src_code[k]);
								if(src_code[k].includes("</>")){
									console.log(k);
									end_index=k;
									break;
								}
							}
							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							);
							// checking if the role is included or not

							highlight_keyword(
								src_code,
								"form",
								"role=",
								i,
								end_index,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray,
								active
							);

							highlight_keyword(
								src_code[i],
								"form",
								"action",
								i,
								end_index,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray,
								active
							);
						}
					}
					if (j == 3) {

						// for chrcking the compliance wrt html tag
						regex = /(<html)/
						match_keyword = src_code[i].match(regex)
						if (match_keyword != null && match_keyword.index !== undefined) {
							let end_index=i;
							for(var k=i;k<src_code.length;k++){		// for finding the closing tag
								console.log(src_code[k]);
								if(src_code[k].includes(">")){
									console.log(k);
									end_index=k;
									break;
								}
							}
							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							);
							highlight_keyword(
								src_code,
								"html",
								"lang",
								i,
								end_index,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray,
								active
							);
						}


					}

					if (j == 6) {
						// checking compliance for the nav tag
						regex = /(<nav)/
						match_keyword = src_code[i].match(regex)
						if (match_keyword != null && match_keyword.index !== undefined) {
							let end_index=i;
							for(var k=i;k<src_code.length;k++){		// for finding the closing tag
								console.log(src_code[k]);
								if(src_code[k].includes(">")){
									console.log(k);
									end_index=k;
									break;
								}
							}
							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							);
							highlight_keyword(
								src_code[i],
								"nav",
								"aria-label",
								i,
								end_index,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray,
								active
							);
						}
					}


					if (j == 7) {
						// checking if the page has the title
						regex = /(<head)/
						match_keyword = src_code[i].match(regex)
						if (match_keyword != null && match_keyword.index !== undefined) {
							let regex1 = /(<title)/
							let regex3 = /(head>)/
							for (let w = i; w < src_code.length; w++) {
								console.log(w)
								console.log("title")
								let m_title = src_code[w].match(regex1)

								if (m_title != null && m_title.index !== undefined) {

								}
								else {
									let m_head_end = src_code[w].match(regex3)
									if (m_head_end != null && m_head_end !== undefined) {
										break;
									}
									else {
										let range = new vscode.Range(
											new vscode.Position(i, match_keyword.index),
											new vscode.Position(i, match_keyword.index + match_keyword[1].length)
										)
										let decoration = { range }

										decorationsArray.push(decoration)
									}

								}

							}
						}
					}



					if (j == 5) {
						regex = /(<label)/
						match_keyword = src_code[i].match(regex)
						if (match_keyword != null && match_keyword.index !== undefined) {
							let end_index=i;
							for(var k=i;k<src_code.length;k++){		// for finding the closing tag
								console.log(src_code[k]);
								if(src_code[k].includes(">")){
									console.log(k);
									end_index=k;
									break;
								}
							}
							let s1 = src_code[i].substring(
								match_keyword.index + match_keyword[1].length
							);
							highlight_keyword(
								src_code[i],
								"label",
								"for",
								i,
								end_index,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray,
								active
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

	// for taking input
	  
}

// this method is called when your extension is deactivated
export function deactivate() { }
