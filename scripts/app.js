import {
    breedResults,
    subBreedResults
} from './dogList.js';

$(document).ready(() => {


    //Select2 instantiation
    $('#select-breed').select2({
        width: '350px',
        placeholder: 'Select or Search for a Dog Breed...'
    });
    let html = (`<section id='search'>
    <div class='container' id='search-container'>
      <select id='select-breed' class=''>
        <option value=''></option>
      </select>
    </div>
  </section>

  <section id='display'>
    <div class='container' id='display-container'>
      <div id='display-breed-info'>
        <p id='breed-name'>Woof Woof!</p>
        <p id='results'>
          <span id='result-num'>0</span> Results</p>
      </div>
      </div>
    </div>
  </section>`);
$("#mainDiv").append(html);
    const displayBreedName = () => {
        let selectedBreed = $("#select-breed option:selected").text();
        $('#breed-name').text(selectedBreed);
        let breedNameFetch = $("#select-breed option:selected").attr('value');
        let breedGroupNameFetch = $("#select-breed option:selected").attr('data-breed');

        if (breedGroupNameFetch) {
            return subBreedResults(breedGroupNameFetch, breedNameFetch);
        }

        return breedResults(breedNameFetch);
    };

    $('#select-breed').on('change', displayBreedName);

});

function ({

          })