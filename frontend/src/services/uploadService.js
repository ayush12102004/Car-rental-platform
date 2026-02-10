import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

export const uploadImage = async (file, path) => {
    if (!file) return null;

    try {
        const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const uploadCarImages = async (files, carId) => {
    try {
        const uploadPromises = files.map(file =>
            uploadImage(file, `cars/${carId}`)
        );
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading car images:', error);
        throw error;
    }
};
