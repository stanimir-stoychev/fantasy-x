import { useQuery } from 'react-query';
import API from '../api';

export default () => {
    return useQuery('Market', () => API.getPlayers(), { staleTime: 600 * 1000 });
};
