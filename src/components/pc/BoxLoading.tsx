import { BsThreeDots } from 'react-icons/bs';
import { boxLoading, boxLoadingDots } from '../../styles/common/loading.css';

export const BoxLoading = () => {
  return (
    <div className={boxLoading}>
      <BsThreeDots className={boxLoadingDots}/>
    </div>
  );
};
