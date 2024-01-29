
export const fetchWithToken = async (url: string, token: string, method : string) => {
    const response = await fetch(url, {
        headers: {
            Authorization: token,
        },
        method : method
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    return await response.json();
};


export const fetcher = (url: string, method : string) => fetch(url, {method : method}).then(res => res.json());
