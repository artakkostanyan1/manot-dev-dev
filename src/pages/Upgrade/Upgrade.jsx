import UserHeader from '../../components/UserHeader/UserHeader';
import UpgradeCard from '../../components/UpgrageCard/UpgradeCard';

import upgradeData from '../../utils/upgrade';
import './Upgrade.scss';

function Upgrade(props) {
    return (
        <div className='updrade_card_container'>
            <UserHeader />
            <div className='most_popular_container'>
                <div className='most_popular_div'>
                    Most popular
                </div>
            </div>
            <div className='upgrade_container'>
                <UpgradeCard
                    header='Free'
                    subHeader={upgradeData.Free.subHeader}
                    price={upgradeData.Free.price}
                    body={upgradeData.Free.body}
                />
                <UpgradeCard
                    header='Business'
                    subHeader={upgradeData.Business.subHeader}
                    price={upgradeData.Business.price}
                    body={upgradeData.Business.body}
                    hasShadow={true}
                />
                <UpgradeCard
                    header='Enterprise'
                    subHeader={upgradeData.Enterprise.subHeader}
                    price={upgradeData.Enterprise.price}
                    body={upgradeData.Enterprise.body}
                />
            </div>
        </div>
    )
}

export default Upgrade;