//************************************ */ Getting Dom Elements

const submitBtn = document.getElementById("submitBtn")
const cityName = document.getElementById("cityName")
const city_name = document.getElementById("city_name")

const temp_status = document.getElementById("temp_status")
const temp_real_value = document.getElementById("temp_real_val")

const day = document.getElementById("day")
const date = document.getElementById("date")

/* Getting css class for dom Manipulation */

const hide_data = document.querySelector(".middle_layer")

const getInfo = async (event) => {
  event.preventDefault()

  let cityVal = cityName.value
  if (cityVal === "") {
    city_name.innerText = `Plz Write City Name Before Search`
    hide_data.classList.add("data_hide")
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=imperial&appid=04c084bc6d9c4e173efebdca74fb258d`
      const response = await fetch(url)
      const data = await response.json()
      const arrdata = [data]
      const City = `${arrdata[0].name} ,${arrdata[0].sys.country}`
      const tmp = Math.ceil((arrdata[0].main.temp - 32) * (5 / 9))
      const weather = arrdata[0].weather[0].main

      if (weather == "Clear") {
        temp_status.innerHTML =
          "<i class='fa fa-sun' style='color:#eccc68'></i>"
      } else if (weather == "Clouds") {
        temp_status.innerHTML = "<i class='fa fa-cloud'></i>"
      } else if (weather == "Rain") {
        temp_status.innerHTML = "<i class='fa fa-cloud-rain'></i>"
      } else {
        temp_status.innerHTML = "<i class='fa fa-cloud'></i>"
      }

      temp_real_value.innerText = `${tmp}`
      city_name.innerText = City
      hide_data.classList.remove("data_hide")
      cityVal = ""
    } catch (error) {
      city_name.innerText = `City Not Found`
      hide_data.classList.add("data_hide")
    }
  }
}

const getCurrentDay = () => {
  const weekday = new Array(7)
  weekday[0] = "Sunday"
  weekday[1] = "Monday"
  weekday[2] = "Tuesday"
  weekday[3] = "Wednesday"
  weekday[4] = "Thursday"
  weekday[5] = "Friday"
  weekday[6] = "Saturday"

  let currentdate = new Date()
  const days = weekday[currentdate.getDay()]
  day.innerText = days

  date.innerText = currentdate.toLocaleDateString()
}
getCurrentDay()

// Calling Search Function
submitBtn.addEventListener("click", getInfo)

// Geolocation Function

const successCallback = (position) => {
  const lat = position.coords.latitude
  const longi = position.coords.longitude
  const latlongPosition = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&units=imperial&appid=04c084bc6d9c4e173efebdca74fb258d`
      const response = await fetch(url)
      const data = await response.json()
      const arrdata = [data]
      const City = `${arrdata[0].name} ,${arrdata[0].sys.country}`
      const tmp = Math.ceil((arrdata[0].main.temp - 32) * (5 / 9))
      const weather = arrdata[0].weather[0].main

      if (weather == "Clear") {
        temp_status.innerHTML =
          "<i class='fa fa-sun' style='color:#eccc68'></i>"
      } else if (weather == "Clouds") {
        temp_status.innerHTML = "<i class='fa fa-cloud' style='color:#fff'></i>"
      } else if (weather == "Rain") {
        temp_status.innerHTML =
          "<i class='fa fa-cloud-rain' style='color:#fff'></i>"
      } else {
        temp_status.innerHTML =
          "<i class='fa fa-cloud-rain' style='color:#fff'></i>"
      }

      temp_real_value.innerText = `${tmp}`
      city_name.innerText = City
      hide_data.classList.remove("data_hide")
      cityVal = ""
    } catch (error) {
      city_name.innerText = `City Not Found`
      hide_data.classList.add("data_hide")
    }
  }
  latlongPosition()
}

const errorCallback = (error) => {
  city_name.innerText = error.GeolocationPositionError.message
}

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}
getLocation()
