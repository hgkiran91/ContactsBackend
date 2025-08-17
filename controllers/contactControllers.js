const dbConnect = require('../config/dbconnection');
const Contacts = require("../models/contacts");
const asyncHandler = require("express-async-handler");
const Response = require("../constants");

// @desc Get all contacts
// @route GET /api/v1/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {

    console.log("User Id: ", req.user.userId);
    const contacts = await Contacts.findAll({
        where: { userId: req.user.userId }
    });
    // const contacts = await Contacts.findAll();
    // if (!contacts) {
    //     res.status(Response.Status.NOT_FOUND).json({ message: Response.Message.NOT_FOUND });
    // }
    res.json({ data: contacts });
});

// @desc Create contact
// @route CREATE /api/v1/contacts/create
// @access private
const createContacts = asyncHandler(async (req, res) => {
    console.log("Body: ", req.body);
    console.log("Login User Data: ", req.user);
    const { name, email, contact } = req.body;
    if (!name || !email || !contact) {
        res.status(Response.Status.BAD_REQUEST).json({ message: Response.Message.BAD_REQUEST });
    }
    const newContact = await Contacts.create({
        name: name,
        email: email,
        contact: contact,
        userId: req.user.userId, // Associate contact with the logged-in user
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.status(201).json({ message: Response.Message.OK, data: newContact });

});

// @desc Get contact
// @route GET /api/v1/contacts/id
// @access private
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contacts.findByPk(req.params.id);
    if (!contact) {
        res.status(Response.Status.NOT_FOUND).json({ message: Response.Message.NOT_FOUND });
    }
    res.json({ message: `Requested Data for Id: ${req.params.id}`, data: contact });
})

// @desc Update contact
// @route PUT /api/v1/contacts/id
// @access private
const updateContactById = asyncHandler(async (req, res) => {
    const contactData = await Contacts.findByPk(parseInt(req.params.id));
    console.log("Contact Data: ", contactData);
    if (contactData) {
        const updatedData = await contactData.update({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.json({ message: `Contact Updated  for Id: ${req.params.id}`, data: updatedData });
    } else {
        res.status(Response.Status.NOT_FOUND).json({ message: Response.Message.NOT_FOUND });
    }
});

// @desc Delete contact
// @route DESTROY /api/v1/contacts/id
// @access private
const deleteContactById = asyncHandler(async (req, res) => {
    const contactData = await Contacts.findByPk(req.params.id);
    if (contactData) {
        const deletedData = await contactData.destroy();
        res.json({ message: Response.Message.OK });
    } else {
        res.status(Response.Status.NOT_FOUND).json({ message: Response.Message.NOT_FOUND });
    }
});

module.exports = { getContacts, createContacts, getContactById, updateContactById, deleteContactById };