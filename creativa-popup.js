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
const transitionSpeed = 70;
let totalPopups = 0;
let thereIsContent = false;
let content;
let isPage;
let openAnimation, closeAnimation;
let isBlocked = false;
let width = '', height = '';

// CSS load
window.onload = function() {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = cdn + '/creativa-popup.css';
    link.media = 'all';
    head.appendChild(link);
}

// Open popup function
function popup(title, text, icon, image, elements) {

    totalPopups ++;
    
    // Popup background creation
    var divBackground = document.createElement('div');
    divBackground.className = 'popup-background';
    divBackground.id = 'popup-bg-' + totalPopups;
    divBackground.onclick = function () {
        closePopup(totalPopups, elements);
    };

    // Popup box creation
    var divBox = document.createElement('div');
    divBox.className = 'popup-box';
    divBox.id = 'popup-box-' + totalPopups;
    divBox.innerHTML = `<span class="image popup-image" id="popup-image-` + totalPopups + `"></span>
                        <div class="popup-content" id="popup-content-` + totalPopups + `">
                            <span class="icon popup-icon" id="popup-icon-` + totalPopups + `"></span>
                            <h1 class="popup-title" id="popup-title-` + totalPopups + `"></h1>
                            <p class="popup-text" id="popup-text-` + totalPopups + `"></p>
                            <div class="popup-elements" id="popup-elements-` + totalPopups + `"></div>
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

    if (typeof elements !== 'undefined' && elements !== null && elements !== '') {
        content = elements['content'];
        isPage = elements['isPage'];
        isBlocked = elements['isBlocked'];
        width = elements['width'];
        height = elements['height'];
        thereIsContent = true;
        openAnimation = elements['openAnimation'];
        closeAnimation = elements['closeAnimation'];
    } else {
        content = null;
        isPage = false;
        isBlocked = false;
        width = null;
        height = null;
        thereIsContent = false;
        openAnimation = 'fade';
        closeAnimation = 'fade';
    }

    if (typeof openAnimation == 'undefined') openAnimation = 'fade';
    if (typeof closeAnimation == 'undefined') closeAnimation = 'fade';

    popupBg.setAttribute('isBlocked', isBlocked);
    popupBox.setAttribute('openAnimation', openAnimation);
    popupBox.setAttribute('closeAnimation', closeAnimation);

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

    let popupElements = document.getElementById('popup-elements-' + totalPopups);
    if (typeof content == 'undefined' || content == null || content == '') {
        popupElements.style.marginTop = '0';
        popupElements.style.innerHtml = '';
    } else {
        if (thereIsContent) {
            if (!isPage) {
                popupElements.innerHTML = content;
            } else {
                loadContent(popupElements, content);
            }
            if (popupTitle.innerHTML !== '' && popupText.innerHTML !== '' && popupTitle !== null && popupText !== null) popupElements.style.marginTop = '10px';
        }
    }

    let zIndexFirst = 100 + totalPopups + 1;
    let zIndexSecond = 100 + totalPopups + 2;
    popupBg.style.zIndex = zIndexFirst.toString();
    popupBg.classList.add('popup-show');
    popupBg.classList.add('fade-popup-animation-open');
    popupBox.style.zIndex = zIndexSecond.toString();

    setTimeout(function() {
        if (width !== null) popupBox.style.width = width;
        if (height !== null) popupBox.style.height = height;
        popupBox.classList.add('popup-show');
        popupBox.classList.add(popupBox.getAttribute('openAnimation') + '-popup-animation-open');
    }, transitionSpeed / 2);

}

// Close popup function
function closePopup(id, elements) {
    let selectedPopupBg = document.getElementById('popup-bg-' + id);
    let selectedPopupBox = document.getElementById('popup-box-' + id);

    let isSelectedPopupBlocked = (selectedPopupBg.getAttribute('isBlocked') == "true");
    if (!isSelectedPopupBlocked) {

        selectedPopupBg.classList.add('fade-popup-animation-close');
        setTimeout(function() {
            selectedPopupBg.remove();
        }, 150);

        selectedPopupBox.classList.remove(selectedPopupBox.getAttribute('openAnimation') + '-popup-animation-open');
        selectedPopupBox.classList.add(selectedPopupBox.getAttribute('closeAnimation') + '-popup-animation-close');

        setTimeout(function() {
            selectedPopupBox.remove();
        }, 150);
        totalPopups --;

    }
}