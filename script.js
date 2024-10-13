const api_key = acc43d7c79ffbb49670528c9882155e4;
let city_name;

let btn = document.getElementById("submit");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  city_name = document.getElementById("city").value;
  let invis = document.getElementById("main_content");
  invis.style.display = "flex";
  fetch_data(city_name, api_key);
  fetch_data3(city_name, api_key);
});

let clr = document.getElementById("clear");

clr.addEventListener("click", (e) => {
  e.preventDefault();
  let invis = document.getElementById("main_content");
  invis.style.display = "none";
  document.getElementById("city").value = "";
});

async function fetch_data(city_name, api_key) {
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=metric`
  );

  if (!data.ok) {
    let elem = document.getElementById("error");
    elem.style.display = "block";
    elem.innerText = "Weather for the entered place is not available!";
    let invis = document.getElementById("main_content");
    invis.style.display = "none";
    document.getElementById("city").value = "";
    setTimeout(() => {
      elem.style.display = "none";
    }, 3000);
  }

  let info = await data.json();

  let temp = info.main.temp;
  let temp_feels_like = info.main.feels_like;
  let humid = info.main.humidity;
  let name = info.weather[0].main;
  let desc = info.weather[0].description;
  let speed = info.wind.speed;
  let sunrise = info.sys.sunrise;
  let sunset = info.sys.sunset;

  speed = speed * 3.6;
  speed = speed.toFixed(2);
  temp = Math.round(temp);
  add_main(
    city_name,
    temp,
    humid,
    speed,
    desc,
    name,
    temp_feels_like,
    sunrise,
    sunset
  );
}

async function fetch_data2(city_name, api_key) {
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=metric`
  );

  if (!data.ok) {
    let elem = document.getElementById("error");
    elem.style.display = "block";
    elem.innerText = "Weather for the entered place is not available!";
    let invis = document.getElementById("main_content");
    invis.style.display = "none";
    document.getElementById("city").value = "";
    setTimeout(() => {
      elem.style.display = "none";
    }, 3000);
  }

  let info = await data.json();

  let temp = info.main.temp;
  let humid = info.main.humidity;
  let name = info.weather[0].main;
  let desc = info.weather[0].description;
  let speed = info.wind.speed;

  speed = speed * 3.6;
  speed = speed.toFixed(2);
  temp = Math.round(temp);
  add_card(city_name, temp, humid, speed, desc, name);
}

document.addEventListener("DOMContentLoaded", () => {
  const cities = ["Bengaluru", "Mysore", "London", "Mumbai"];
  cities.forEach((city) => {
    fetch_data2(city, api_key);
  });
});

function add_card(city_name, temp, humid, speed, desc, name) {
  let html = `<article>
    <p id="city">${city_name}</p>
            <div id="img_info">
            <img src="images/${name}.png" alt="img" height="120px" width="120px"/>
            <p id="desc">${desc}</p>
            </div>
            <div id="details">
              <p class="t">${temp}<sup>o</sup>C</p>
              <div id="humid">
                <div class="humidBox">
                  <img src="images/humidity.png" alt="img" width="32px" height="32px"/>
                  <div>
                    <p class="humidFont">${humid}%</p>
                    <p class="humidFontText">Humidity</p>
                  </div>
                </div>
                <div class="humidBox">
                  <img src="images/wind.png" alt="img" width="32px" height="32px"/>
                  <div>
                    <p class="windFont">${speed}km/h</p>
                    <p class="windFontText">Wind Speed</p>
                  </div>
                </div>
              </div>
             </div>
          </article>`;
  document.getElementById("card").innerHTML += html;
}

function add_main(
  city_name,
  temp,
  humid,
  speed,
  desc,
  name,
  temp_feels_like,
  sunrise,
  sunset
) {
  let html = `<article>
    <p id="city">${city_name}</p>
            <div id="img_info">
            <img src="images/${name}.png" alt="img" width="120px" height="120px"/>
            <p id="desc">${desc}</p>
            </div>
            <div id="details">
              <p class="t">${temp}<sup>o</sup>C</p>
              <div id="humid">
                <div class="humidBox">
                  <img src="images/humidity.png" alt="img" width="32px" height="32px"/>
                  <div>
                    <p class="humidFont">${humid}%</p>
                    <p class="humidFontText">Humidity</p>
                  </div>
                </div>
                <div class="humidBox">
                  <img src="images/wind.png" alt="img" width="32px" height="32px"/>
                  <div>
                    <p class="windFont">${speed}km/h</p>
                    <p class="windFontText">Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </article>`;
  document.getElementById("attach").innerHTML = html;

  const sun_r = sunrise;
  const date = new Date(sun_r * 1000);
  let sun_rise_time = date.toLocaleString();

  let commaIndex = sun_rise_time.indexOf(",");
  let sun_rise = sun_rise_time.slice(commaIndex + 1).trim();

  const sun_s = sunset;
  const date2 = new Date(sun_s * 1000);
  let sun_set_time = date2.toLocaleString();

  let commaIndex2 = sun_set_time.indexOf(",");
  let sun_set = sun_set_time.slice(commaIndex2 + 1).trim();

  // let html2 = `<p class="city_name">${city_name}</p>
  //       <div class="others">
  //         <span class="temp">Temperature : ${temp}<sup>o</sup>C</span>
  //         <span class="feels">Feels like : ${temp_feels_like}<sup>o</sup>C</span>
  //         <span>Sunrise : ${sun_rise}</span>
  //         <span>Sunset : ${sun_set}</span>
  //       </div>
  //       <div class="array"></div>`;

  let html2 = `<p class="city_name">${city_name}</p>
        <div class="others">
          <span class="space">
            <span class="textStyle">${temp}<sup>o</sup>C</span>
            <div class="spacing">Temperature</div>
          </span>
          <span class="space">
            <span class="textStyle">${temp_feels_like}<sup>o</sup>C</span>
            <div class="spacing">Feels like</div>
          </span>
          <span class="space">
            <span class="textStyle">${sun_rise}</span>
            <div class="spacing">Sunrise</div>
          </span>
          <span class="space">
            <span class="textStyle">${sun_set}</span>
            <div class="spacing">Sunset</div>
          </span>
        </div>
        <div class="array"></div>`;

  let a = document.getElementsByClassName("content");
  a[0].innerHTML = html2;
}

async function fetch_data3(city_name, api_key) {
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${api_key}&units=metric`
  );

  if (!data.ok) {
    let elem = document.getElementById("error");
    elem.style.display = "block";
    elem.innerText = "Weather for the entered place is not available!";
    let invis = document.getElementById("main_content");
    invis.style.display = "none";
    document.getElementById("city").value = "";
    setTimeout(() => {
      elem.style.display = "none";
    }, 3000);
  }

  let info = await data.json();

  for (let i = 0; i < 40; i++) {
    let temp = info.list[i].main.temp;
    let temp_feels_like = info.list[i].main.feels_like;
    let humid = info.list[i].main.humidity;
    let name = info.list[i].weather[0].main;
    let desc = info.list[i].weather[0].description;
    let speed = info.list[i].wind.speed;
    let date = info.list[i].dt;

    speed = speed * 3.6;
    speed = speed.toFixed(2);
    temp = Math.round(temp);

    const time_date = date;
    const only_date = new Date(time_date * 1000);
    let o_date = only_date.toLocaleString();

    let commaIndex = o_date.indexOf(",");
    let final_date = o_date.slice(commaIndex + 1).trim();

    let commaIndex2 = o_date.indexOf(",");
    let time_final = o_date.slice(0, commaIndex2).trim();

    add_small_card(
      temp,
      temp_feels_like,
      name,
      desc,
      humid,
      speed,
      final_date,
      time_final
    );
  }
}

function add_small_card(
  temp,
  temp_feels_like,
  name,
  desc,
  humid,
  speed,
  final_date,
  time_final
) {
  let html2 = `<div class="small_card"> 
            <p class="hide">${desc}</p>
            <img src="images/${name}.png" alt="img" width="86px" id="SmallCardMain"/>
            <div class="s_details">
              <p class="notShown">${final_date}</p>
              <p class="notShown">${time_final}</p>
              <div class="last">
                <span style="margin:2px">
                  <p class="t">${temp}<sup>o</sup>C</p>
                  <p class="ftext">Temperature</p>
                </span>
                <span style="margin:2px">
                  <p class="feels_t">${temp_feels_like}<sup>o</sup>C</p>
                  <p class="ftext">Feels Like</p>
                </span>
              </div>
              <div id="humid2">
                <div class="humidBox">
                  <img src="images/humidity.png" alt="img" width="36px" height="32px"/>
                  <div class="humidSpace">
                    <p class="humidFont">${humid}%</p>
                    <p class="humidFontText">Humidity</p>
                  </div>
                </div>
                <div class="humidBox">
                  <img src="images/wind.png" alt="img" width="36px" height="36px"/>
                  <div class="humidSpace">
                    <p class="windFont">${speed}km/h</p>
                    <p class="windFontText">Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

  let b = document.getElementsByClassName("array");
  b[0].innerHTML += html2;
}
