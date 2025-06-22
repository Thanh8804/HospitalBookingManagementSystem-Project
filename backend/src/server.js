// import express from 'express';
// import configViewsEngine from './config/viewsEngine';
// import initWebRoutes from './routes/router';
// import { connectDB } from './config/connectDB';
// import cors from 'cors';
// import { deleteExpiredSchedules } from './services/autoServices';
// const cookieParser = require('cookie-parser');
// const cron = require('node-cron');
// require('dotenv').config();

// let app = express();
// app.use(cookieParser());
// app.use(cors({ credentials: true, origin: true }));

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// //config app:
// configViewsEngine(app);
// initWebRoutes(app);

// connectDB();

// cron.schedule('0 0 * * *', deleteExpiredSchedules);

// let port = process.env.PORT;
// app.listen(port, () => {
//     console.log('backend nodejs running on port ' + port);
// });
import express from 'express';
import configViewsEngine from './config/viewsEngine';
import initWebRoutes from './routes/router';
import { connectDB } from './config/connectDB';
import cors from 'cors';
import { deleteExpiredSchedules } from './services/autoServices';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

require('dotenv').config();

let app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ Khai báo đường dẫn thư mục uploads
const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir); // Tạo nếu chưa tồn tại
}

// ✅ Cho phép client truy cập ảnh
app.use('/uploads', express.static(uploadsDir));

// ✅ Cấu hình multer để lưu file ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

// ✅ API nhận upload ảnh từ frontend
app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const url = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    return res.json({ url });
});

// Cấu hình view engine và routes
configViewsEngine(app);
initWebRoutes(app);
connectDB();

// Cron job xóa lịch cũ
cron.schedule('0 0 * * *', deleteExpiredSchedules);

// Lắng nghe
let port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('✅ Backend NodeJS đang chạy tại cổng: ' + port);
});
