const express = require('express');

//middleware for jwt authentication

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['Authorization'];

    if (token) {
        jwt.verify(token, app.get('jwtkey'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send(401, 'Token no provista');
        /*   res.send({
              mensaje: 'Token no provista.'
          }); */
    }
});

///

const registerUser = (req, res) => {
    var ev = req.body;
    let params = ev.params;
    var connection = getConnectionString(ev.appname);

    bcrypt.hash(params.pass, 10, async function (err, hash) {


        let q = `Register '${params.userName}', '${params.mail}','${hash}' `;

        //register new user in database here

    })
}

const authenticateUser = (req, res) => {
    var ev = req.body;
    let params = ev.params;

};


const router = express.Router();

router
    .route('/')
    .post(registerUser);

router
    .route('/:user')
    .post(authenticateUser);

/* router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour); */

module.exports = router;
