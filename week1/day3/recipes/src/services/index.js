import axios from "axios"

const _axios = axios.create({
  baseURL:
    "https://api.nytimes.com/svc/books/v3/lists/current/humor.json?api-key=UF4KeLU9D2yvmzjHWBvhFEBEGXQZ7tx1"
})

export const getBooks = () => _axios.get()
