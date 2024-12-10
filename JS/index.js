let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let days = ["Sunday" , "Monday" , "Tuesday" , "Wendesday" , "Thursday" , "Friday" , "Saturday"];
let searchLocation = document.getElementById("searchLocation");


getLocation();
function getLocation() 
{
  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(getData);
  
  }
   else 
  {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}



async function getData(location = "cairo")
{
  if(typeof(location) == "object")
  {
    location = `${location.coords.latitude},${location.coords.longitude}`
  }

  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=994c73204b9648eebca234818240712&q=${location}&days=3`);

  if(response.ok)
  {
    let data = await response.json();
    displayToday(data.current , data.location);
    didplayNext(data.forecast.forecastday);
  }
}


function displayToday(temp , location)
{   
    let todayCard = document.getElementById("today");
    let date = new Date(temp.last_updated);

    todayCard.innerHTML=
    `
    <div class="card-header d-flex justify-content-between" style="background-color:rgb(34, 105, 239)">
          <h5 class="fs-6">${days[date.getDay()]}</h5>
          <h5 class="fs-6">${date.getDate()} ${months[date.getMonth()]}</h5>
        </div>
        <div class="card-body">
          
          <div class="location">
            <h6 class="fw-bold">${location.name}</h6>
          </div>
          <div class="degree">
            <p>${temp.temp_c}°C</p>
          </div>
          <div class="status">
            <div class="statusicon">
              <img src="https:${temp.condition.icon}" alt="" style="height:50px" >
            </div>
            <div class="statusword">
              <span>${temp.condition.text}</span>
            </div>
            <div class="info d-flex mt-3">
              <div class="item me-3">
                <i class="fa-solid fa-droplet"></i> ${temp.humidity} %
              </div>
              <div class="item me-3">
                <i class="fa-solid fa-wind"></i> ${temp.wind_kph} Km/h
              </div>
              <div class="item me-3">
                <i class="fa-solid fa-compass"></i> ${temp.wind_dir}
              </div>
            </div>
          </div>
        </div>
    `
}
function didplayNext(temp)
{

    let nextOne = document.getElementById("nextOne");
    let date_1 = new Date(temp[1].date);
    
    let nextTwo = document.getElementById("nextTwo");
    let date_2 = new Date(temp[2].date);

    nextOne.innerHTML=
    `
    <div class="card-header d-flex justify-content-between" style="background-color:rgb(34, 105, 239)">
          <h5 class="fs-6">${days[date_1.getDay()]}</h5>
          <h5 class="fs-6">${date_1.getDate()} ${months[date_1.getMonth()]}</h5>
        </div>
        <div class="card-body mt-4">
          
          <div class="statusicon">
            <img src="https:${temp[1].day.condition.icon}" alt="">
          </div>
          <div class="degree">
            <p class="fs-2 mb-0 mt-4">${temp[1].day.maxtemp_c}°C</p>
            <p class="fs-5">${temp[1].day.mintemp_c}°C</p>
            <p class="fs-5">${temp[1].day.condition.text}</p>
          </div>
        </div>
    `; 
    
    nextTwo.innerHTML=
    `
    <div class="card-header d-flex justify-content-between" style="background-color:rgb(34, 105, 239)">
          <h5 class="fs-6">${days[date_2.getDay()]}</h5>
          <h5 class="fs-6">${date_2.getDate()} ${months[date_2.getMonth()]}</h5>
        </div>
        <div class="card-body mt-4">
          
          <div class="statusicon">
            <img src="https:${temp[2].day.condition.icon}" alt="">
          </div>
          <div class="degree">
            <p class="fs-2 mb-0 mt-4">${temp[2].day.maxtemp_c}°C</p>
            <p class="fs-5">${temp[2].day.mintemp_c}°C</p>
            <p class="fs-5">${temp[2].day.condition.text}</p>
          </div>
        </div>
    `;
}


searchLocation.addEventListener("input" , function(e)
{
    getData(e.target.value);
})