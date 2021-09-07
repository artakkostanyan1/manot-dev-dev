import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useState } from 'react';
import './LeftBar.scss';

function LeftBar(props) {
    const [isFullScreen, setIsFullscreen] = useState(true);
    const screen = isFullScreen ? 'full' : 'min';

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
                    <div
                        className='anotation-button'
                        onClick={() => console.log('Anotation')}
                    >
                        Start full data annottation
                    </div>
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
                    </div>
                </div>
                : <div className='icons-container'>
                    <DashboardIcon />
                    <CropOriginalIcon />
                </div>}
        </div>
    )
}

export default LeftBar;