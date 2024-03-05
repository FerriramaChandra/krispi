// pages/api/upload.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    // Retrieve the base64-encoded image data from the request body
    const formData = await req.formData()
    const photo = formData.get('photo');
    const name = formData.get('name');
    const uploadDir = `public/labeled_images/${name}`;
    console.log("formData", formData);
    console.log("photo", photo);
    
    // Ensure the 'public/labeled_images' directory exists, create it if not
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // Extract the base64 data and create a Buffer
    const base64Data = photo.toString().replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    // console.log(base64Data);
    // console.log(buffer)

    // Determine the next file number
    const existingFiles = fs.readdirSync(uploadDir);
    const nextFileNumber = existingFiles.length + 1;

    // Generate the new file name
    const fileName = `${nextFileNumber}.jpeg`;
    const filePath = path.join(uploadDir, fileName);

    console.log("nextFileNumber", nextFileNumber);
    console.log("filePath", filePath);

    // Write the Buffer to the file
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ success: true, filePath }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}
