import { Request, Response } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const config = {
  region: process.env.AWS_REGION ? process.env.AWS_REGION : "us-east-1",
  credetntials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : "aws-key-id",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : "AWS_SECRET_ACCESS_KEY ",
  },
};

const s3 = new S3Client(config);

async function postPresignedS3url(req: Request, res: Response) {
  try {
    const { fileName, fileType } = req.body;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // valid for 5 mins

    res.status(200).json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not generate signed URL" });
  }
}

export default postPresignedS3url;
