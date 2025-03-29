const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/databaseConnect");
const authRoutes = require("./routes/Auth");
const eventRoutes = require("./routes/Event");  
const settingsRoutes = require("./routes/Settings");
const cors = require("cors");

const app = express();

dotenv.config();
app.use(express.json()); 

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

// Remove the /v1 from routes
app.use("/api/auth", authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/settings', settingsRoutes);    

const PORT = process.env.PORT || 8000;
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
});


