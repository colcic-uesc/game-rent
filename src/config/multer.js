import multer from "multer";
import crypto from "crypto";
import { extname, resolve } from "path";

export default {
   storage: multer.diskStorage({
      destination: resolve(__dirname, "..", "..", "public", "uploads"),
      filename: (req, file, cb) => {
         crypto.randomBytes(16, (err, res) => {
            if (err) return cb(err);

            return cb(
               null,
               `${res.toString("hex")}${extname(file.originalname)}`
            );
         });
      },
   }),
   limits: {
      fileSize: 4 * 1024 * 1024, // 2MB
   },
};
