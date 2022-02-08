import { get } from '../../utils/net'

export const getProductList = () => {
    return get("/api/robots").then((res) => res.data);
};