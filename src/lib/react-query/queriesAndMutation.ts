/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { createPost, createUserAccount, deletePost, deleteSavePost, getAllPosts, getAllUsers, getAllpostsById, getCurrentUser, getPostById, getSavedPosts, getSearchPosts, likePost, savePost, signInAccount, signOutAccount, updatePost, updateProfile } from '../appwrite/api'
import { INewPost, INewUser, IUpdatePost, IUpdateProfile } from '@/types'
import { QUERY_KEYS } from "./queryKeys";



export const userCreateAccountMutation = () => {

    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const userSigninMutation = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    })
}

export const useSignOutMutation = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useQueryCreatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useQueryToLikePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postID, likesArray }: { postID: string, likesArray: string[] }) => { return likePost(postID, likesArray) },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }

    });
}

export const useQueryToSavedPostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postID, userID }: { postID: string, userID: string }) => { return savePost(postID, userID) },
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
        }

    });
}

export const useQueryToDeleteSavedPostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (savedRecordID: string) => { return deleteSavePost(savedRecordID) },
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
        }

    });
}

export const useQueryToDeletePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, imageId }: { postId: string, imageId: string }) => deletePost(postId, imageId),
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
        }

    });
}

export const useQueryToUpdatePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}

export const useQueryToUpdateProfileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: IUpdateProfile) => updateProfile(user),
        onSuccess: async () => {

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })

        }
    })
}

export const useQueryToGetCurrentUser = () => {
    return useQuery(
        {
            queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            queryFn: getCurrentUser
        }
    )
}

export const useQueryToGetRecentPosts = () => {

    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getAllPosts
    });
}

export const useQueryGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useQueryGetPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    })
}

// export const useQueryGetInfinitePosts = () => {
//     return useInfiniteQuery({
//         queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
//         queryFn: getInfinitePost,
//         getNextPageParam: (lastPage: Models.Document) => {
//             console.log(lastPage)
//             if (lastPage && lastPage.documents.length === 0) return null;
//             const lastId = lastPage.documents[lastPage.documents.length - 1].$id
//             console.log(lastId)

//             return lastId;
//         },

//     });

// }

export const useQueryGetAllPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_POSTS],
        queryFn: getAllPosts
    });
}



export const useQueryGetPostsById = (userId: string) => {

    return useQuery({
        queryKey: [QUERY_KEYS.GET_POSTS_BY_ID],
        queryFn: () => getAllpostsById(userId)
    });

}


export const useQueryGetSeachedPosts = (searchTerm: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SEARCHED_POSTS, searchTerm],
        queryFn: () => getSearchPosts(searchTerm),
        enabled: !!searchTerm
    })
}

export const useQueryGetAllUsers = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        queryFn: getAllUsers
    });
}

export const useQueryGetSavedPosts = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
        queryFn: () => getSavedPosts(userId)
    });
}