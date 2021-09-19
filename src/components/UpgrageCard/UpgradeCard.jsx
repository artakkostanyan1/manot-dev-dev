import './UpgradeCard.scss';

function UpgradeCard(props) {
    const shadow = props.hasShadow && 'shadow';
    
    return <div className={`upgrade_item1_container ${shadow}`}>
        <div className='upgrade_item1_header'>
            {props.header}
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
                {props.price + '$'}
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

    </div>
}

export default UpgradeCard;