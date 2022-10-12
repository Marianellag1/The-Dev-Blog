//INSTRUCTIONAL STAFF PROVIDED CODE
const router = require('express').Router();
const { Student } = require('../../models');

router.post('/', async (req, res) => {
    // console.log(req.body);
    try {
        const stuData = await Student.create(req.body);
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    // console.log(req.params.id);
    try {
        const stuData = await Student.destroy({
            where: {
                stu_id: req.params.id
            }
        }
        )
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;