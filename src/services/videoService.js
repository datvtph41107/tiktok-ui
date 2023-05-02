import * as httpRequest from '~/utils/httpRequest';

export const videos = async ({ type, page }) => {
    try {
        const res = await httpRequest.get('/videos', {
            params: {
                type,
                page: page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
