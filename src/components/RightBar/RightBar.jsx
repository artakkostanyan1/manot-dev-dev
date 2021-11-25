import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './RightBar.scss';

const useStyles = makeStyles((theme) => ({
    first_part: {
        height: '7%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3px'
    },
    second_part: {
        height: '7%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '7px'
    },
    third_part: {
        height: '7%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '7px'
    },
    fourth_part: {
        height: '13.5%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '7px'
    }
}));


function RightBar({ notes, detectOnSingleImage }) {
    const classes = useStyles();

    return (
        <div className='right_bar_conatainer'>

            <Paper elevation={4} className={classes.first_part}>
                <div className='text_part'>
                    Details about object
                </div>
            </Paper>

            {console.log(`notes, rightbar`, notes)}
            {Object.keys(notes).map((note, id) => notes[note] && (
                <Paper key={id} elevation={4} className={classes.second_part}>
                    <div className='paper_inner_div'>
                        <div className='text_part'>{note}</div>
                        <div className='counter_part'>{notes[note]}</div>
                    </div>
                </Paper>
            ))}

            {/* <Paper elevation={4} className={classes.third_part}>
                <div className='paper_inner_div'>
                    <div className='text_part'>Lorem ipsum</div>
                    <div className='counter_part'>1</div>
                </div>
            </Paper>

            <Paper elevation={4} className={classes.fourth_part}>
                <div className='fourth_text_part'>
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essent
                </div>
            </Paper> */}

            <div className='btn_container'>

                <div className='single_annotation_btn_container'>
                    <div className='single_annotation_btn_border'>
                        <button className='single_annotation_btn' onClick={detectOnSingleImage}>
                            Detect on single image
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RightBar