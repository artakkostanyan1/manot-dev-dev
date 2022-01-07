import GetAppIcon from '@material-ui/icons/GetApp';
import './RightBar.scss';

require('dotenv').config();

function RightBar({ notes, detectOnSingleImage, folderName }) {
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleDownload = () => {
        fetch(`${apiUrl}download/bb?folder_name=${folderName}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "x-access-token": localStorage.getItem('token')
            },
        })
            .then(response => {
                return response.json();
            })
            .then(res => {
                console.log('res', res)
            })
            .catch((err) => {
                console.log('error', err);
            })
    }
    return (
        <div className='right_bar_container'>
            <div className='text_part'>
                <b> Details about object </b>
                <a
                    // href={`${apiUrl}download/bb?folder_name=${folderName}`}
                    onClick={handleDownload} target="_blank" download
                // onclick={`location.href=this.href+'?folder_name=${folderName};return false;`}
                >
                    <GetAppIcon />
                </a>
            </div>
            <div className='notes_list'>
                {(!Object.keys(notes).length) ? <div className='not_available'> Not available yet </div> :
                    Object.keys(notes).map((note, id) => notes[note] && (
                        <div key={id}>
                            <div className='paper_inner_div'>
                                <div className='note_part'>{note}</div>
                                <div className='counter_part'>{notes[note]}</div>
                            </div>
                            {(id !== Object.keys(notes).length - 1) && <hr />}
                        </div>
                    ))}
            </div>

            <div className='btn_container'>
                <div className='single_annotation_btn_container'>
                    <div className='single_annotation_btn_border'>
                        <button className='single_annotation_btn' onClick={detectOnSingleImage}>
                            Detect object on current image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar
