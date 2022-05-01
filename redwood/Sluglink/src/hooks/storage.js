import create from "zustand";
import storage from '@react-native-firebase/storage';

export const useStorage = create((set, get) => ({
    /**
     * One photo upload
     * @param {string} path 
     * @param {string} filename 
     * @param {string} uri 
     * @returns Storage Bucket URL
     */
    uploadPhoto: async (path, filename, uri) => {
        let ref = storage().ref(`${path}/${filename}`);

        await ref.putFile(uri);
        
        return ref.getDownloadURL();
    },

    /**
     * Multiple photo upload
     * @param {string} path 
     * @param {{filename, uri}<>} photos 
     * @returns Array of { filename, url }
     */
    uploadPhotos: async (path, photos) => {
        return Promise.all(photos.map(async ({fileName, uri}) => {
            const url = await get().uploadPhoto(path, fileName, uri);
            return { filename: fileName, url };
        }));
    }
}));
