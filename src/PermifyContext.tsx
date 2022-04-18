import { createContext } from "react";

export interface UserPayload {
    id: string,
    roles?: string[],
    permissions?: string[]
}

export interface PermifyAuthContext {
    setUser: (user: UserPayload) => void;
    isAuthorized: (roleNames?: string[], permissionsNames?: string[]) => Promise<boolean>;
    isLoading: boolean;
}

const noUser = (): never => {
    throw new Error("You didn't set User!");
};

const PermifyContext = createContext<PermifyAuthContext>({
    setUser: noUser,
    isAuthorized: noUser,
    isLoading: false,
});

export default PermifyContext;