# wcag-ext README

This is the README for your extension "wcag-ext". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

===========================================================================================================================================================
# W-Confirm  (VS-Code Extension)

Thought 
===================

There is a need to reduce obstacles for all individuals, irrespective of their shortcomings, to access content on the web. 

. Web Content Accessibility Guidelines (WCAG) is developed through the W3C process in cooperation with individuals and organizations around the world, with a goal of providing a single shared standard for web content accessibility that meets the needs of individuals, organizations, and governments internationally.

The proposal is to create an extension for a popular IDE which reminds and gives hints to the developer during the web development. 

Over view:-
================================
 Here we tried to develop an vs-code extension that would help the developer to follow the rules by suggesting him at the time he develops the website.
   
 This extension helps the developer by suggesting the necessary attributes to a tag that would make the website wcag compliant.
  
  
  
 Working Procedure
 ===============================
  If the user runs the vscode extension alongside with his/her html code
  
 The tags  that are not following the compliance are being highlighted using the green colour
 
 On the first time hover over the highlighted tags 
  The user gets the option to get input from the user
   input options :
     For the html tag if the user inputs y he gets lang attribute added to the code [according to the guideline]
     For the form tag if the user inputs y he gets role attribute added to the code [according to the guideline]
     For the div tag if the user inputs y he gets aria-label attribute added to the code [according to the guideline]
     For the html tag if the user inputs y he gets lang attribute added to the code [according to the guideline]
     For the input tag with type image if the user inputs y he gets alt attribute added to the code [according to the guideline]
     For the input tag with type text the user inputs y he gets autocomplete attribute added to the code [according to the guideline]
     For anchor tag user needs to enter the description if he wants. Then the description gets added to the anchor tag [guideline]
     
 Based on css anchor and button tags get highlighted if they violate the guidelines [red colour]
 
 For anchor tag we have checked for the font style i.e, it is better to use strong instead of italic.
 For button tag we have checked for the contrast colour to be atleast 1.5
 
 On hovering over the tags, developer gets to know the attributes he/she can use wrt that particular tag
 
 
 Highlighting
 
 ![Screenshot (290)](https://user-images.githubusercontent.com/74318644/166159750-6c99b666-6793-44e8-b3ad-a8ead0c0ad5e.png)
 
 Taking Input
 
![Screenshot (291)](https://user-images.githubusercontent.com/74318644/166159810-dbc5438a-b8ab-43b9-8216-6f0c3657c662.png)


 Language Used
 =================================
 Type script
 
 Our Team
 ============================
 G Pavan Sahith, M Yethin Chandra Sai, K Pavan Kalyan, V Jaswanth, Gagan Hegde
 cs19b017,       cs19b026,              cs19b022,      cs19b042,   cs19b015
 
 Installation process
 =============================
 clone the git repository
 run npm i in your vscode to install the node modules
 debug the code 
 In the new vscode code editor write your code -> ctrl+shift+p to run the extension
 It will highlight the tags that violate the wcag compliance & displays the message on hover over the particular tag.
 ---------
 Go to vscode marketplace and search for wcag-ext and install it
 Open the code in the debug console -> ctrl+shift+p to run the extension.
 It will highlight the tags that violate the wcag compliance.
 
 Future Implementations
============================
To make the parser effecient.
To add some more guidelines. 
