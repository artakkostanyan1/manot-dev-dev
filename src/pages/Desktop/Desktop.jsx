import { useState, useEffect } from 'react';
import UserHeader from '../../components/UserHeader/UserHeader';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar'
import AnotationTool from '../../components/AnotationTool/AnotationTool';
import './Desktop.scss';

require('dotenv').config();

function Desktop() {
    // useEffect(() => {
    //     fetch(`${apiUrl}get-user`, {
    //         method: 'GET',
    //         headers: {
    //             "x-access-token": localStorage.getItem('token')
    //         }
    //     })
    //         .then(response => {
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log(data)
    //             setImagesList(data.message);
    //         })
    // }, [])
    const data = [
        {
            image: 'horses-1.png',
            label: 'Image 1'
        },
        {
            image: 'horses-1.png',
            label: 'Image 2'
        },
        {
            image: 'horses-1.png',
            label: 'Image 3'
        },
        {
            image: 'horses-1.png',
            label: 'Image 5'
        },
        {
            image: 'horses-1.png',
            label: 'Image 6'
        }
    ];

    const [imagesList, setImagesList] = useState(data);
    const [isRotationAllowed, setIsRotationAllowed] = useState(false)

    return (
        <div className='comp-desktop'>
            <UserHeader className='user_header_desktop' />
            <div className='main-content-container'>
                <LeftBar className='left_bar' imagesList={imagesList} isRotationAllowed={isRotationAllowed} setIsRotationAllowed={setIsRotationAllowed} />
                <div className='main-photo'>
                    <AnotationTool image={imagesList[0].image} isRotationAllowed={isRotationAllowed} /* TODO */ />
                </div>
                <RightBar />
            </div>
        </div>
    )
}

export default Desktop;