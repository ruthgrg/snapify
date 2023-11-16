export type INewUser = {
    name: string,
    email: string,
    username: string,
    password: string
}

export type IcontextType = {
    user: IUser,
    isLoading: boolean,
    isAuthenticated: boolean,
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    checkAuthUser: () => Promise<boolean>
}

export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    imageId: string;
    bio: string;
}

export type INavLink = {
    imageURL: string,
    route: string,
    label: string
}

export type INewPost = {
    userId: string,
    caption: string,
    file: File[],
    location?: string,
    tags?: string
}

export type IUpdatePost = {
    postId: string,
    caption: string,
    imageId: string,
    imageUrl: URL,
    file: File[],
    location: string,
    tags?: string
}

export type IUpdateProfile = {
    file: File[],
    name: string,
    username: string,
    email: string,
    bio: string,
    imageUrl: URL,
    imageId: string
    userId: string
}


export type IUpdateAccount = {
    name: string
}
