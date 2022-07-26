export const getGraphQLData = async (
    query: string,
    graphApiUrl: string
) => {
    const response = await fetch(graphApiUrl, {
        method: 'POST',
        body: JSON.stringify({ query, operationName: null, variables: null }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    const json = await response.json();
    return json;
};
