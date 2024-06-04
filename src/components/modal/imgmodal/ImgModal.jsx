
import { useDispatch, useSelector } from 'react-redux';
import imgmodal from './ImgModal.module.scss';
import '../../../global_style/global_style.css';
import { closeModal } from './imgModalSlice';

const ImgModal = () => {

        const open = useSelector((state) => state.imgModal.open );
        const img = useSelector((state) => state.imgModal.img );
        const dispatch = useDispatch();
   
    return (
        <div className={`${imgmodal.main} flex_center  ${open ? imgmodal.open : imgmodal.close}`}>
           <section className={`${imgmodal.container}`}>
               <div className={`${imgmodal.cancelBtn} flex_right`}>
                    <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
               </div>
               <br />
               <img width={530} height={330} src={img} alt="" />
           </section>
        </div>
    );
};

export default ImgModal;