import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';

import { useState } from 'react';
import './LeftBar.scss';

function LeftBar(props) {
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
                ? <div>
                    <div className='radio-buttons-container'>
                        <div>
                            <input
                                type="radio"
                                name="box"
                                className='box-input'
                            />
                            <label>B-box</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="box"
                                className='box-input'
                            />
                            <label>RB-box</label>
                        </div>
                    </div>

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
                        <div>
                            <img
                                alt='girl'
                                src="img.webp"
                                className='label-photo'
                            />
                            <label>Image1</label>
                        </div>
                        <div>
                            <img
                                alt='girl'
                                src="img.webp"
                                className='label-photo'
                            />
                            <label>Image2</label>
                        </div>
                        <div>
                            <img
                                alt='girl'
                                src="img.webp"
                                className='label-photo'
                            />
                            <label>Image3</label>
                        </div>
                        <div>
                            <img
                                alt='girl'
                                src="img.webp"
                                className='label-photo'
                            />
                            <label>Image3</label>
                        </div>
                        <div>
                            <img
                                alt='girl'
                                src="img.webp"
                                className='label-photo'
                            />
                            <label>Image3</label>
                        </div>
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