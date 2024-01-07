let locality;
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
    getData(locality.toLowerCase())

}

 
document.getElementById("location").addEventListener('click',getLocation)