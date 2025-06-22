// import { storage } from './configFirebase';
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

// export const uploadFileToFirebase = async (path, file) => {
//     let downloadURL = 'no-image';
//     let storageRef = ref(storage, `${path}/${file.name}`);
//     await uploadBytesResumable(storageRef, file);
//     downloadURL = await getDownloadURL(ref(storage, `${path}/${file.name}`));
//     return downloadURL;
// };

// export const uploadMultiFileToFirebase = async (arrFiles) => {
//     let listFile = {};
//     await Promise.all(
//         arrFiles.map(async (item) => {
//             let storageRef = ref(storage, `${item.path}/${item.file.name}`);
//             await uploadBytesResumable(storageRef, item.file);
//             let downloadURL = await getDownloadURL(ref(storage, `${item.path}/${item.file.name}`));
//             listFile[item.name] = downloadURL;
//         }),
//     );
//     return listFile;
// };
import axios from 'axios';

// Upload 1 file
export const uploadFileToFirebase = async (path, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    try {
        const res = await axios.post('http://localhost:8000/api/upload', formData);
        return res.data.url;
    } catch (error) {
        console.error('Upload thất bại:', error);
        return 'no-image';
    }
};

// Upload nhiều file
export const uploadMultiFileToFirebase = async (arrFiles) => {
    let listFile = {};

    await Promise.all(
        arrFiles.map(async (item) => {
            const formData = new FormData();
            formData.append('file', item.file);
            formData.append('path', item.path);

            try {
                const res = await axios.post('http://localhost:8000/api/upload', formData);
                listFile[item.name] = res.data.url;
            } catch (error) {
                console.error(`Upload ${item.name} thất bại:`, error);
                listFile[item.name] = 'no-image';
            }
        })
    );

    return listFile;
};
