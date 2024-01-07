// ^-------Html Variables---------------------------------
let navLinks = document.querySelectorAll(".navbar .nav-link")
let activeLinkEl = document.querySelector(".navbar .nav-link.active")
let locationInputEl = document.getElementById("locationInput");
let findLocationEl =document.getElementById("findLocation")
// ~--------Application Variables-------------------------
let apiKey = 'd19d38fa7ebd4b38863144254240601'

// &--------functions------------------------------------
async function getData(query){
    let xhr = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d19d38fa7ebd4b38863144254240601&q=${query}&days=3`)
    
    let res = await xhr.json();
    console.log(res);
    // console.log(res.location.name);
    displayData(res)

}



function displayData(response){
    console.log(response.location.name);
    console.log(response.forecast.forecastday[1].day.condition.icon)
    // ^ get Week Day
    let date = new Date(response.current.last_updated);
    let options = { weekday: 'long' };
    let dayName = date.toLocaleDateString('en-US', options);
    console.log(dayName);
    // ^get Day Month
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const formattedDate = `${day} ${month}`;
    console.log(formattedDate);

    // ^ get Next Day
    let nextDate = new Date(response.forecast.forecastday[1].date);
    let nameNextDay = nextDate.toLocaleDateString('en-US', options);
    console.log(nameNextDay);

    // ^ get the third day
    let thirdDate = new Date(response.forecast.forecastday[2].date);
    let nameThirdDay = thirdDate.toLocaleDateString('en-US', options);
    console.log(nameThirdDay);
    // ^ Display Data in Card
    let divs = `<div class="cards col-md-4 my-2">
    <div class="card-content bg-card ">
        <div class="day-date-container d-flex justify-content-between align-items-center p-2 bg-card-header">
            <div>${dayName}</div>
            <div>${formattedDate}</div>
        </div>
        <p class="mt-4 px-3 fs-4">${response.location.name}</p>
        <div class="dgree d-flex justify-content-between align-items-center ps-3 pe-5">
            <div class="num" >${response.current.temp_c}
                <sup>o</sup>
                C
            </div>
            <div class="dgree-icon"><img src=${response.current.condition.icon} alt="condition icon" srcset=""></div>
        </div>
        <p class="my-2 px-3 text-info">${response.current.condition.text}</p>
        <div class=" py-3 px-3 d-flex justify-content-between">
            <span class="fs-6"><i class="fa-solid fa-umbrella fs-5 pe-1"></i>${response.current.humidity}%</span>
            <span class="fs-6"><i class="fa-solid fa-wind fs-5 pe-1"></i>${response.current.wind_degree}km/h</span>
            <span class="fs-6"><i class="fa-solid fa-compass fs-5 pe-1"></i>${response.current.wind_dir}</span>

        </div>
        

    </div>
</div>


<div class="cards col-md-4 my-2">
                        <div class="card-content bg-cards">
                            <div class="day-date-container d-flex justify-content-center align-items-center p-2 bg-card-header">
                                <div>${nameNextDay}</div>
                                
                            </div>
                            <div class="text-center my-3">
                            <div class="dgree-icon"><img src=${response.forecast.forecastday[1].day.condition.icon} alt="condition icon" srcset=""></div>
                            <div class="dgree pb-4">
                                <div class="fs-2" >${response.forecast.forecastday[1].day.maxtemp_c}
                                    <sup>o</sup>
                                    C
                                </div>
                                <div class="fs-4 pt-1" >${response.forecast.forecastday[1].day.mintemp_c} <sup>o</sup></div>
                                
                            </div>
                            <p class="text-info pt-1 pb-5">${response.forecast.forecastday[1].day.condition.text}</p>

                            </div>
                            
                            

                        </div>
                    </div>




                    
<div class="cards col-md-4 my-2">
<div class="card-content bg-card">
    <div class="day-date-container d-flex justify-content-center align-items-center p-2 bg-card-header">
        <div>${nameThirdDay}</div>
        
    </div>
    <div class="text-center my-3">
    <div class="dgree-icon"><img src=${response.forecast.forecastday[2].day.condition.icon} alt="condition icon" srcset=""></div>
    <div class="dgree pb-4">
        <div class="fs-2" >${response.forecast.forecastday[2].day.maxtemp_c}
            <sup>o</sup>
            C
        </div>
        <div class="fs-4 pt-1" >${response.forecast.forecastday[2].day.mintemp_c} <sup>o</sup></div>
        
    </div>
    <p class="text-info pt-1 pb-5">${response.forecast.forecastday[2].day.condition.text}</p>

    </div>
    
    

</div>
</div>



`
document.getElementById("cards-container").innerHTML = divs
}

getData('cairo')
// * -----------Events----------------------------------

// ! add Active Class to active Link
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click',(e)=>{
        activeLinkEl.classList.remove('active')
        let anchor = e.target
        anchor.classList.add('active')
        activeLinkEl=anchor
    })
    
}


// ! Find Location Event 
findLocationEl.addEventListener('click',()=>{
    getData(locationInputEl.value.toLowerCase())
})

locationInputEl.addEventListener('keyup',()=>{
    getData(locationInputEl.value.toLowerCase())
})


// ^ Git Weather Data from your Location


let locality;
let locate;
function getLocation () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            let geoCodingApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
    
            getDataLocation (geoCodingApi)
            
        },function(error){
            console.log(error)
    
        })
        
    }else{
        alert("Geolocation does'nt working")
    
    }
    
}
async function getDataLocation (geoCodingApi) {

    let hrx = await fetch(geoCodingApi)
    let response = await hrx.json()
    console.log(response)
    console.log(response.locality.toLowerCase())
    locality= response.locality
    locate = response.city
    console.log(locate)
    getData(locality.toLowerCase())
    getData(locate.toLowerCase())

}

 
document.getElementById("location").addEventListener('click',getLocation)

