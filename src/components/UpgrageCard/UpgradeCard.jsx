import DoneIcon from '@material-ui/icons/Done';

import './UpgradeCard.scss';

function UpgradeRow(props) {
    return (
        <div className='upgrade_row'>
            <DoneIcon style={{ color: "green" }}/>
            {props.text}
        </div>
    )
}

function UpgradeCard(props) {
    const shadow = props.hasShadow && 'shadow';

    return <div className={`upgrade_item1_container ${shadow}`}>
        <div className='upgrade_item1_header'>
            {props.header}
        </div>
        <div className='upgrade_item1_text'>
            {props.subHeader}
        </div>

        <div className='from'>
            from
        </div>

        <div className='price_container'>
            <span className='price'>
                {props.price + '$'}
            </span>

            <span className='per_month'>
                /mo
            </span>
        </div>

        <div className='annual_build'>
            {props.body.map((el) => (
                <UpgradeRow text={el}/>
            ))}
        </div>

        <div className='upgrade_item1_button_container'>
            <button className='upgrade_item1_button'>
                TRY NOW
            </button>
        </div>

    </div>
}

export default UpgradeCard;