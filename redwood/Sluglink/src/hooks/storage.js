import create from "zustand";
import storage from '@react-native-firebase/storage';

export const useStorage = create((set, get) => ({
    uploadPhoto: async (path, filename, uri) => {
        let ref = storage().ref(`${path}/${filename}`);

        await ref.putFile(uri);
        
        return ref.getDownloadURL();
    }
}));
