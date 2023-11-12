/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'

import { createPost, createUserAccount, deleteSavePost, getAllPosts, getAllUsers, getCurrentUser, getInfinitePost, getPostById, getSearchPosts, likePost, savePost, signInAccount, signOutAccount, updatePost } from '../appwrite/api'
import { INewPost, INewUser, IUpdatePost } from '@/types'
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

export const useQueryToGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getAllPosts
    });
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

export const useQueryGetInfinitePosts = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: getInfinitePost,
        getNextPageParam: (lastPage: any) => {
            if (lastPage && lastPage.documents.length === 0) return null;
            const lastId = lastPage.documents[lastPage.documents.length - 1].$id

            return lastId;
        }
    });

}


export const useQueryGetSeachedPosts = (searchTerm: string) => {
    console.log('query function called')
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