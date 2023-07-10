import { useQuery } from 'react-query';
import {getUser} from "../http/userAPI";

function UseAuthenticatedUser() {
    const { data: user, isLoading } = useQuery(['user'], getUser, {
        retry: 0,
        keepPreviousData: true
    });

    return {
        user,
        isLoading,
        isAuthenticated: Boolean(user)

    };
}

export default UseAuthenticatedUser;