import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [cardName, setCardName] = useState();
    const [date, setDate] = useState();
    const [password, setPassword] = useState();
    const [code, setCode] = useState();

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
                            variant="outlined"
                            className="card-number"
                            value={cardName}
                            onChange={(e) => { setCardName(e.target.value) }}
                            {...register("cardName", { required: 'The card number is not valid' })}
                        />
                        {errors.cardName && <div className='error_message'>{errors.cardName.message}</div>}


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
                                    type='date'
                                    value={date}
                                    onChange={(e) => { setDate(e.target.value) }}
                                    {...register("date", { required: 'The expiration date is not valid' })}
                                />
                                {errors.date && <div className='error_message'>{errors.date.message}</div>}
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
                                    type='passwword'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    {...register("password", { required: 'Please enter password' })}
                                />
                                {errors.password && <div className='error_message'>{errors.password.message}</div>}
                            </div>
                            <div>
                                <label className='card-number-lable'>Postal Code</label>
                                <TextField
                                    variant="outlined"
                                    className="card-min-number"
                                    value={code}
                                    onChange={(e) => { setCode(e.target.value) }}
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