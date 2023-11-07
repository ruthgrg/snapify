/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'

import { createPost, createUserAccount, getAllPosts, signInAccount, signOutAccount } from '../appwrite/api'
import { INewPost, INewUser } from '@/types'
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

export const useCreatePostMutation = () => {
    const querClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            querClient.invalidateQueries({
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