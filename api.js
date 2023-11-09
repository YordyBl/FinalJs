let lon;
let lat;
let temperature=document.getElementById("temp");
let temperaturemax=document.getElementById("tempmax");
let temperaturemin=document.getElementById("tempmin");
let descripcion=document.getElementById("descripcion");
let loc=document.getElementById("location");
let icon=document.getElementById("icon");
const imagen=document.createElement('img');
const kelvin=273.15;
let codigo="";

window.addEventListener("load",()=>{

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{  //Con estos metodos me permiten saber mi localizacion
            console.log(position);
            lon=position.coords.longitude;
            lat=position.coords.latitude;

            //ID API
            const api ="ffbefdd278b4a6428a5e1a60652ee2ae";
            const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

            fetch(url)
            .then((response)=>{
                console.log("RESPUESTA JSON");
                return response.json();
            })

            .then((data)=>{
                console.log("Esta es la data");
                console.log(data);
                temperature.textContent =
                Math.floor(data.main.temp-kelvin) + "°C";
                descripcion.textContent=data.weather[0].description;
                loc.textContent=data.name + " "+data.sys.country;
                temperaturemax.textContent=
                "Max: "+Math.floor(data.main.temp_max-kelvin)+ "°C";
                temperaturemin.textContent=
                "Min: "+Math.floor(data.main.temp_min-kelvin)+ "°C";
                codigo=data.weather[0].icon;
                imagen.src=`https://openweathermap.org/img/wn/${codigo}.png`;
                icon.appendChild(imagen);
            });
        })
    }
})