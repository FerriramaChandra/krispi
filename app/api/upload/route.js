// pages/api/upload.js

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CDN_CLOUD_NAME,
  api_key: process.env.CDN_API_KEY,
  api_secret: process.env.CDN_API_SECRET,
});

export async function POST(req) {
  try {
    // Retrieve the base64-encoded image data from the request body
    console.log("test")

    return NextResponse.json({ success: true, filePath }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}
