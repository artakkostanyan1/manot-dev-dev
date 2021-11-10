import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';

import { useState } from 'react';
import './LeftBar.scss';

function LeftBar({ isRotationAllowed, setIsRotationAllowed, imagesList }) {
    const [isFullScreen, setIsFullscreen] = useState(true);
    const [open, setOpen] = useState(false);
    const screen = isFullScreen ? 'full' : 'min';

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
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
                        {imagesList.map((el) => {
                            return (
                                <div className='image_container'>
                                    <img
                                        alt='girl'
                                        src={el.image}
                                        className='label-photo'
                                    />
                                    <label>{el.label}</label>
                                </div>
                            )
                        })}
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