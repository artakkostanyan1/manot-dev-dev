
const login = (data) => {
    console.log('data', data);
    fetch('/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const register = (data) => {
    console.log('data', data);
    fetch('url')
        .then(data => data.json())
        .then(
            (result) => {
                console.log('result', result);
            },
        )
        .catch((err) => {
            console.log(err);
        })
}

const resetPsswd = (data) => {
    console.log('data', data);
    fetch('url')
        .then(data => data.json())
        .then(
            (result) => {
                console.log('result', result);
            },
        )
        .catch((err) => {
            console.log(err);
        })
}

export {
    login,
    register,
    resetPsswd
};