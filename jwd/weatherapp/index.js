const api = {
    key :"",
    baseurl: "http://api.openweathermap.org/data/2.5/"
    
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery (evt) {
if(evt.keyCode ===13) {
    getResults(searchbox.value);
    console.log(searchbox.value);

    }
}


let checkFetch = function (response){

    if(!response.ok) {
        alert("Please check Location :)")              
    }
    return response;
        
   }

function getResults(location) {
    fetch(`${api.baseurl}weather?q=${location}&units=metric&appid=${api.key}`) 
  

        .then(checkFetch)
           
        .then(weather => {
            return weather.json();         
        })

        .then(displayResults);        

         }    
                            
      
        function displayResults (weather) {  
        
        weather.iconId = weather.weather[0].icon;
        let icon = document.querySelector('.weather-icon');
        icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`;
        
        let city = document.querySelector('.location .city');
        city.innerHTML = `${weather.name}, ${weather.sys.country}`; 

   
        let desc = document.querySelector('.current .desc');
        desc.innerHTML = weather.weather[0].description; 

        let temp = document.querySelector('.current .temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;        

        let hilow = document.querySelector('.current .hilow');
        hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`;

    // Date as per location
        let d = new Date();
        let localtime = d.getTime();
        let localOffset = d.getTimezoneOffset()*60000;
        console.log(localtime);
        console.log(localOffset);
        let utc = localtime + localOffset
        console.log(utc);
        let utctimezone = `${(weather.timezone)*1000}`
        let utctime = Number(utc + Number(utctimezone));
        console.log(typeof(utctime))
        console.log(typeof(utctimezone))
        console.log(typeof(utc))
        let datetime = new Date(utctime);
        let actualDate = document.querySelector('.location .actualDate');
        actualDate.innerHTML = datetime

        console.log(utctime);
   


        }

        

