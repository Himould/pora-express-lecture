const products = require("./products.json")
const express = require("express")
const app = express()
const PORT = 5200

// console.log(products)
// Add a middleware to parse all request body
app.use(express.json())

// MAIN ROUTE
app.get("/", function (request, response) {
  response.send("Welcome to my express server")
})

// JSON (is synonymous to) Objects in Javascript
// JSON = JavaScript Object Notation

// ENDPOINTS AND ROUTES
app.get("/api", function (request, response) {
  response.status(200).json({
    error: true,
    message: "Welcome to the API section of my express server",
  })
})

// Endpoint to retrieve all products
app.get("/api/products", function (request, response) {
  response.status(200).json(products)
})

function getLatestProductId() {
  return products.at(-1).id + 1
}

// Endpoint to add to products
// Every product must have an id, name, price, category
// But the id is generated by the server (more specifically, a DB vendor) and not a client
app.post("/api/products", function (request, response) {
  const body = request.body

  const newProduct = {
    id: getLatestProductId(),
    name: body.name,
    price: body.price,
    category: body.category,
  }

  // Add Product to products
  products.push(newProduct)

  response.status(201).json({
    error: false,
    message: "Product has been added successfully",
  })
})

// Endpoint to retrieve all products in a specific category
app.get("/api/products/:category", function (request, response) {
  const categoryName = request.params.category
  // Research Array.filter method
  const productsInACategory = products.filter(function (product) {
    return product.category === categoryName
  })

  if (productsInACategory.length === 0) {
    return response.status(404).json({
      // error: true,
      message: "Category not found"
    })
  } else {response.status(200).json(productsInACategory)} 
}) 
app.listen(PORT, function () {
  console.log(`App server has started on http://localhost:${PORT}`)
})
