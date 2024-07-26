const app= require("./app");
require("dotenv").config({path:".env"});
const cloudinary = require("cloudinary");
const dbConnect = require("./config/database");
const PORT = process.env.PORT || 5000;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

dbConnect();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api', createProxyMiddleware({
    target: 'http://192.168.101.11:5000',
    changeOrigin: true,
    timeout: 5000, // Increase timeout if needed
    proxyTimeout: 5000,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    }
}));

app.listen(3000, () => {
    console.log('Server running on http://192.168.101.11:3000');
});

// const server=app.listen(PORT, ()=>{
//   console.log(`Server is hosted on port number ${PORT}`)
// })

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
});   