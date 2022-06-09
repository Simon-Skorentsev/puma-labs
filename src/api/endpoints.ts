import axiosInstace from ".";

export interface User {
    email: string,
    id: string,
    name: string,
    role: number
}

interface Registration {
    accessToken: string,
    refreshToken: string,
    user: Omit<User, "name">
}

interface Login extends Registration {
    user: User
}

export interface LogData {
    email: string,
    password: string
}

export interface RegData {
    email: string,
    password: string,
    username: string
}

export interface newsData {
    title: string,
    description: string,
    image: any
}

export interface PostData {
    author: string
    created_at: string
    description: string
    image: string
    title: string
    updated_at: string
    __v: number
    _id: string
}

export const endpoints = {
    register: (data: RegData) => axiosInstace.post<Registration>("user/register", data),
    login: (data: LogData) => axiosInstace.post<Login>("user/login", data),
    refresh: () => axiosInstace.get("user/refresh"),
    logout: () => axiosInstace.get("user/logout"),
    news: () => axiosInstace.get<PostData[]>("news/"),
    newsCreate: (data: newsData) => axiosInstace.put("news/create/", data)
};