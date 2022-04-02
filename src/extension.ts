// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const decorationType = vscode.window.createTextEditorDecorationType({
	backgroundColor:'green',
	border: '2px solid white',
})

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	const active = vscode.window.activeTextEditor;

		if(!active)
			return;

	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "wcag-ext" is now active!');

	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('wcag-ext.helloWorld', () => {
				
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.workspace.openTextDocument(active.document.uri);

		let result=active.document.getText();

		let regex1 = /(<input)/
		let regex2 = /(<a)/
		let regex3 = /(<html)/

		let decorationsArray: vscode.DecorationOptions[] = [];

		const src_code = result.split('\n');
		
		for(let i=0;i<src_code.length;i++){

			let match1 = src_code[i].match(regex1);
			let match2 = src_code[i].match(regex2);
			let match3 = src_code[i].match(regex3)

			if(match1 !==null && match1.index!== undefined){
				//console.log(src_code[i]);
				let regex1=/(alt)/
				let m1 = src_code[i].match(regex1);

				if(m1!==null && m1.index!==undefined)
				{
					console.log(src_code[i]);
				}
				else{
					let range = new vscode.Range(
						new vscode.Position(i,match1.index),
						new vscode.Position(i,match1.index + match1[1].length)
					)
					let decoration = {range}

					decorationsArray.push(decoration)
					vscode.languages.registerHoverProvider('javascript', {
						provideHover(document,position,token){
							const range = document.getWordRangeAtPosition(position);
            				const word = document.getText(range);

            				if (word == "HELLO") {

                				return new vscode.Hover({
                   				 language: "Hello language",
                   				 value: "Hello Value"
               		 			});
            				}
						}	
					});
				}
			}

			if(match2 != null && match2.index!== undefined){
				console.log(src_code[i]);
				let regex1=/(a>)/
				let m2 = src_code[i].match(regex1);

				if(m2!=null && m2.index!==undefined)
				{
					let x = m2.index
					let y = match2.index + match2[1].length

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
							new vscode.Position(i,match2.index),
							new vscode.Position(i,match2.index + match2[1].length)
						)
						let decoration = {range}

						decorationsArray.push(decoration)
					}

				}

			}
			if(match3 != null && match3.index!== undefined){
				console.log(src_code[i]);
				let regl=/(lang)/
				let ml = src_code[i].match(regl);

				if(ml!=null && ml.index!==undefined)	// lang found
				{

				}
				else{		// not found highlight
					let range = new vscode.Range(
						new vscode.Position(i,match3.index),
						new vscode.Position(i,match3.index + match3[1].length)
					)
					let decoration = {range}

					decorationsArray.push(decoration)
				}
		}
		}
		active.setDecorations(decorationType, decorationsArray)
		console.log(result);

		vscode.window.showInformationMessage('Hello World from wcag-ext!');
	});

	context.subscriptions.push(disposable);

	// let hover = vscode.languages.registerHoverProvider('type script', {
	// 	provideHover(document, position, token) {
	// 		const range = document.getWordRangeAtPosition(position);
    //         const word = document.getText(range);

    //         if (word == "HELLO") {

    //             return new vscode.Hover({
    //                 language: "Hello language",
    //                 value: "Hello Value"
    //             });
    //         }
	// 	}
	//   });

}

// this method is called when your extension is deactivated
export function deactivate() {}
