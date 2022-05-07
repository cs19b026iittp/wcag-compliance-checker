===========================================================================================================================================================
# W-Confirm  (VS-Code Extension)

Thought 
===================

There is a need to reduce obstacles for all individuals, irrespective of their shortcomings, to access content on the web. 

. Web Content Accessibility Guidelines (WCAG) is developed through the W3C process in cooperation with individuals and organisations around the world to provide a single shared standard for web content accessibility that meets the needs of individuals, organisations, and governments internationally.

The proposal is to create an extension for a popular IDE which reminds and gives hints to the developer during the development phase of the website. 


Overview:-
================================
 Here we tried to developan vs-code extension that would help the developer to follow the rules based on wcag 2.1 by suggestingto  him at the time he develops the website.
   
 This extension helps the developer by suggesting the necessary attributes to a tag that would make the website wcag compliant.
  
  
 Working Procedure
 ===============================
  If the user runs thevs codee extension alongside his/herHTMLl code andCSSs file
  
 The tag  that are not following the compliance are being highlighted using the green colour.
 The tags thatdoesn'tt follow the rules according to theCSSs styling are highlighted in re, which implies that the corresponding classhasg someissuee as shown in the hover message related tothe CSSs used.
 
 Thiss completelydepends onn the developer, as the way each developer wants to createa  website is different
 The user gets the option to get input from the use  the first time hover over the highlighted tags
   input options :
    The inputis takene for the first time of hover on the highlghted tags.
     For the html tag if the user inputs language he gets lang attribute added to the code {according to the guideline 3.1.1 Language of page (A)}
     For the form tag if the user inputs role he gets role attribute added to the code [according to the guideline 1.3.1 info and relationships]
     For the div tag if the user inputs y he gets aria-label attribute added to the code [according to the guideline]
     For the html tag if the user inputs language he gets lang attribute added to the code [according to the guideline]
     For the input tag with type image if the user inputs alt he gets alt attribute added to the code [according to the guideline  1.3.5 input purpose]
     For the input tag with type text the user inputs autocomplete he gets autocomplete attribute added to the code [according to the guideline 1.3.5 input purpose]
     For anchor tag user needs to enter the description if he wants. Then the description gets added to the anchor tag [guideline 2.4.4 Link Purpose]
     
 Based onCSSs anchor and button tags get highlighted if they violate the guidelines [red colour]
 
 Forthe  anchor tag we have checked for the font stylei.e.e, it is better to use strong instead of italic.
 Forthe  button tag we have checked for the contrast colour to beat leastt 1.5.
  We check the contrast ratio for the input. { The contrast ration is for clear visibility }
 We check forthe guidelinese Label in Name {With the arialabelledbyy attribute, authors can use a visible text element on the page as a label for a focusable element (a   form control or a link}  
  
 
 On hovering over the tags  ,the  developer gets toknow theeattributes theye can use wrt that particular tag
 
 
 The architecture of the Project
 ================================================
 ![WhatsApp Image 2022-05-05 at 2 11 47 PM](https://user-images.githubusercontent.com/74318644/167257844-a94349b4-9e2e-4489-973b-bf0ab911bddc.jpeg)
 
 Working
 ================================================
 
 Highlighting
 
 ![Screenshot (290)](https://user-images.githubusercontent.com/74318644/166159750-6c99b666-6793-44e8-b3ad-a8ead0c0ad5e.png)
 
 Taking Input
 
![Screenshot (291)](https://user-images.githubusercontent.com/74318644/166159810-dbc5438a-b8ab-43b9-8216-6f0c3657c662.png)


 Language Used
 =================================
 Typescriptt
 
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
To add some more guidelines. 
