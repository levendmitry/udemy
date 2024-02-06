const postData = async (url, data) => {
    const fetchOptions = {
        method: "POST",
        body: data,
        headers: {
            "Content-type": "application/json"
        }, 
    };
    const result = await fetch(url, fetchOptions);

    return await result.json();
};

const getResource = async (url) => {
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
};

export {postData};
export {getResource};