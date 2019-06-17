const PROXY_CONFIG = [
    {
        context: [
            "/NotificationHub",
            "/api/auth/Login",
            "/api/Welcome",
            "/api/Navbar",
            "/api/Filtri",
            "/api/InserimentoIntervento",
            "/api/UpdateIntervento",
            "/api/ComposizionePartenzaAvanzata",
            "/api/ChiamataInCorso",
            "/api/ListaEventi",
            "/api/MezzoPrenotato"
        ],
        target: "http://172.16.16.13:5000/",
        secure: false,
        "changeOrigin": true,
        ws: true
    }
];
module.exports = PROXY_CONFIG;