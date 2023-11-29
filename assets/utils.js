
// Mouse
const customCursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});


let originalChildToContent;
let originalDataContainerContent;

const childTo = document.querySelector('.childto');
const dataContainer = document.querySelector('.data-container');
const cross = document.querySelector('.cross');
const aboutp = document.querySelector('.aboutp');

const aboutContentp = `
    <div>
        <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nulla tenetur quidem quos maiores tempore, libero eius doloribus at, iste deserunt recusandae debitis corporis ratione quas in possimus, architecto quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ducimus non velit debitis aperiam dolorum quisquam aliquam, quam voluptates quia laudantium beatae vero facilis. Fuga mollitia perferendis minima maxime impedit.
        </p>
    </div>
`;

function captureHTMLContent(selector) {
    const elements = document.querySelectorAll(selector);
    const capturedContent = [];

    elements.forEach(element => {
        capturedContent.push({
            id: element.id,
            content: element.innerHTML
        });
    });

    return capturedContent;
}

const capturedDataContainer = captureHTMLContent('.data-container');
const capturedchildTo = captureHTMLContent('.childto');


aboutp.addEventListener('click', function() {
    if (cross) {
        cross.style.maxHeight = "2vh";
        cross.style.zIndex = "30000";
    }
    if (childTo){
        childTo.innerHTML = aboutContentp;
        childTo.style.textAlign = "justify";
        childTo.style.padding = "3vw";
        childTo.style.fontSize = "2vw";
        childTo.style.wordSpacing = "0.001vw";
    }
    if (dataContainer){   
        dataContainer.innerHTML = aboutContentp;
        dataContainer.style.textAlign = "justify";
        dataContainer.style.padding = "3vw";
        dataContainer.style.fontSize = "2vw";
        dataContainer.style.wordSpacing = "0.001vw";
    }
});

cross.addEventListener('click', function(event) {
    event.stopPropagation(); 
    if (cross){
        cross.style.maxHeight = '0px';
    }
    if (childTo && capturedchildTo){
        capturedchildTo.forEach(item => {
            if (item.id === childTo.id) {
                childTo.innerHTML = item.content;
                childTo.removeAttribute('style');
            }
        });
    }
    if (dataContainer && capturedDataContainer){   
        capturedDataContainer.forEach(item => {
            if (item.id === dataContainer.id) {
                dataContainer.innerHTML = item.content;
                dataContainer.removeAttribute('style');
            }
        });
    }
});


