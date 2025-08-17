const express = require("express");
const router = express.Router();
const { getContacts, createContacts, getContactById, updateContactById, deleteContactById } = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");


// router.use(validateToken); // One of the way if you are validating for all the routes

router.get('/', validateToken, getContacts);

router.post('/create', validateToken, createContacts);

router.get('/:id', validateToken, getContactById);

router.put('/:id', validateToken, updateContactById); 

router.delete('/:id', validateToken, deleteContactById);

module.exports = router;