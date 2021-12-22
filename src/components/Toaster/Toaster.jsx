import { toast } from "react-toastify";
import { ReactComponent as ToasterIcon } from '../../styles/images/toaster_icon.svg';
import './Toaster.scss';

export const Toaster = {
    notify: message => toast(
        <ToastComponent message={message}/>,
        { className: 'toast-info-container' }
    ),
    update: (id, message) => {
        toast.update(id, {
            render: <ToastComponent message={message}/>
        });
    },
    dismiss: id => toast.dismiss(id)
};

const ToastComponent = ({ message }) => {
    return <div className='toast-info'>
        <ToasterIcon className="toast-icon"/>
        <span className='toast-text'>{message}</span>
    </div>
}
