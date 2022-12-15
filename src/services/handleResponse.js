import toast from 'react-hot-toast';

const propertyToast = {
    style: {
        padding: '16px',
        backgroundColor: '#36d399',
        color: 'white',
      },
      duration: 2000,
      position: 'top-right',
      id: 'success',
      icon: false,
};


const handleResponse = (body) => {
    console.log(body, 'handle');
    let message = 'Berhasil';
    if (body.hasOwnProperty('data')) {
        message = body?.data?.message;
    } else {
        message = body.message;
    }
    toast.success(message, propertyToast);
}

export default handleResponse;