import UpgradeCard from '../../components/UpgrageCard/UpgradeCard';
import './Upgrade.scss';

function Upgrade(props) {
    return (
        <div className='upgrade_container'>
            <UpgradeCard header='Free' price='0' />
                <UpgradeCard header='Standart' price='108' hasShadow={true} />
            <UpgradeCard header='Enterprise' price='200' />
        </div>
    )
}

export default Upgrade;