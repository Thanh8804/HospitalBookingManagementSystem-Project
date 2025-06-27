import express from 'express';
import configViewsEngine from './config/viewsEngine';
import initWebRoutes from './routes/router';
import { connectDB } from './config/connectDB';
import cors from 'cors';
import { deleteExpiredSchedules } from './services/autoServices';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
require('dotenv').config();

let app = express();

// ✅ Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// ✅ Cấu hình view engine và routes
configViewsEngine(app);
initWebRoutes(app);
connectDB();

// ✅ Cron job xóa lịch hết hạn mỗi ngày
cron.schedule('0 0 * * *', deleteExpiredSchedules);

// ✅ Khởi động server
let port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('✅ Backend NodeJS đang chạy tại cổng: ' + port);
});
