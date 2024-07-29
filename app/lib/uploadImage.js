import axios from "axios";

const uploadToCloudinary = async (imageData) => {
    const url = `https://api.cloudinary.com/v1_1/ddysezj9j/upload`;

    const formData = new FormData();
    formData.append('file', imageData);
    formData.append('upload_preset', "fmsm0tox");

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading to Cloudinary', error);
        throw error;
    }
};

export default uploadToCloudinary;