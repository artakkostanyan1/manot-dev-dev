import UserHeader from '../../components/UserHeader/UserHeader';
import UpgradeCard from '../../components/UpgrageCard/UpgradeCard';
import './Upgrade.scss';

function Upgrade(props) {
    return (
        <>
            <UserHeader />
            <div className='most_popular_container'>
                <div className='most_popular_div'>
                    Most popular
                </div>
            </div>
            <div className='upgrade_container'>
                <UpgradeCard header='Free' price='0' />
                <UpgradeCard header='Standart' price='108' hasShadow={true} />
                <UpgradeCard header='Enterprise' price='200' />
            </div>
        </>
    )
}

export default Upgrade;