// let config = require("../../config");
require('dotenv').config();

module.exports = function (uploadFile, db, multer, multerS3, aws, path, jwt) {
    const s3 = new aws.S3({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        Bucket: 'todobucketname',
        region: "ap-south-1"
    });

    const uploadsBusinessGallery = multer({
        storage: multerS3({
            s3: s3,
            bucket: 'todobucketname',
            acl: "public-read",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: function (req, file, cb) {
                cb(
                    null,
                    path.basename(
                        file.originalname,
                        path.extname(file.originalname)
                    ) +
                    "-" +
                    Date.now() +
                    path.extname(file.originalname)
                );
            }
        }),
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        }
    }).array("files", 3);

    function checkFileType(file, cb) {
        // Allowed ext
        const filetypes = /jpeg|png|svg|jpg|pdf/;
        // Check ext
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Images And PDFs Only!");
        }
    }

    uploadFile.post('/uploadFile', (req, res, next) => {
        // let token = req.headers.authorization.slice(7)
        // console.log(req.body.token);
        // jwt.verify(req.body.token, config.SECRET, (err, authData) => {
        //     if (!err) {
        // console.log('token verfication is working =>',req.email)

        uploadsBusinessGallery(req, res, error => {

        // Check ext

            const {todoId, token } = req.body;
            console.log(token, todoId)
            // console.log(todoId)
            if (error) {

                // console.log("errors", error);
                res.json({ error: error });
            } else {
                console.log("files is here", req.files);
                // If File not found
                if (req.files === undefined) {
                    console.log("Error: No File Selected!");
                    res.json("Error: No File Selected");
                } else {
                    // jwtVerify(req, res, next)
                    let fileArray = req.files
                    let token = req.body.token
                    token = req.body.token.slice(4, token.length)
                    console.log(token)
                    jwt.verify(token, config.key.secret, (err, decode) => {
                        if (!err) {
                            console.log(decode)
                            const insertions = fileArray.map(file => {
                                console.log('fileArray inserting')
                                // fileLocation = fileArray[i].location;
                                // imgLocationArray.push(fileLocation);
                                return db.bucket.create({
                                        todoid: todoId,
                                        name:decode.user.name,
                                        location: file.location,
                                        filename: file.originalname
                                    })
                            })
                            Promise.all(insertions)
                                .then(() => db.bucket.findAll({ raw: true})
                                    .then(userFiles => {
                                        console.log("baad wala hai yrr");
                                        res.send({
                                            data: userFiles
                                        });
                                    })
                                    .catch(err => console.log(err))
                                )

                                .catch(err => console.log(err));
                            // req.email = decode.user.email
                        }
                        else {
                            console.log(err)
                            res.json('token is expired')
                        }
                    })
                    // If Success

                    // fileLocation;
                    // Declare Array to store fileLocation and fileName 
                    // const imgLocationArray = [];
                    // const fileName = []
                    // for (let i = 0; i < fileArray.length; i++) {
                    //     fileLocation = fileArray[i].location;
                    //     filename = fileArray[i].originalname;
                    //     console.log("filename", fileLocation);
                    //     fileName.push(filename)
                    //     imgLocationArray.push(fileLocation);
                    // }

                    // Save the file name into database
                    // for (var i = 0; i < imgLocationArray.length; i++) {
                    //     knex("bucket")
                    //         .insert({
                    //             location: imgLocationArray[i],
                    //             todoid: todoId,
                    //             filename: fileName[i]
                    //         })
                    //         .then(() => {
                    //             console.log('inserted successfully!')
                    //         })
                    //         .catch(err => console.log(err));
                    // }

                    // Sending response to the client ...
                    // knex('bucket')
                    //     .then(data => {
                    //         console.log(data)
                    //         res.json({
                    //             data: data
                    //         });
                    //     })
                    //     .catch(err => console.log('got it ', err))
                }
            }
        });
    });
};