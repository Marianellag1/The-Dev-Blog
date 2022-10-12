// //INSTRUCTIONAL STAFF PROVIDED CODE
// const router = require('express').Router();
// const { Student } = require('../models');
// // console.log(Student);

// const apiRoutes = require('./api');
// // const homeRoutes = require('./home-routes.js');

// // router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

// router.get('/', async (req, res) => {
//     try {
//         const studentData = await Student.findAll();
//         const studentList = studentData.map(stu => stu.get({ plain: true }))
//         console.log(studentList);
//         res.render('landingPage', { studentList })
//     } catch (err) {
//         console.log(err);
//     }
// })


// router.get('/add', async (req, res) => {
//     try {
//         res.render('addStu')
//     } catch (err) {
//         console.log(err);
//     }
// })

// module.exports = router;
