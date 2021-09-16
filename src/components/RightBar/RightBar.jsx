import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './RightBar.scss';

const useStyles = makeStyles((theme) => ({
    first_part: {
        height: '30px',
        display: 'flex',
        alignItems: 'center'
    },
    second_part: {
        height: '60px',
        display: 'flex',
        alignItems: 'center'
    },
    third_part: {
        height: '60px',
        display: 'flex',
        alignItems: 'center'
    },
    fourth_part: {
        height: '110px',
        display: 'flex',
        alignItems: 'center'
    }
}));


function RightBar() {
    const classes = useStyles();

    return (
        <div className='right_bar_conatainer'>

            <Paper elevation={4} className={classes.first_part}>
                <div className='text_part'>
                    Details about object
                </div>
            </Paper>

            <Paper elevation={4} className={classes.second_part}>
                <div className='paper_inner_div'>
                    <div className='text_part'>Horses</div>
                    <div className='counter_part'>1</div>
                </div>
            </Paper>

            <Paper elevation={4} className={classes.third_part}>
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
            </Paper>

            <div className='full_annotation_btn_container'>
                <div className='full_annotation_btn_border'>
                    <button className='full_annotation_btn'>
                        Detect on single image
                    </button>
                </div>
            </div>

        </div>
    )
}

export default RightBar