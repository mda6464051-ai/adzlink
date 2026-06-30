const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// اتصال به دیتابیس (در ورسل، آدرس MONGO_URI را در بخش Environment Variables اضافه کنید)
mongoose.connect(process.env.MONGO_URI);

// مدل داده برای اینفلوئنسرها
const Influencer = mongoose.model('Influencer', {
    name: String,
    category: String,
    phone: String,
    card: String,
    shaba: String,
    status: { type: String, default: 'pending' }
});

// ثبت‌نام اینفلوئنسر
app.post('/api/register', async (req, res) => {
    try {
        const newInfluencer = new Influencer(req.body);
        await newInfluencer.save();
        res.json({ success: true, message: "ثبت‌نام با موفقیت انجام شد." });
    } catch (err) {
        res.status(500).json({ success: false, message: "خطا در ثبت اطلاعات" });
    }
});

// پنل مدیریت
app.get('/api/admin', async (req, res) => {
    if (req.query.pass !== '1522') return res.status(401).send('دسترسی غیرمجاز');
    
    const list = await Influencer.find();
    res.json(list);
});

module.exports = app;

