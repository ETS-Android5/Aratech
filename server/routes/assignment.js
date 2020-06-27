const router = require('express').Router();
const assignmentController = require('../controllers/assignmentController');


module.exports = router;
//upload assignment files
router.get("/fotos_videos/:id/upload", async(req, res) = {
    try:{
        const: upload = await,
        Uploads,findById(req,params,id) {
            if (!upload || !upload.uploads) {
                throw new Error("no image found");
            }
            res.set("Content-Type", "image/png");
            res.send(upload.uploads);
        },
        catch(e) {
            res.status(400).send(e.message);
        }


    }
});
