const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {getDrafts,createDraft, getDraftById, updateDraft, deleteDraft} = require('../controllers/draftController');

const router = express.Router();


router.route('/')
    .post(protect, createDraft)
    .put(protect,updateDraft);

router.route('/admin')
    .get(protect,getDrafts);
    
router.route('/:id')
    .get(getDraftById)
    .delete(protect,deleteDraft);


module.exports = router;
