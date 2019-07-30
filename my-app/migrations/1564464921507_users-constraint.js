exports.constraint = "unique_email_username";

exports.up = (pgm) => {
    pgm.addConstraint('users', exports.constraint, {
        unique: "email",
        unique: "username"
    });
};

exports.down = (pgm) => {

};