import bcrypt from 'bcryptjs';
const username = 'admin';
const password = 'EliteSecurity@2026';
bcrypt.hash(password, 10).then(hash => {
    console.log(`NEW_USERNAME="${username}"`);
    console.log(`NEW_PASSWORD="${password}"`);
    console.log(`NEW_HASH="${hash}"`);
    bcrypt.compare(password, hash).then(match => {
        console.log(`VERIFIED=${match}`);
    });
});
