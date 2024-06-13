const staticPage = "dev-user-site"

const assets = [
    "/",
    "/agregar.js",
    "/index.html",
    "/style.css",
    "/ICON1.png",
    "/ICONO2.png",
    "/ICONO3.png",
    "/ICONO4.png",
    "/ICONO5.png",
    "/ICONO6.png",
    "/ICONO7.png",
    "/ICONO8.png",
    "/ICONO9.png",
    "/ICONO10.png"
]

self.addEventListener("install", (installEvent)=>{
    installEvent.waitUntil(
        caches.open(staticPage).then(cache=>{
            cache.addAll(assets);
        })
    );
})

self.addEventListener("fetch", (fecthEvent)=>{
    fecthEvent.respondwith(
        caches.match(fecthEvent.request)
        .then((response)=>{
            return response || fetch(fecthEvent.request);
        })
    );
})

if("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((res)=>console.log("serviceWorker resgistrado"))
        .catch((res)=>console.log("serviceWorker no resgistrado"))
    })
}