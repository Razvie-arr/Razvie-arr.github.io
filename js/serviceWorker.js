const staticDevSnake = "dev-snake-site-v1"
const assets = [
  "/",
  "/snake.html",
  "/css/snake.css",
  "/js/snake.js",
  "/swipe.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevSnake).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})