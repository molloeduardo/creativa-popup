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
let totalPopups = 0;
let thereIsContent = false;
let content;
let isPage;
let openAnimation, closeAnimation, position, bgColor, titleColor, textColor, borderRadius, fontFamily, noBackground, timer, animationSpeed;
let isBlocked = false;
let width = '', height = '';
let positionBottom = window.innerHeight - 100;

// CSS load
window.onload = function() {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'creativa-popup.css';
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

function timerClose(popupId, timerTime) {
    setTimeout(function() {
        closePopup(popupId);
    }, timerTime * 1000);
}

// Open popup function
function popup(title, text, icon, image, options) {

    totalPopups ++;

    // Popup background creation
    var divBackground = document.createElement('div');
    divBackground.className = 'ct-popup-background';
    divBackground.id = 'ct-popup-bg-' + totalPopups;
    divBackground.onclick = function () {
        closePopup(totalPopups, options);
    };

    // Popup box creation
    var divBox = document.createElement('div');
    divBox.className = 'ct-popup-box';
    divBox.id = 'ct-popup-box-' + totalPopups;
    divBox.innerHTML = `<span class="ct-popup-image" id="ct-popup-image-` + totalPopups + `"></span>
                        <div class="ct-popup-content" id="ct-popup-content-` + totalPopups + `">
                            <span class="ct-popup-icon" id="ct-popup-icon-` + totalPopups + `"></span>
                            <h1 class="ct-popup-title" id="ct-popup-title-` + totalPopups + `"></h1>
                            <p class="ct-popup-text" id="ct-popup-text-` + totalPopups + `"></p>
                            <div class="ct-popup-options" id="ct-popup-options-` + totalPopups + `"></div>
                        </div>
                        <div class="ct-popup-close-icon" id="ct-popup-close-icon-` + totalPopups + `" onclick="closePopup(` + totalPopups + `)"><div class="ct-popup-close-icon-line-first"><div class="ct-popup-close-icon-line-second"></div></div></div>`;

    // Append popup to page
    document.body.appendChild(divBackground);
    document.body.appendChild(divBox);

    // Popup components
    let popupBg = document.getElementById('ct-popup-bg-' + totalPopups);
    let popupBox = document.getElementById('ct-popup-box-' + totalPopups);
    let popupImage = document.getElementById('ct-popup-image-' + totalPopups);
    let popupIcon = document.getElementById('ct-popup-icon-' + totalPopups);
    let popupTitle = document.getElementById('ct-popup-title-' + totalPopups);
    let popupText = document.getElementById('ct-popup-text-' + totalPopups);
    let popupCloseIcon = document.getElementById('ct-popup-close-icon-' + totalPopups);

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
        borderRadius = options['borderRadius'];
        fontFamily = options['fontFamily'];
        closeButton = options['closeButton'];
        noBackground = options['noBackground'];
        timer = options['timer'];
        animationSpeed = options['animationSpeed'];
    } else {

        // Default values
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
        borderRadius = '3px';
        fontFamily = 'sans-serif';
        closeButton = true;
        noBackground = false;
        timer = false;
        animationSpeed = 150;

    }

    if (typeof openAnimation == 'undefined') openAnimation = 'fade';
    if (typeof closeAnimation == 'undefined') closeAnimation = 'fade';
    if (typeof position == 'undefined') position = 'center';
    if (typeof bgColor == 'undefined') bgColor = '#fff';
    if (typeof titleColor == 'undefined') titleColor = '#404040';
    if (typeof textColor == 'undefined') textColor = '#606060';
    if (typeof borderRadius == 'undefined') borderRadius = '3px';
    if (typeof fontFamily == 'undefined') fontFamily = 'sans-serif';
    if (typeof closeButton == 'undefined') closeButton = true;
    if (typeof noBackground == 'undefined') noBackground = false;
    if (typeof timer == 'undefined') timer = false;
    if (typeof animationSpeed == 'undefined') animationSpeed = 150;

    popupBg.setAttribute('isBlocked', isBlocked);
    popupBox.setAttribute('openAnimation', openAnimation);
    popupBox.setAttribute('closeAnimation', closeAnimation);
    popupBox.setAttribute('position', position);
    popupBox.setAttribute('bgColor', bgColor);
    popupBox.setAttribute('titleColor', titleColor);
    popupBox.setAttribute('textColor', textColor);
    popupBox.setAttribute('borderRadius', borderRadius);
    popupBox.setAttribute('fontFamily', fontFamily);
    popupBox.setAttribute('closeButton', closeButton);
    popupBox.setAttribute('noBackground', noBackground);
    popupBox.setAttribute('animationSpeed', animationSpeed);
    
    if (timer !== false && timer > 0) {
        timerClose(totalPopups, timer);
    }

    // Close button
    if (popupBox.getAttribute('closeButton') == 'false' || popupBg.getAttribute('isBlocked') == 'true') {
        popupCloseIcon.setAttribute('style', 'display: none;');
    }

    // No background
    if (popupBox.getAttribute('noBackground') == 'true') {
        popupBg.setAttribute('style', 'display: none;');
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

    let popupoptions = document.getElementById('ct-popup-options-' + totalPopups);
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
    popupBg.style.animationDuration = parseInt(popupBox.getAttribute('animationSpeed')) / 1000 + 's';
    popupBg.classList.add('ct-popup-show');
    popupBg.classList.add('fade-ct-popup-animation-open');

    let popupBoxPosition;
    switch (position) {

        case 'top':
            popupBoxPosition = 'top: 100px';
            break;
        case 'bottom':
            popupBoxPosition = 'top: ' + positionBottom + 'px';
            break;

    }


    let popupBoxStyle = 'background: ' + popupBox.getAttribute('bgColor') + ' !important; z-index: ' + zIndexSecond.toString() + ';' + popupBoxPosition + ' !important;' + 'border-radius: ' + popupBox.getAttribute('borderRadius') + ' !important; font-family: ' + popupBox.getAttribute('fontFamily') + ' !important; animation-duration: ' + parseInt(popupBox.getAttribute('animationSpeed')) / 1000 + 's !important; ';

    if (width !== null) popupBoxStyle += ' width: ' + width + ' !important;';
    if (height !== null) popupBoxStyle += ' height: ' + height + ' !important;';
    popupBox.classList.add('ct-popup-show');
    popupBox.classList.add(popupBox.getAttribute('openAnimation') + '-ct-popup-animation-open');
    popupBox.setAttribute('style', popupBoxStyle);
    popupTitle.setAttribute('style', 'color: ' + popupBox.getAttribute('titleColor') + ' !important');
    popupText.setAttribute('style', 'color: ' + popupBox.getAttribute('textColor') + ' !important');

}

// Close popup function
function closePopup(id, options) {
    let selectedPopupBg = document.getElementById('ct-popup-bg-' + id);
    let selectedPopupBox = document.getElementById('ct-popup-box-' + id);

    let isSelectedPopupBlocked
    if (selectedPopupBg !== null) {
        isSelectedPopupBlocked = (selectedPopupBg.getAttribute('isBlocked') == "true");
    } else {
       isSelectedPopupBlocked = false;
    }

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
