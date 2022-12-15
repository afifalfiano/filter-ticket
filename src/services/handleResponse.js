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
    const message = body?.data?.message || 'Berhasil';
    toast.success(message, propertyToast);
}

export default handleResponse;