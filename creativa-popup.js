// Function to load content
function loadContent(target, url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        var resp = request.responseText;

        target.innerHTML = resp;
    }
    };

    request.send();
}

/* -------------------------
-------- VARIABLES ---------
------------------------- */

const version = '0.1';
const cdn = 'https://creativajs.altervista.org/popup/';
const animationSpeed = 200;
let totalPopups = 0;
let thereIsContent = false;
let content;
let isPage;
let openAnimation, closeAnimation, position, bgColor, titleColor, textColor;
let isBlocked = false;
let width = '', height = '';
let positionBottom = window.innerHeight - 100;

// CSS load
window.onload = function() {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = './creativa-popup.css';
    link.media = 'all';
    head.appendChild(link);
}

window.onresize = function(event) {
    let allPopups = this.document.getElementsByClassName('ct-popup-box');
    for (let i = 0; i < allPopups.length; i++) {
        let element = document.getElementById(allPopups[i].id);
        if (element.getAttribute('position') == 'bottom') {
            positionBottom = window.innerHeight - 100;
            element.style.top = positionBottom + 'px';
        }
    }
}

// Open popup function
function popup(title, text, icon, image, options) {

    totalPopups ++;
    
    // Popup background creation
    var divBackground = document.createElement('div');
    divBackground.className = 'ct-popup-background';
    divBackground.id = 'popup-bg-' + totalPopups;
    divBackground.onclick = function () {
        closePopup(totalPopups, options);
    };

    // Popup box creation
    var divBox = document.createElement('div');
    divBox.className = 'ct-popup-box';
    divBox.id = 'popup-box-' + totalPopups;
    divBox.innerHTML = `<span class="ct-popup-image" id="popup-image-` + totalPopups + `"></span>
                        <div class="ct-popup-content" id="popup-content-` + totalPopups + `">
                            <span class="ct-popup-icon" id="popup-icon-` + totalPopups + `"></span>
                            <h1 class="ct-popup-title" id="popup-title-` + totalPopups + `"></h1>
                            <p class="ct-popup-text" id="popup-text-` + totalPopups + `"></p>
                            <div class="ct-popup-options" id="popup-options-` + totalPopups + `"></div>
                        </div>`;

    // Append popup to page
    document.body.appendChild(divBackground);
    document.body.appendChild(divBox);

    // Popup components
    let popupBg = document.getElementById('popup-bg-' + totalPopups);
    let popupBox = document.getElementById('popup-box-' + totalPopups);
    let popupImage = document.getElementById('popup-image-' + totalPopups);
    let popupIcon = document.getElementById('popup-icon-' + totalPopups);
    let popupTitle = document.getElementById('popup-title-' + totalPopups);
    let popupText = document.getElementById('popup-text-' + totalPopups);

    if (typeof options !== 'undefined' && options !== null && options !== '') {
        content = options['content'];
        isPage = options['isPage'];
        isBlocked = options['isBlocked'];
        width = options['width'];
        height = options['height'];
        thereIsContent = true;
        openAnimation = options['openAnimation'];
        closeAnimation = options['closeAnimation'];
        position = options['position'];
        bgColor = options['bgColor'];
        titleColor = options['titleColor'];
        textColor = options['textColor'];
    } else {
        content = null;
        isPage = false;
        isBlocked = false;
        width = null;
        height = null;
        thereIsContent = false;
        openAnimation = 'fade';
        closeAnimation = 'fade';
        position = 'center';
        bgColor = '#fff';
        titleColor = '#404040';
        textColor = '#606060';
    }

    if (typeof openAnimation == 'undefined') openAnimation = 'fade';
    if (typeof closeAnimation == 'undefined') closeAnimation = 'fade';
    if (typeof position == 'undefined') position = 'center';
    if (typeof bgColor == 'undefined') bgColor = '#fff';
    if (typeof titleColor == 'undefined') titleColor = '#404040';
    if (typeof textColor == 'undefined') textColor = '#606060';

    popupBg.setAttribute('isBlocked', isBlocked);
    popupBox.setAttribute('openAnimation', openAnimation);
    popupBox.setAttribute('closeAnimation', closeAnimation);
    popupBox.setAttribute('position', position);
    popupBox.setAttribute('bgColor', bgColor);
    popupBox.setAttribute('titleColor', titleColor);
    popupBox.setAttribute('textColor', textColor);

    switch (position) {

        case 'top':
            popupBox.style.top = '100px';
            break;
        case 'bottom':
            popupBox.style.top = positionBottom + 'px';
            break;

    }

    popupImage.style.display = "none";
    popupIcon.style.display = "none";

    if (image) {

        let imageUrl;
        switch (image) {

            default:
                imageUrl = image;

        }

        popupImage.style.backgroundImage = 'url(' + imageUrl + ')';
        popupImage.style.display = 'block';

    }

    if (icon) {

        let iconUrl;
        switch (icon) {

            case 'error':
                iconUrl = cdn + 'icons/error.png';
                break;
            case 'success':
                iconUrl = cdn + 'icons/success.png';
                break;
            case 'info':
                iconUrl = cdn + 'icons/info.png';
                break;
            default:
                iconUrl = icon;

        }

        popupIcon.style.backgroundImage = 'url(' + iconUrl + ')';
        popupIcon.style.display = 'block';

    }

    popupTitle.innerHTML = title;
    popupText.innerHTML = text;

    let popupoptions = document.getElementById('popup-options-' + totalPopups);
    if (typeof content == 'undefined' || content == null || content == '') {
        popupoptions.style.marginTop = '0';
        popupoptions.style.innerHtml = '';
    } else {
        if (thereIsContent) {
            if (!isPage) {
                popupoptions.innerHTML = content;
            } else {
                loadContent(popupoptions, content);
            }
            if (popupTitle.innerHTML !== '' && popupText.innerHTML !== '' && popupTitle !== null && popupText !== null) popupoptions.style.marginTop = '10px';
        }
    }

    let zIndexFirst = 100 + totalPopups + 1;
    let zIndexSecond = 100 + totalPopups + 2;
    popupBg.style.zIndex = zIndexFirst.toString();
    popupBg.classList.add('ct-popup-show');
    popupBg.classList.add('fade-ct-popup-animation-open');

    if (width !== null) popupBox.style.width = width;
    if (height !== null) popupBox.style.height = height;
    popupBox.classList.add('ct-popup-show');
    popupBox.classList.add(popupBox.getAttribute('openAnimation') + '-ct-popup-animation-open');
    popupBox.setAttribute('style', 'background: ' + popupBox.getAttribute('bgColor') + ' !important; z-index: ' + zIndexSecond.toString());
    popupTitle.setAttribute('style', 'color: ' + popupBox.getAttribute('titleColor') + ' !important');
    popupText.setAttribute('style', 'color: ' + popupBox.getAttribute('textColor') + ' !important');
   
}

// Close popup function
function closePopup(id, options) {
    let selectedPopupBg = document.getElementById('popup-bg-' + id);
    let selectedPopupBox = document.getElementById('popup-box-' + id);

    let isSelectedPopupBlocked = (selectedPopupBg.getAttribute('isBlocked') == "true");
    if (!isSelectedPopupBlocked) {

        selectedPopupBg.classList.add('fade-ct-popup-animation-close');
        setTimeout(function() {
            selectedPopupBg.remove();
        }, animationSpeed);

        selectedPopupBox.classList.remove(selectedPopupBox.getAttribute('openAnimation') + '-ct-popup-animation-open');
        selectedPopupBox.classList.add(selectedPopupBox.getAttribute('closeAnimation') + '-ct-popup-animation-close');

        setTimeout(function() {
            selectedPopupBox.remove();
        }, animationSpeed);
        totalPopups --;

    }
}