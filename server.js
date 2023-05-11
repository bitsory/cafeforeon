const express = require('express');
const app = express();
// const session = require('express-session');

require('dotenv').config()


app.listen(process.env.PORT, function() {
    console.log('listening on 8080');
    console.log("updated");
});


app.use(express.static('public'));

// app.use(session({
//     key: 'loginData',
//     secret: 'blackcatdoubleattack',
//     resave: false,
//     saveUninitialized: true,
//     HttpOnly:true,
//     // cookie: { maxAge: 360000 } // 5 minute
//     cookie: { maxAge: 3600000 }

// }))


app.get('/',(req,res) => {
    console.log("home home home");   
    res.sendFile(__dirname + "/public/index.html");
    // if (req.session.loginData) {
    //     console.log("login data exist");        
	// 	res.render('index.ejs', {post : req.session.loginData.id});
	// } else {
    //     console.log("login data nothing");
	// 	res.sendFile(__dirname + "/public/index.html");
	// }
});
