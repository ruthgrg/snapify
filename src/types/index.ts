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
    bio: string;
}

export type INavLink = {
    imageURL: string,
    route: string,
    label: string
}