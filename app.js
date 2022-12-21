const listentodog  = function () {
    let dog = document.querySelectorAll('.js-image');
    let kruisje = document.querySelectorAll('.c-kruisje');
  dog.forEach((item, i) => {
    if(!(document.querySelector('.c-popup'))) {
      item.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Trigger the button element with a click
          item.click();
        }
      });
    item.addEventListener('click', () => {
        console.log("clicked");
        dog.forEach((item, i) => {
          item.classList.remove('c-popup');
        });
        item.classList.add('c-popup');
        
        console.log("zet kruisje");
        
        

        item.querySelector('.c-kruisje').innerHTML=`<?xml version="1.0" encoding="iso-8859-1"?>
        <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 460.775 460.775" style="enable-background:new 0 0 460.775 460.775;" xml:space="preserve">
        <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
          c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
          c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
          c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
          l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
          c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
        </svg>`
        listentokruisje();
    })
  }
})
}

const listentokruisje = function () {
  // console.log(document.querySelector('.c-popup').querySelector('.c-info').getAttribute('weight'));
  let kruisje = document.querySelectorAll('.c-kruisje');
  let popup = document.querySelector('.c-popup');
  let body = document.querySelector('body');
  kruisje.forEach((item, i) => {
    item.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Trigger the button element with a click
        item.click();
      }
    });
    window.onclick = function(event) {
      if (event.target == body) {
        popup.classList.remove('c-popup');
        item.innerHTML="";
      }
    };
    item.addEventListener('click', () => {
        console.log("clicked kruisje");
        
        setTimeout(function(){ popup.classList.remove('c-popup'); item.innerHTML=""; console.log("kruisje leeg");}, 100);
        
    })
    
  })
};


const getData = (endpoint) => {
    return fetch(endpoint)
      .then((r) => r.json())
      .catch((e) => console.error(e));
  };
  
  let getAPI = async (lat, lon) => {
    // Eerst bouwen we onze url op
    const link = `https://api.TheDogAPI.com/v1/breeds`;
    // Met de fetch API proberen we de data op te halen.
    const dogs = await getData(link);
    showFoto(dogs);
    
    // console.log(dogs);
  };

  let showFoto = function (dogs) {
    let doghtml = '';
    for (let dog of dogs) {
      const result = dog.weight.metric.split(' - ');
      let maxgewicht = 0;
      if(result[1] == undefined) {
        maxgewicht = 1;
      }
      else {
         maxgewicht = result[1] - result[0];
      }
      const mingewicht = result[0];
      if(dog.origin == undefined || dog.origin == "") {
        dog.origin = "Unknown";
      }
      
      
      doghtml += `
      <div class="c-rectangle c-gallery-image js-image" >
        <div class="c-info" weight="${dog.weight.metric}" tabindex=0>
          <img  src="${dog.image.url}" alt="" class="c-image" >
          <p class="c-name_dogs">${dog.name}</p>
          <p class="c-extrainfo">Average age: ${dog.life_span}</p>
          <div class="c-gewicht">
            <p class="c-minimumgewicht">0</p>
            <p class="c-extrainfo c-weight">${dog.weight.metric}kg</p>
            <p class="c-maximumgewicht">100 kg</p>
          </div>
          <div class="c-volledigebar">
          <div class="c-eerstedeel-bar" style="width:${mingewicht}%;">
            </div>
            <div class="c-percentage-bar" style="width:${maxgewicht}%;">
            </div>
          </div>
          
          <p class="c-extrainfo">Dogs temperament: ${dog.temperament}</p>
          <p class="c-extrainfo">Country of origin: ${dog.origin}</p>
          
        </div>
        <div class="c-kruisje" tabindex=0></div>
      </div>`;
    }
    document.querySelector('.js-dogs').innerHTML = doghtml;
    listentodog();
  };

  document.addEventListener('DOMContentLoaded', function () {
    getAPI();
  });