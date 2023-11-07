/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'

import { createPost, createUserAccount, signInAccount, signOutAccount } from '../appwrite/api'
import { INewPost, INewUser } from '@/types'

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
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post)
    })
}