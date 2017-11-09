class ImageMaker {
    constructor(){
        // When this class is instantiated, the `constructor()` method is executed.
        this.imagePreview = document.getElementById('image-preview');

        // Create Top Text
        this.topText = document.createElement('p');
        this.topText.setAttribute('class', 'top-text');

        this.imagePreview.appendChild(this.topText);

        // Create Top Text Citation
        this.topLink = document.createElement('p');
        this.topLink.setAttribute('class', 'top-link');

        this.imagePreview.appendChild(this.topLink);

        // Create Top Image
        this.topImage = document.createElement('div');
        this.topImage.setAttribute('class', 'top-image');

        this.imagePreview.appendChild(this.topImage);

        // Create Bottom Image
        this.bottomImage = document.createElement('div');
        this.bottomImage.setAttribute('class', 'bottom-image');

        this.imagePreview.appendChild(this.bottomImage);

        // Create Bottom Text Citation
        this.bottomLink = document.createElement('p');
        this.bottomLink.setAttribute('class', 'bottom-link');
        this.imagePreview.appendChild(this.bottomLink);

        // Create Bottom Text
        this.bottomText = document.createElement('p');
        this.bottomText.setAttribute('class', 'bottom-text');

        this.imagePreview.appendChild(this.bottomText);

        // Create Republisplain logo
        this.logo = document.createElement('div');
        this.logo.setAttribute('class', 'logo');
        this.logo.innerHTML = 'REPUBLISPLAIN';

        this.imagePreview.appendChild(this.logo);

        // Create Republisplain link
        this.rpLink = document.createElement('a');
        this.rpLink.setAttribute('class', 'rp-link');
        this.rpLink.setAttribute('href', 'http://fb.me/republisplain');
        this.rpLink.innerHTML = 'http://fb.me/republisplain';

        this.imagePreview.appendChild(this.rpLink);


        // Grab Form Inputs

        this.topTextInput = document.querySelector('textarea[name="topText"]');
        this.topTextSizeInput = document.querySelector('input[name="topTextSize"]');
        this.topLinkInput = document.querySelector('input[name="topLink"]');
        this.topImageInput = document.querySelector('input[name="topImage"]');
        this.topTextSizeInput = document.querySelector('input[name="topTextSize"]');
        this.topLinkInput = document.querySelector('input[name="topLink"]');

        this.bottomTextInput = document.querySelector('textarea[name="bottomText"]');
        this.bottomLinkInput = document.querySelector('input[name="bottomLink"]');
        this.bottomTextSizeInput = document.querySelector('input[name="bottomTextSize"]');
        this.bottomImageInput = document.querySelector('input[name="bottomImage"]');
        this.bottomTextSizeInput = document.querySelector('input[name="bottomTextSize"]');
        this.bottomLinkInput = document.querySelector('input[name="bottomLink"]');


    }
    drawPreview(){

        this.topImage.style.backgroundImage = `url(http://rashrewind.com/proxy.php?csurl=${this.topImageInput.value})`;

        this.bottomImage.style.backgroundImage = `url(http://rashrewind.com/proxy.php?csurl=${this.bottomImageInput.value})`;

        this.topText.innerHTML = this.topTextInput.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
        this.topText.style.fontSize = `${this.topTextSizeInput.value}px`;
        this.topLink.innerHTML = this.topLinkInput.value;

        this.bottomText.innerHTML = this.bottomTextInput.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
        this.bottomText.style.fontSize = `${this.bottomTextSizeInput.value}px`;
        this.bottomLink.innerHTML = this.bottomLinkInput.value;


    }
    downloadImage(){
        this.drawPreview();
        generateImage();
    }
}

let imageMaker = new ImageMaker();

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID="image-preview", height="800px", width="1280px"){
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}


function applyEventListeners(){
    let inputs = document.querySelectorAll('input, textarea');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.downloadImage();
    })
}

// Apply event listeners on page load.
applyEventListeners();