import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import InfiniteScroll from 'react-infinite-scroll-component';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';

import { useState } from 'react';
import './LeftBar.scss';

require('dotenv').config();

function LeftBar({ isRotationAllowed, setIsRotationAllowed, imagesList, setImagesList, folderName }) {
    const [isFullScreen, setIsFullscreen] = useState(true);
    const [open, setOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const screen = isFullScreen ? 'full' : 'min';
    let interval = 1;

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const fetchMoreData = () => {
        interval++;
        fetch(`${apiUrl}get-annotation-images`, {
            method: 'POST',
            headers: {
                "x-access-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                image_interval: interval,
                folder_name: folderName,
            })
        })
            .then(response => {
                if (response.status === 403) {
                    setHasMore(!hasMore);
                } else {
                    return response.json();
                }
            })
            .then(res => {
                console.log('res', res)
                setImagesList(res.message);
            })
            .catch((err) => {
                console.log('error', err);
            })
    };

    return (
        <div className={`left-bar-conatainer ${screen}`}>
            <div
                className='resize-button-container'
                onClick={() => setIsFullscreen(!isFullScreen)}
            >
                {isFullScreen ? <FullscreenIcon /> : <FullscreenExit />}
            </div>
            {isFullScreen
                ? <div className='full_screen_leftbar'>
                    <form className='radio-buttons-container' onChange={() => setIsRotationAllowed(prev => !prev)}>
                        <div>
                            <input
                                type="radio"
                                name="box"
                                value='B-Box'
                                className='box-input'
                                defaultChecked={!isRotationAllowed}
                            />
                            <label>B-box</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="box"
                                value='RB-Box'
                                className='box-input'
                                defaultChecked={isRotationAllowed}
                            />
                            <label>RB-box</label>
                        </div>
                    </form>

                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="For full data anotation upgrade your plan"
                                arrow={true}
                                placement={'bottom'}
                            >
                                <div className='full_annotation_btn_container'>
                                    <div className='full_annotation_btn_border'>
                                        <button
                                            className='full_annotation_btn'
                                            onClick={handleTooltipOpen}
                                        >
                                            Start full data annottation
                                        </button>
                                    </div>
                                </div>
                            </Tooltip>
                        </div>
                    </ClickAwayListener>
                    <div className='photos-container'>
                        <InfiniteScroll
                            dataLength={imagesList.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            // Review the condition
                            {!imagesList.length ? imagesList?.map((el, key) => {
                                return (
                                    <div key={key} className='image_container'>
                                        <img
                                            alt='girl'
                                            src={el}
                                            className='label-photo'
                                        />
                                        <label>`image-${key + 1}`</label>
                                    </div>
                                )
                            }) : null}
                        </InfiniteScroll>
                    </div>
                </div>
                : <div className='icons-container'>
                    <img src="dashboard.png" alt="dashboard" />
                    <img src="image.png" alt='icon' />
                </div>}
        </div>
    )
}

export default LeftBar;