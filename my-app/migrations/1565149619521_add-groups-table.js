exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('groups', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        name: {
        	type: 'text',
        	notNull: true,
        },
        contacts: {
        	type: 'integer[]',
        },
        address_book_id: {
            type: 'integer',
            notNull: true,
            references: '"address_book"',
        },
    });
};

exports.down = (pgm) => {

};
