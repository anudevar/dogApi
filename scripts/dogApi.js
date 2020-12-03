//todo: first create a select option with dogs breed names scrolling

const url = 'https://dog.ceo/api/breeds/list/all';
let display = document.getElementById('display-results');
let resultNum = document.getElementById('result-num');
console.log(resultNum);
const createNode = (element) => {
    return document.createElement(element);
};
const append = (parent, child) => {
    return parent.appendChild(child);
};

const capitalize = (text) => {
    let capChar = text.charAt(0).toUpperCase();
    return text.replace(text[0], capChar);
}
const errorHandler = () => {
    resultNum.textContent = 0;
    return errMsg.textContent = 'Woof! Something went wrong. Try again. Woof!';
}
    const dogAPI = async () => {
        try {
            let response = await fetch(url);
            let data = await response.json();
            let breedGrouping = Object.values(data.message);
            let breedListNames = Object.keys(data.message);
        }
        catch(error){
            errorHandler();
            console.log(error);
        }
    }
    dogAPI();
const createImageCardAttributes = (elem) => {
    let div = createNode('div');
    div.setAttribute('class', 'image-card');
    let img = createNode('img');
    img.src = elem;
    img.setAttribute('class', 'gds-image scroll');
    img.setAttribute('style', 'object-fit: cover');
    append(div, img);
    append(display, div);
    sr.reveal('.scroll');
};
createImageCardAttributes();
const createImageCard = (arr) => {
    display.innerHTML = '';
    arr.length > 300 ? resultNum.textContent = '300+' : resultNum.textContent = arr.length;
    return arr.map(image => {
        createImageCardAttributes(image);
    });
};
createImageCard();
const breedResults = async (breed) => {
    try {
        let response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        let data = await response.json();
        if(data.message.length > 302){
            let reducedResults = data.message.slice(0, 301);
            return createImageCard(reducedResults);
        }
        return createImageCard(data.message);
    }
    catch(error){
        errorHandler();
        console.log(error);
    }
}
breedResults();



// andulo dogs breed names display avali
// selected dog breed ki 10 images ravali
// and dani kinda subBreeds kuda display avali