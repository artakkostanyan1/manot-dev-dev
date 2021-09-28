
const login = (data) => {
    console.log('data', data);
    fetch('http://localhost:5000/api/v1/login', {
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
    fetch('http://localhost:5000/api/v1/register', {
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

const sendEmail = (data) => {
    console.log('data', data);
}

const resetPsswd = (data) => {
    console.log('data', data);
    fetch('http://localhost:5000/api/v1/register', {
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

export {
    login,
    register,
    sendEmail,
    resetPsswd
};