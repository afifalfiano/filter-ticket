import { useEffect } from "react";
import { useState } from "react";
import catchError from "../../services/catchError";
import { useGetProfileMutation } from "../../store/features/auth/authApiSlice";


const InfoUser = ({mobile}) => {
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
      <>
      {mobile && (
                  <div className={`flex pl-4  pt-2 text-gray-400 flex-row align-center gap-3 items-center`}>
                  <p className='font-semibold'>{profile?.name}</p>
                  <p className="text-xs">({profile?.role?.role})</p>
                </div>
      )}

      {!mobile && (
                  <div className={`flex pl-2 pr-2 flex-col text-gray-400`}>
                  <p className='font-semibold'>{profile?.name}</p>
                  <p className="text-xs">({profile?.role?.role})</p>
                </div>
      )}
      </>
    )
}

export default InfoUser;