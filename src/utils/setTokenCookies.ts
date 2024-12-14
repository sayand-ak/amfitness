export const setTokenCookies = (res: any, accessToken: string, refreshToken: string, _id: string) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
}