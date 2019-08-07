function create(req, res) {
    const db = req.app.get('db');
    const { id } = req.params
    const { name } = req.body;
    
    db.address_book
        .findOne({
            userId: id
        })
        .then(adb => {
            db.groups
            .insert(
                {
                 address_book_id : adb.id,
                 name, 
                },
            )
        })
        .then(group => {
            res.status(201).json(group);
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

function getGroups(req, res) {
    const db = req.app.get('db');
    const { id } = req.params

    db.address_book
        .findOne({
            userId : id
        })
        .then(adb => {
            db.groups
                .find({
                    address_book_id: adb.id
                },
                    {
                        order: [{
                            field: 'name',
                            direction: 'asc',
                            nulls: 'last'
                        }]
                    })
                .then(groups => {
                    res.status(200).json(groups);
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


module.exports = {
    create,
    getGroups
};