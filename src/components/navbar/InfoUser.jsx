import { useEffect } from "react";
import { useState } from "react";
import catchError from "../../services/catchError";
import { useGetProfileMutation } from "../../store/features/auth/authApiSlice";


const InfoUser = () => {
    const [profile, setProfile] = useState(null);
    const [getProfile] = useGetProfileMutation();
    
    const doGetProfile = async () => {
      try {
        const data = await getProfile().unwrap();
        if (data.status === 'success' || data.status === 'Success') {
          setProfile(data.data);
        } else {
          catchError(data, true);
        }
      } catch (error) {
        catchError(error, true);
      }
    };

    useEffect(() => {
        doGetProfile();
    }, [])
    return (
        <div className='flex flex-col pl-2 pr-2'>
            <p className='font-semibold'>{profile?.name}</p>
            <p className="text-xs">{profile?.role?.role}</p>
        </div>
    )
}

export default InfoUser;