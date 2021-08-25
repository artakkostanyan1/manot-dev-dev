import Header from '../../components/Header/Header';
import { Divider } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import Visa from '../../styles/images/visa.png';
import MasterCard from '../../styles/images/mastercard.png';
import Amex from '../../styles/images/amex.png';
import JCB from '../../styles/images/jcb.png';
import Discover from '../../styles/images/discover.png';
import { Card, CardContent, Typography, CardActions, Input, TextField } from '@material-ui/core';
import './Payment.scss';

function Payment() {
    return (
        <>
            <Header />
            <div className='payment-container'>
                <div className='heading'>Pay with card</div>
                <Card className='payment-card-container'>
                    <div className='payment-cards' variant="h6" component="h2">
                        <div className='payment-heading-text'>
                            <PaymentIcon className='payment-icon' />
                            Pay with card
                        </div>
                        <div className='payment-image-container'>
                            <img src={Visa} alt="Visa" />
                            <img src={MasterCard} alt="MasterCard" />
                            <img src={Amex} alt="Amex" />
                            <img src={JCB} alt="JCB" />
                            <img src={Discover} alt="Discover" />
                        </div>
                    </div>
                    <Divider />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                        className='payment-input-container'
                    >

                        <label className='card-number-lable'>Card Number</label>
                        <TextField
                            id="outlined-secondary"
                            // label="Outlined secondary"
                            variant="outlined"
                            className="card-number"
                        // color="secondary"
                        // {...register("password", { required: 'Please enter password' })}
                        />
                        {/* {errors.password && <div className='error_message'>{errors.password.message}</div>} */}


                        <div className='payment-input-group'>
                            <div>
                                <label className='card-number-lable'>
                                    Expiration date
                                    <Typography color="secondary">
                                        (MM/YY)
                                    </Typography>
                                </label>
                                <TextField
                                    className="card-min-number"
                                    variant="outlined"
                                // {...register("password", { required: 'Please enter password' })}
                                />
                                {/* {errors.password && <div className='error_message'>{errors.password.message}</div>} */}
                            </div>
                            <div>
                                <label className='card-number-lable'>
                                    CVV
                                    <Typography color="secondary">
                                        (4 digits)
                                    </Typography>
                                </label>
                                <TextField
                                    className="card-min-number"
                                    variant="outlined"

                                // {...register("password", { required: 'Please enter password' })}
                                />
                                {/* {errors.password && <div className='error_message'>{errors.password.message}</div>} */}
                            </div>
                            <div>
                                <label className='card-number-lable'>Postal Code</label>
                                <TextField
                                    variant="outlined"
                                    className="card-min-number"
                                />
                            </div>
                        </div>
                        
                    </Typography>
                </Card>
                <button className='pay-button'>Pay</button>
            </div>
        </>
    )
}

export default Payment;