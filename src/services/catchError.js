import toast from 'react-hot-toast';

const propertyToast = {
  style: {
    padding: '16px',
    backgroundColor: '#ff492d',
    color: 'white',
  },
  duration: 2000,
  position: 'top-right',
  id: 'error',
  icon: false,
};


const catchError = (body) => {
    console.log(body, 'error');
    let message = 'Kesalahan Pada Sistem';
    switch (body.status) {
      case 401:
        message = body?.data?.message;  
        break;
      case 409:
        message = 'Request Conflict. Coba Lagi';  
        break;
      case 422:
        message = 'Periksa Kembali Isian Form';  
        break;
      case 404:
        message = body?.data?.message;
        break;
      default:
        message = 'Kesalahan Pada Sistem';
        break;
    }
    toast.error(message, propertyToast);
}

export default catchError;