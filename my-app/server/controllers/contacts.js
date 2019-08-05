function create(req, res) {
    const db = req.app.get('db');
    const { id } = req.params
    const { first_name, last_name, 
        home_phone, mobile_phone, work_phone, 
        email, city, state_or_province, postal_code, country } = req.body;
    
    db.address_book
        .findOne({
            userId: id
        })
        .then(adb => {
            db.contacts
            .insert(
                {
                 address_book_id : adb.id,
                 first_name, 
                 last_name,
                 home_phone, 
                 mobile_phone, 
                 work_phone,
                 email, 
                 city, 
                 state_or_province, 
                 postal_code, 
                 country
                },
            )   
        })
        .then(contact => {
            res.status(201).json(contact);
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

function getContacts(req, res) {
    const db = req.app.get('db');
    const { id } = req.params

    db.address_book
        .findOne({
            userId : id
        })
        .then(adb => {
            db.contacts
                .find({
                    address_book_id: adb.id
                },
                    {
                        order: [{
                            field: 'first_name',
                            direction: 'asc',
                            nulls: 'last'
                        }]
                    })
                .then(contacts => {
                    res.status(200).json(contacts);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).end();
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}


function sort(req, res) {
    const db = req.app.get('db');
    const { id } = req.params
    const { sort_column, sort_by } = req.body

    db.address_book
        .findOne({
            userId: id
        })
        .then(adb => {
            db.contacts
                .find({
                    address_book_id: adb.id                    
                }, 
                {
                    order: [{
                        field: sort_column,
                        direction: sort_by,
                        nulls: 'last'
                    }]
                })
                .then(contacts => {
                    res.status(200).json(contacts);
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

function viewContact(req, res) {
    const db = req.app.get('db');
    const { id } = req.params

    db.contacts
        .findOne({
            id
        })
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

function updateContact(req, res) {
    const db = req.app.get('db');
    const { id } = req.params;
    const { 
        first_name,
        last_name,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        state_or_province,
        postal_code,
        country 
    } = req.body;
    db.contacts
    .save({
        id,
        first_name,
        last_name,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        state_or_province,
        postal_code,
        country
    })
    .then(contact => res.status(201).json(contact))
    .catch(err => {
        console.error(err);
        res.status(500).end();
    });
}

function deleteContact(req, res) {
    const db = req.app.get('db');
    const { id } = req.params
    db.contacts
        .destroy({
            id
        })
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

module.exports = {
    create,
    getContacts,
    sort,
    viewContact,
    updateContact,
    deleteContact
};