// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { off } from 'process';
import { cursorTo } from 'readline';
import * as vscode from 'vscode';
import { TSMap } from "typescript-map"
import * as fs from "fs";
import {css_file} from './check_css'
import {css_file_a} from './check_a'
import {css_file_cr} from './contrast_ratio'


let decorationsArray: vscode.DecorationOptions[] = []; // array for decorating the tags
let decorated: number[] = [];

let a_hover="";
let button_css="";

const decorationType = vscode.window.createTextEditorDecorationType({
	// backgroundColor: 'green',
	border: '1px solid green',
	
});
 
let src_code : string[]; // source code

// function to get class name

function get_class_name(
	src_code:any,
	i:any
):string{
	var class_name = "";
	for(var k1 = 0;k1<src_code[i].length;k1++){
		if(src_code[i].charAt(k1)=='"'){
			for(var k2 = k1+1;k2<src_code[i].length;k2++){
				if(src_code[i].charAt(k2)=='"'){
					// getting the class name to check css
					class_name=src_code[i].substring(k1+1,k2);
					break;
				}
			}
		}
	}
	return class_name;
}
// altering the code if the user wants to
function alter_code(
	tag:string,
	s:any,
	end_tag:number,
	s1:string,
	active: vscode.TextEditor,
	desc: any,
):void{
	var z:string;
	var z1 = src_code[end_tag].indexOf(s1)
	var s1= src_code[end_tag].substring(0,z1);
	if(tag=="html")	// adding lang attribute for the html tag
		z=s1+" lang="+"\""+"\""+">";
	else if(tag == "input")
		z=s1+" alt="+"\""+"\""+"/>";
	else if(tag == "div")
		z=s1+" aria-label="+"\""+"\""+">"+src_code[end_tag].substring(z1+1);
	else if(tag == "a")  // adding description for the a tag
		z=s1+src_code[end_tag][z1]+desc+src_code[end_tag].substring(z1+1);
	else if(tag == "label")   // adding for attribute for the label tag
		z=s1+" for="+"\""+"\""+">"+src_code[end_tag].substring(z1+1);
	else if(tag == "form")  // adding role attribute for the form tag
		z=s1+" role="+"\""+"\""+">"+src_code[end_tag].substring(z1+1);

	// for changing the content in the editor
	active.edit(editBuilder =>{  
		var line = active.document.lineAt(end_tag);
		var e=line.range.end.character;
		var sp = new vscode.Position(end_tag,0);
		var ep = new vscode.Position(end_tag,e+1);
		var range = new vscode.Range(sp,ep);
		// replacing the line with updated
		editBuilder.replace(range,z);  
		})
}

// for getting the hover message
function hover(
	i: any,
	j: any,
	k: any,
	active: vscode.TextEditor,  // active text editor
	end_tag: any,
): void {
	vscode.languages.registerHoverProvider('html', {
		async provideHover(document, position, token) {
			console.log("inside hover");
			const range = document.getWordRangeAtPosition(position);
			const word = document.getText(range);

			console.log(word);
				var flag_hover = 0;
				if(position.line==i){
					const markdown = new vscode.MarkdownString('');
					// hover over on input tag
				if (word == "input") {
					// content to be displayed in the hover message
					const s4 = '<h4>enter alt tag</h4>'
					markdown.appendMarkdown(s4);
					const s5 = '<a href = "https://code.visualstudio.com/api/references/vscode-api#workspace"> anchor <\a>';
					markdown.appendMarkdown(s5);
					markdown.supportHtml=true;
					markdown.isTrusted=true;
					
					if(! decorated.includes(i)){
						decorated.push(i);
						// getting the input from the user whether he would like to alter code or not
						const selectedText = await vscode.window.showInputBox({
							placeHolder: "enter y to get alt tag"
						});
						// if user wants to alter the code
						if(selectedText === "y"){
						flag_hover=1;
						// calling the alter code functon 
						alter_code("input",src_code,end_tag,"/>",active,selectedText);
					}
					else {
						console.log("wrong input");
					}
				}
						// returning the content to be displayed on hover
						return	new vscode.Hover(markdown,new vscode.Range(position,position));
					
				}
				else if (word == "form") {
					const s4 = '<h4>enter role attribute</h4>'
					markdown.appendMarkdown(s4);
					markdown.supportHtml=true;
					markdown.isTrusted=true;
					if(! decorated.includes(i)){
						decorated.push(i);
						// getting the input from the user
						const  a_desc = await vscode.window.showInputBox({
							placeHolder: "enter descrption for the anchor tag"
						});
						// if user wants to alter his code
						if(a_desc === "y"){
							alter_code("form",src_code,end_tag,">",active,a_desc);
					    }
					}
					// returning the content to be displayed on hover
					return	new vscode.Hover(markdown,new vscode.Range(position,position));
				}
				else if (word == "label") { // message to appear for the label tag
					const s4 = '<h4>enter for attribute</h4>'
					markdown.appendMarkdown(s4);
					markdown.supportHtml=true;
					markdown.isTrusted=true;
					if(! decorated.includes(i)){
						decorated.push(i);
						// getting the user input
						const a_desc = await vscode.window.showInputBox({
							placeHolder: "enter y to get role attribute"
						});
						if(a_desc === "y"){
						alter_code("label",src_code,end_tag,">",active,a_desc);
					    }
					}
					return	new vscode.Hover(markdown,new vscode.Range(position,position));
				}
				else if (word == "div") {
					const s4 = '<h4>enter for attribute</h4>'
					markdown.appendMarkdown(s4);
					markdown.supportHtml=true;
					markdown.isTrusted=true;
					if(! decorated.includes(i)){
						decorated.push(i);
						const a_desc = await vscode.window.showInputBox({
							placeHolder: "enter y to get aria-label attribute"
						});
						if(a_desc === "y"){
						alter_code("div",src_code,end_tag,">",active,a_desc);
					    }
					}
					return	new vscode.Hover(markdown,new vscode.Range(position,position));
				}
				else if (word == "head") {  // for the head attribute
					return {
						contents: ["Enter title"],
					}
				}
				else if(word == "html"){  // for html tag
					const s4 = '<h4>enter lang attribute</h4>'
					markdown.appendMarkdown(s4);
					markdown.supportHtml=true;
					markdown.isTrusted=true;
					if(! decorated.includes(i)){
						decorated.push(i);
						const a_desc = await vscode.window.showInputBox({
							placeHolder: "enter y to get lang attribute"
						});
						if(a_desc === "y"){
						alter_code("html",src_code,end_tag,">",active,a_desc);
					    }
					}
					return	new vscode.Hover(markdown,new vscode.Range(position,position));
				}
				else if(word == "a"){  // checking for the anchor tag to have description
					if(! decorated.includes(i)){
						decorated.push(i);
						// to get description from the user
						const a_desc = await vscode.window.showInputBox();
						if(a_desc !== "undefined"){
							alter_code("a",src_code,end_tag,">",active,a_desc);
						}
					}
					return	new vscode.Hover(markdown,new vscode.Range(position,position));
				}
				
			}
			return {
				contents: [],
			}

		}
	}); 
}


// for highlighting the 
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
	if(y == "a"){
		flag=1;
	}
	
	console.log("inside function");
	for(var a=i;a<=i1 && flag==0;a++) {
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
			console.log(y);
		regex1 = /(for)/
	}
	else if (y == "div" && z == "aria-label") {
		regex1 = /(aria-label)/
	}
	var flag=0;
	for(var a=i;a<=i1;a++) {
		console.log("highlight");
		console.log(x[a]);
		let m1 = x[a].match(regex1);
		if (m1 !== null && m1.index !== undefined) {
		  // console.log(src_code[i]);
		} else {
			flag=1;
			break;
		}
	  }
	  console.log(flag);
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
	console.log(active.document.uri);
	console.log('Congratulations, your extension "wcag-ext" is now active!');

	let disposable = vscode.commands.registerCommand('wcag-ext.helloWorld', () => {
		// keywords 
		let keywords = ["<input", "<a", "<form", "<html", "<nav", "<label", "<div", "<head", "<button"]

		// vscode.workspace.onDidChangeTextDocument(function (event){
		//	decorationsArray.length=0;
		vscode.workspace.openTextDocument(active.document.uri);  // opening the active document

		// to get the content of the file
		let result = active.document.getText();

	//	console.log(result);

		let regex;
		let match_keyword;


		// splitting the code line by line
		src_code = result.split('\n');
		

		// console.log("hii")
		
		for (let i = 0; i < src_code.length; i++) {
			for (let j = 0; j < keywords.length; j++) {
				if (src_code[i].includes(keywords[j])) {
					if(j == 0){
						// for the input tag
						regex = /(<input)/
						match_keyword = src_code[i].match(regex)
						if(match_keyword !==null && match_keyword.index !== undefined){  // found input
							let end_index=i;
							for(var k=i;k<src_code.length;k++){		// for finding the closing tag
								console.log(src_code[k]);
								if(src_code[k].includes("/>")){
									console.log(k);
									end_index=k;
									break;
								}
							}
							// parsing for the search of type
							  let type_index = i;
							  for(k=i;k<=end_index;k++){
								  if(src_code[k].includes("type=")){
							  		type_index=k;
									break;
								  }
							  }
							  // for getting the class name
							  var class_name = get_class_name(src_code,i);	
							  var a = match_keyword.index;
							  var b = match_keyword[1].length;	
								// getting the class name to check css
								const bar = { p1: class_name, p2: false, p3:a,p4:b,p5:i,p6:j};
								let xx = css_file_cr(bar);
							  // image type
							  for(var a=type_index;a<=end_index;a++){
								  if(src_code[a].includes("image")){
									  // for highlighting the keywords
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
								  else if(src_code[a].includes("text")){  // input of type text
									  
									highlight_keyword1(
									  src_code,
									  "text",
									  "autocomplete", // checking for autocomplete
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
							if(src_code[i].includes("class=")){	// to get the class
								var c_i = src_code[i].indexOf("class=");
								c_i+=7;
							}
							var a = match_keyword.index;
							var b = match_keyword[1].length;
							// checking for the css adherence
							var class_name="";
							for(var k1 = 0;k1<src_code[i].length;k1++){
								if(src_code[i].charAt(k1)=='"'){
									for(var k2 = k1+1;k2<src_code[i].length;k2++){
										if(src_code[i].charAt(k2)=='"'){
											// getting the class name to check css
											class_name=src_code[i].substring(k1+1,k2);
											const bar = { p1: class_name, p2: false, p3:a,p4:b,p5:i};
											let xx = css_file_a(bar).then(undefined,err=>{
												console.log("italic used");
											});
											break;
										}
									}
								}
							}
							// checking for the description for the anchor tag
							let regex1 = /(a>)/
							let m2 = src_code[i].match(regex1);

							if (m2 != null && m2.index !== undefined) { // found closing a tag
								let x = m2.index
								let y = match_keyword.index + match_keyword[1].length

								let s1 = src_code[i].substring(y, x)
								let regex_a = /(>)/	// to get the end of <a href="">
								let ma = s1.match(regex_a);
								if (ma != null && ma.index !== undefined) {
									let z = ma.index
									s1 = s1.substring(z + 1, x)
								}
								// no description available for the anchor tag
								if (s1.length - 2 == 0) {
									let range = new vscode.Range(
										new vscode.Position(i, match_keyword.index),
										new vscode.Position(i, match_keyword.index + match_keyword[1].length)
									)
									let decoration = { range }
									// pushing it to the decoration array
									decorationsArray.push(decoration)
									// highligting the tag
									highlight_keyword1(
										src_code,
										"a",
										"",
										i,
										i,
										i,
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
							// checking if the role is included or not

							highlight_keyword(
								src_code,
								"form",
								"role",
								i,
								end_index,
								match_keyword.index,
								match_keyword[1].length,
								1,
								decorationsArray,
								active
							);

							highlight_keyword(
								src_code,
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
							// check for lang attribute and hghlight it accordingly
							highlight_keyword(
								src_code,
								"html",
								"lang",
								i,
								i,
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
						regex = /(<div)/
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
							highlight_keyword(
								src_code,
								"div",
								"aria-label", // checking for aria-label
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
							let regex1 = /(<title)/ // checking for the title for the page
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
										// getting the range
										let range = new vscode.Range(
											new vscode.Position(i, match_keyword.index),
											new vscode.Position(i, match_keyword.index + match_keyword[1].length)
										)
										let decoration = { range }
										// pushing it to the decorations array
										decorationsArray.push(decoration)
									}

								}

							}
						}
					}
					if (j == 5) {  // for the label tag
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
							highlight_keyword(
								src_code,
								"label",
								"for",  // checking for the for attribute
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

					if(j==8){		// for button
						regex = /(<button)/
						match_keyword = src_code[i].match(regex)
						if (match_keyword != null && match_keyword.index !== undefined) {
							var b_flag=0;
							if(src_code[i].includes("class=")){	// to get the class
								var c_i = src_code[i].indexOf("class=");
								c_i+=7;
							}
							var a = match_keyword.index;
							var b = match_keyword[1].length;
							var class_name="";
							for(var k1 = 0;k1<src_code[i].length;k1++){
								if(src_code[i].charAt(k1)=='"'){
									for(var k2 = k1+1;k2<src_code[i].length;k2++){
										if(src_code[i].charAt(k2)=='"'){
											// getting the class name
											class_name=src_code[i].substring(k1+1,k2);
											const bar = { p1: class_name, p2: false, p3:a,p4:b,p5:i,p6:j};
											// highlight and hover if the css doesnt follow r
											 let xx = css_file_cr(bar);
										}
									}
								}
								
							}
							
						}
					}
				}
			}

		}
	
		active.setDecorations(decorationType, decorationsArray)
		console.log(result);
	// });
		vscode.window.showInformationMessage('Hello World from wcag-ext!');
	});

	context.subscriptions.push(disposable);

	// for taking input
	  
}

// this method is called when your extension is deactivated
export function deactivate() { }
