// 27017 is mongodb's default port. 'meanauth' is name of our database. Secret: used when we create and verify JSON Web Tokens

module.exports = {
    
    database: 'mongodb://localhost:27017/meanauth',
    secret: 'yoursecret'
}