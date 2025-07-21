export function decodeTokenExpiration(token: string): number | null {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload && payload.exp) {
            return payload.exp * 1000;
        }
    } catch (e) {
        console.error("Failed to decode token expiration:", e);
    }
    return null;
}
