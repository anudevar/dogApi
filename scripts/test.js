$(document).ready(function () {
    let settings = {
        "url": "https://dog.ceo/api/breeds/list/all",
        "method": "GET",
        "timeout": 0,
        "dataType": "json",
        "async": false,
    };
    let breedDog;
    $.ajax(settings)
        .done(function (response) {
            breedDog = response['message'];
        });
    init(breedDog);
    $('#select-breed').on('change', function () {
        let DogName = $(this).val();
        let dogImages = getDogimages(DogName);
        let randomImages = getRandom(dogImages, 10);
        appendImages(randomImages, DogName);
        refreshPage(getRandom, dogImages, DogName);
        addSubBreeds(DogName,breedDog);
    });

});


function init(breedDog) {
    let htmlForAllOptions = '';
    let dogType;
    let htmlForSingleOption;
    let subBreedList = [];
    $.each(breedDog, function (key, value) {
        dogType = key;
        subBreedList = value
        //This is to display items
        htmlForSingleOption = (`<option value='` + dogType + `'> ` + dogType + `</option>`);
        htmlForAllOptions += htmlForSingleOption;
    });
    let html = `<section id='search'>
        <div class='container' id='search-container'>
            <p>select the your favorite dog breed</p>
                <select name="dogbreedlist" id="select-breed">
                <option value=''> Select the breed Name</option>
                    ` + htmlForAllOptions + `
                </select>  
                <select name="dogSubbreedlist" id="selectSubBreed">
                </select>
        </div>
    </section>
    <section id='display'>
        <div class='container' id='display-container'>
        <br><button id="refresh"> refresh</button>
           <div id='display-breed-info'>
            </div>
            <div id="subBreedDisplay">
            </div>
             <div id='display-results'>
            </div>
        </div>
    </section>`;
    $('#mainDiv').append(html);

}

function getDogimages(name) {
    let url = "https://dog.ceo/api/breed/" + name + "/images";
    let data = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "dataType": "json",
        "async": false,
    };

    let dogImages;
    $.ajax(data)
        .done(function (response) {
            dogImages = response['message'];
        });
    return dogImages;
}

function appendImages(dogImages, DogName) {
    $('#display-breed-info').empty();
    $('#display-results').empty();
    let imageSource1;
    let img;
    let size = dogImages.length;
    $.each(dogImages, function (key, value) {
        imageSource1 = value;
        img = (`<img id="random" src="` + imageSource1 + `" alt="` + DogName + `">`);
        $('#display-results').append(img);
    });
    let breedinfo = (`<p>breed Name:` + DogName + `</br> no of images available:` + size + ` results available</p>`);
    $('#display-breed-info').append(breedinfo);
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function refreshPage(getRandom, dogImages, DogName) {
    $("#refresh").on('click',function () {
        $('#display-results').empty();
        let randomImages = getRandom(dogImages, 10);
        appendImages(randomImages, DogName);
    });
}

function addSubBreeds(Breed,dogList){
    $('#selectSubBreed').empty();
    let htmlSubBreedAllOption ='';
    $.each(dogList, function(key, value){
        if(key == Breed){
            let i = value.length;
            if(i){
                $.each(value, function (i, val){
                    let htmlSubBreedOption = (`<option value='` + val + `'> ` + val + `</option>`);
                    htmlSubBreedAllOption += htmlSubBreedOption;
                });
            }
            else{
                console.log('comes here')
                htmlSubBreedAllOption = (`<option value=''>no sub breed to display</option>`);
            }
        }
    });
    console.log(htmlSubBreedAllOption);
    $('#selectSubBreed').append(htmlSubBreedAllOption);
}
