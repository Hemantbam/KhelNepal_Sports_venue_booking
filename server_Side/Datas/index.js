const API = 'http://localhost:3000/';//Front End Address
const Useremail="hemantbam133@gmail.com";
const UserPass="rens kijj gzoj bavz"
const mailOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: Useremail,
    pass: UserPass
  },
  tls: {
    rejectUnauthorized: false
}
};

const jwtSecret = "af2ebf89fd22290f3823e8ab88302e3535d3a9bfa4ac49fc531ae49e58c67545";

const atlasDB = "mongodb+srv://hemantbam133:spUQ6ytgJIpkmXB0@testdatabase.o78ej00.mongodb.net/?retryWrites=true&w=majority";

const khaltisecret='test_secret_key_9571ebc81db14cb4be5154e43371036a'



module.exports = { API, mailOptions, jwtSecret, atlasDB,Useremail,UserPass,khaltisecret };
