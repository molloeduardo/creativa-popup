# Creativa - Popup
This is a simple library that allows you to create awesome popups importing just one JavaScript file.
## Getting started
You can import the JS file in two ways:
1. Using the HTTPS link to the file: https://creativajs.altervista.org/popup/0.2/creativa-popup.js
2. With offline file. If you want to use the offline file just download the archive, import the **creativa-popup.js** file in your project and use it into your HTML.
## Examples
Basic example:
```
<html>
    <head>
        <script src="https://creativajs.altervista.org/popup/0.2/creativa-popup.js"></script>
        <title>Creativa Popup - Example</title>
    </head>
    <body>
        <button onclick="popup()">Open popup</button>
    </body>
    <script>
        function popup() {
            CreativaPopup.create('This is the text of the popup.');
        }
    </script>
</html>
```
You can download the archive from GitHub and try the **example.html** file.
Or you can go here: https://creativajs.altervista.org/popup/0.2/example.html
## Where is the CSS?
The CSS will be automatically included from the **creativa-popup.js** file inside the HTML head. If this not happens or you want to use it locally, just import and use the CSS file too.
## Customizable
Every aspect of the popup is customizable.
## Responsive
The popup will adapt to every screen.
## Multiple popups
You can open multiple popups one over another.
## Tested browsers
- Chrome
- Firefox
- Microsoft Edge
- Safari

It doesn't work with the old Internet Explorer.
## Slow loading icons and CSS
The reason why the icons are loading too slow is that they are loaded from an external CDN. You can open the JavaScript file and replace that CDN link with your own local folder and put the icons inside it, so they will be loaded from your local storage. The same thing has to be done for the CSS file.
## Syntax
```
CreativaPopup.create('text', 'title', 'icon', options);
```
- ### Text
Here you can write the text that will be shown inside the popup. You can use HTML too.
- ### Title
This is a simple string that defines the title for the popup.
- ### Icon
This parameter defines the popup icon that will be on top of the box. You can use default icons:
- info
- success
- error

...or you can put your own URL (or local path) to the image of the icon (png, jpg, gif).
- ### Options
This is an object where you can specify other parameters to personalize the popup.
- **Image:** you can write the URL of an image that will be shown inside the popup.
```
// Including text content
CreativaPopup.create('Text', 'Title', 'icon', { image: 'imageURL or path' });
```
- **Content:** you can put a string that specify custom content for the poup (such as HTML, or other text) that will be shown under the text.
- **isPage**: this is a boolean that says if the content (specified above) is text content or it is an URL to another page that will be loaded as content inside the popup.
```
// Including text content
CreativaPopup.create('Text', 'Title', 'icon', { content: '<button>Test</button>' });

// Including content from another page
// This function does not work without an HTTP server due to Cross Origin problems.
CreativaPopup.create('Text', 'Title', 'icon', { content: 'another-page.html', isPage: true });
```
- **Unclosable popup:** you can specify this parameter to avoid the popup to close.
```
CreativaPopup.create('Text', 'Title', 'icon', { isBlocked: true });
```
- **Open/close animations:** the default open/close animation for the popup is the **card-bottom/card-top** but you can set other animations:
  - fade
  - bubble
  - card-left
  - card-right
  - card-bottom
  - card-top
  - newspaper
  - unfold
```
CreativaPopup.create('Text', 'icon', 'icon', { openAnimation: 'card-left', closeAnimation: 'card-right' });
```
... or you can create your own animation inside your CSS file. Just give a name to the animation and then add *-ct-popup-animation-open* or *-ct-popup-animation-close* at the end of the class name. For example, if my animation is called **dragon** I'll create the CSS animations with these names: **dragon-ct-popup-animation-open** and **dragon-ct-popup-animation-close** and inside the popup function I'll set the **dragon** string.
- **Custom speed animation:** you can change the open/close speed animation by setting the time in milliseconds. The default value is 150.
```
CreativaPopup.create('Text', 'Title', 'icon', { openAnimation: 'card-left', closeAnimation: 'card-right', animationSpeed: 400 });
```
- **Custom animation type:** you can change the animation type by setting the CSS timing function name. The default value is ***ease***.
```
CreativaPopup.create('Text', 'Title', 'icon', { animationType: 'ease-out' });
```
- **Custom size:** you can use different width and height for your popup.
```
CreativaPopup.create('Text', 'Title', 'icon', { width: '300px', height: '400px' });
```
This is CSS so you can use every type of unit of measure (px, %, em ecc...).
- **Positioning:** you can set the position of the popup (top, bottom).
```
CreativaPopup.create('Text', 'Title', 'icon', { position: 'top' });
CreativaPopup.create('Text', 'Title', 'icon', { position: 'bottom' });
```
- **Background color:** you can set the background color using HEX, RGB, RGBA codes.
```
// Red background using HEX code
CreativaPopup.create('Text', 'Title', 'icon', { bgColor: '#ff0000' });

// Red opaque background using HEX code with alpha
CreativaPopup.create('Text', 'Title', 'icon', { bgColor: '#ff000055' });

// Red background using RGB code.
CreativaPopup.create('Text', 'Title', 'icon', { bgColor: 'rgb(255, 0, 0)' });

// Red opaque background using RGBA code.
CreativaPopup.create('Text', 'Title', 'icon', { bgColor: 'rgba(255, 0, 0, 0.4)' });
```
- **Remove Background:** you can remove the background panel with this simple option.
```
CreativaPopup.create('Text', 'Title', 'icon', { background: true });
```
- **Remove Box Container:** you can remove the box container with this option.
```
CreativaPopup.create('Text', 'Title', 'icon', { box: false });
```
- **Title/text color:** you can set the title and text color using HEX, RGB, RGBA codes.
```
// Red title and text using HEX code
CreativaPopup.create('Text', 'icon', 'icon', { titleColor: '#ff0000', textColor: '#ff0000' });

// Red opaque title and text using HEX code with alpha
CreativaPopup.create('Text', 'icon', 'icon', { titleColor: '#ff000055', textColor: '#ff000055' });

// Red title and text using RGB code.
CreativaPopup.create('Text', 'icon', 'icon', { titleColor: 'rgb(255, 0, 0)', textColor: 'rgb(255, 255, 0)' });

// Red opaque title and text using RGBA code.
CreativaPopup.create('Text', 'icon', 'icon', { titleColor: 'rgba(255, 0, 0, 0.4)', textColor: 'rgba(255, 255, 0, 0.4)' });
```
- **Border radius:** you can change the popup border radius by adding a simple option.
```
CreativaPopup.create('Text', 'Title', 'icon', { borderRadius: '20px' });
```
- **Custom font:** you can change the font for the popup box.
```
CreativaPopup.create('Text', 'Title', 'icon', { fontFamily: 'Times New Roman' });
```
- **Custom box shadow:** by default the popup has a black box shadow but you can change it. This option uses CSS like the others do.
```
CreativaPopup.create('Text', 'Title', 'icon', { boxShadow: '0px 6px 12px 2px #red' });
```
- **Close button:** by default the popup has a red close button on the top right corner, but you can hide it.
```
CreativaPopup.create('Text', 'Title', 'icon', { closeButton: false });
```
- **Timer:** you can set a timer (in seconds) and the popup will close after the time ends.
```
CreativaPopup.create('Text', 'Title', 'icon', { timer: 3 });
```
- ### Closing function
- If you want to close a specific popup you can call the function **CreativaPopup.closePopup(popupID)**.
- If you want to close all the opened popups you can call the method **CreativaPopup.closeAll()**.
- If you want to close the popup after a certain time you can call the method **CreativaPopup.timerClose(popupID, timeSeconds)**.
## Conclusions
Of course you can use every option you want and mix them together.
