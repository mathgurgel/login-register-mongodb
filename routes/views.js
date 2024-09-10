import express from "express";

const router = express.Router();

function onViewIndex(req, res) {
    res.render('index', { layout: false });
}
router.get('/', onViewIndex);

async function onUserAuthentication(req, res) {
    console.log("onUserAuthentication");
    const isLogin = req.query.isLogin;

    if (isLogin === 'true') {
        res.render('login', { layout: false });

    } else {
        res.render('register', { layout: false });
    }
}
router.get('/onauth', onUserAuthentication);

export default router;