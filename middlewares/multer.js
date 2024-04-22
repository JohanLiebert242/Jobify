import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //Set the directory where the file will be stored
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        //Set the name of the upload file
        cb(null, fileName)
    }
})

const upload = multer({storage});

export default upload;