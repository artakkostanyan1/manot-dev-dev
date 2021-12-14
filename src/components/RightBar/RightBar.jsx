import './RightBar.scss';

function RightBar({notes, detectOnSingleImage}) {
    return (
        <div className='right_bar_container'>
            <div className='text_part'>
                <b> Details about object </b>
            </div>

            {(!Object.keys(notes).length) ? <div className='not_available'> Not available yet </div> :
                Object.keys(notes).map((note, id) => notes[note] && (
                    <div>
                        <div className='paper_inner_div'>
                            <div className='note_part'>{note}</div>
                            <div className='counter_part'>{notes[note]}</div>
                        </div>
                        {(id !== Object.keys(notes).length - 1) && <hr/>}
                    </div>
                ))}

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
