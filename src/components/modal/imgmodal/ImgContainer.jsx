/* eslint-disable react/prop-types */
import imgmodal from './ImgModal.module.scss';

const ImgContainer = ({open, type, dispatch, closeModal, img}) => {
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'img' ) ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container}  ${imgmodal.sizeImg}`}>
                    <div className={`${imgmodal.cancelBtn} flex_right`}>
                        <i onClick={() => dispatch(closeModal())} className="uil uil-times"></i>
                    </div>
                    <br />
                    <img width={530} height={330} src={img} alt="" />
                </section>
            </div>
    );
};

export default ImgContainer;