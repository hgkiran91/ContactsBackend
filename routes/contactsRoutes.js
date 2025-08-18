const express = require("express");
const router = express.Router();
const { getContacts, createContacts, getContactById, updateContactById, deleteContactById } = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");


// router.use(validateToken); // One of the way if you are validating for all the routes

router.get('/contacts/', validateToken, getContacts);

router.post('/contacts/create', validateToken, createContacts);

router.get('/contacts/:id', validateToken, getContactById);

router.put('/contacts/:id', validateToken, updateContactById); 

router.delete('/contacts/:id', validateToken, deleteContactById);

module.exports = router;