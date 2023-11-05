/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'

import { createUserAccount, signInAccount } from '../appwrite/api'
import { INewUser } from '@/types'

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