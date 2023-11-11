import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AudioUpload {
  blob: Blob;
  userId: string;
  folderName: string;
}

const generateRandomFilename = (userId: string): string => {
  const timestamp = new Date().getTime();
  const uniqueIdentifier = Math.random().toString(36).substring(2);
  return `${timestamp}_${uniqueIdentifier}`;
};

const uploadFileToFirebase = async ({
  blob,
  userId,
  folderName,
}: AudioUpload): Promise<string> => {
  const storage = getStorage(); // Initialize Firebase Storage

  const filename = generateRandomFilename(userId);

  // Create a reference to the storage location
  const storageRef = ref(storage, `${folderName}/${filename}`);
  try {
    // Upload the blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    console.log("File uploaded successfully. Download URL:", downloadURL);

    return downloadURL; // Return the download URL for further use
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw error; // Rethrow the error for handling at a higher level
  }
};

export default uploadFileToFirebase;
