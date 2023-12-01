
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
        After two years of work-study training in the metal industry.I decided to go to a design school to discover a multitude of skills and open up to different applications.Today, after my three years at the school, I'd like to deepen my experimental and digital practice.
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
        cross.style.maxHeight = "1.5vh";
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
                location.reload(true);
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
