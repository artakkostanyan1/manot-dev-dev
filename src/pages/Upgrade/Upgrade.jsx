import Paper from '@material-ui/core/Paper';
import './Upgrade.scss';

function Upgrade() {
    return <Paper className='upgrade_item1_container'>
        <div className='upgrade_item1_header'>
            Free
        </div>
        <div className='upgrade_item1_text'>
            Lorem Ipsum is simply dummy text of the prining
            and typesetting industry
        </div>

        <div className='from'>
            from
        </div>

        <div className='price_container'>
            <span className='price'>
                0$
            </span>

            <span className='per_month'>
                /mo
            </span>
        </div>

        <div className='annual_build'>
            Billed Annualy
        </div>

        <div className='upgrade_item1_button_container'>
            <button className='upgrade_item1_button'>
                TRY NOW
            </button>
        </div>

    </Paper>
}

export default Upgrade;