import { ID, Query } from "appwrite";
import { INewPost, INewUser, IUpdateAccount, IUpdatePost, IUpdateProfile, IUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";


export const createUserAccount = async (user: INewUser) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateUserAccount = async (userDetails: IUpdateAccount) => {
    try {
        const updatedUserName = await account.updateName(userDetails.name);

        if (!updatedUserName) throw Error;
        return updatedUserName;

    } catch (error) {
        console.log(error)
    }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );

        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export const signInAccount = async (user: {
    email: string;
    password: string;
}) => {
    try {
        const session = await account.createEmailSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error();
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
};


export const signOutAccount = async () => {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
};

export const createPost = async (post: INewPost) => {
    try {
        // Upload file to appwrite storage by calling self defined function
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;

        // Get file Url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // create post
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags,
            }
        );

        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newPost;
    } catch (error) {
        console.log(error);
    }
};

// Create a uploadFile function to store file in appwrite
export const uploadFile = async (file: File) => {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
};

export const getFilePreview = (fieldId: string) => {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fieldId,
            2000,
            2000,
            "top",
            100
        );

        if (!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        console.log(error);
    }
};

export const deleteFile = async (fieldId: string) => {
    console.log('fieldId:', fieldId)
    try {
        await storage.deleteFile(appwriteConfig.storageId, fieldId);
        return { status: "ok" };
    } catch (error) {
        console.log(error);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(20)]
        );

        if (!posts) throw Error;
        return posts;
    } catch (error) {
        console.log(error);
    }
};

export const getPostById = async (postId: string) => {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        );

        if (!post) throw Error;

        return post;
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (postID: string, likesArray: string[]) => {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postID,
            {
                likes: likesArray,
            }
        );

        if (!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
};

export const savePost = async (postId: string, userId: string) => {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        );

        if (!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
};

export const deleteSavePost = async (savedRecordID: string) => {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordID
        );

        if (!statusCode) throw Error;

        return statusCode;
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (post: IUpdatePost) => {
    const hasFileToUpdate = post.file.length > 0;

    try {
        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        };

        if (hasFileToUpdate) {
            //Upload image to storage
            const uploadedFile = await uploadFile(post.file[0]);
            if (!uploadedFile) throw Error;

            // Get file url
            const fileUrl = getFilePreview(uploadedFile.$id);

            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
        }

        //convert tags in an array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // update post
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags,
            }
        );

        if (!updatePost) {
            // Delete new file that has been recently uploaded
            if (hasFileToUpdate) {
                await deleteFile(image.imageId);
            }
            // If no new file uploaded, just throw error
            throw Error;
        }

        // Safely delete old file after successful update
        if (hasFileToUpdate) {
            await deleteFile(post.imageId);
        }

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (user: IUpdateProfile) => {
    const hasFileToUpdate = user.file.length > 0;
    console.log('user form update profile api', user)

    try {

        let image = {
            imageUrl: user.imageUrl,
            imageId: user.imageId
        };

        if (hasFileToUpdate) {
            //Upload image to storage
            const uploadedFile = await uploadFile(user.file[0]);
            if (!uploadedFile) throw Error;

            // Get file url
            const fileUrl = getFilePreview(uploadedFile.$id);

            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = { imageUrl: fileUrl, imageId: uploadedFile.$id };
        }


        const updatedProfile = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, user.userId,
            {
                name: user.name,
                username: user.username,
                email: user.email,
                imageurl: image.imageUrl,
                imageId: image.imageId,
                bio: user.bio
            }
        );

        if (!updatedProfile) {
            // Delete new file that has been recently uploaded
            if (hasFileToUpdate) {
                await deleteFile(image.imageId);
            }
            // If no new file uploaded, just throw error
            throw Error;
        }

        // Safely delete old file after successful update
        if (hasFileToUpdate && user.imageId !== '1234') {
            await deleteFile(user.imageId);
        }

        const userAccount = {
            name: user.name
        }

        await updateUserAccount(userAccount)

        return updatedProfile;
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (postId: string, imageId: string) => {
    if (postId || imageId) throw Error;

    const deletedPost = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
    );

    if (!deletedPost) throw Error;

    return { status: "ok", message: "Successfully deleted" };
};

export const getInfinitePost = async ({
    pageParams,
}: {
    pageParams: number;
}) => {
    const queries = [Query.orderDesc("$updatedAt"), Query.limit(10)];

    if (pageParams) {
        queries.push(Query.cursorAfter(pageParams.toString()));
    }

    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
        );

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
    }
};

export const getAllpostsById = async (userId: string) => {
    const queries = [Query.equal('creator', userId)]
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
        )

        if (!posts) throw Error;

        return posts
    } catch (error) {
        console.log(error)
    }
}

export const getSearchPosts = async (searchTerm: string) => {
    try {
        const searchedPosts = databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search("caption", searchTerm)]
        );

        if (!searchedPosts) throw Error;

        return searchedPosts;
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsers = async () => {
    try {
        const allUsers = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.orderDesc("$createdAt")]
        );

        if (!allUsers) throw Error;

        return allUsers;
    } catch (error) {
        console.log(error);
    }
};

export const getSavedPosts = async (userId: string) => {
    try {
        const savedPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            [Query.equal('user', userId)]
        );

        if (!savedPosts) throw Error;

        return savedPosts;
    } catch (error) {
        console.log(error);
    }
};
