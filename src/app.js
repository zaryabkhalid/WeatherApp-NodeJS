const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")

const publicPath = path.join(__dirname, "../public")
const layoutPath = path.join(__dirname, "../views", "layouts")
const partialsPath = path.join(__dirname, "../views", "partials")

app.set("view engine", "hbs")
app.set("views", layoutPath)
app.use(express.static(publicPath))

hbs.registerPartials(partialsPath)

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  })
})

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "Weather",
  })
})

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "404 error",
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
  })
})

app.listen(4000, () => {
  console.log("Listening to port 4000...")
})
