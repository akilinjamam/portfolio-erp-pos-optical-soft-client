/* eslint-disable react/prop-types */
// import { useRef } from 'react';
import '../../../global_style/global_style.css'
import imgmodal from './ImgModal.module.scss';
// import { useReactToPrint } from 'react-to-print';

const DeveloperInfo = ({type, open, dispatch, closeModal}) => {
  
    return (
        <div className={`${imgmodal.main} flex_center  ${(open && type === 'developer-info') ? imgmodal.open : imgmodal.close}`} >
                <section className={`${imgmodal.container} ${imgmodal.sizeStock}`}>
                    <div className={`${imgmodal.cancelBtn} flex_between`}>
                        <div>

                        </div>
                        <i 
                        onClick={() => dispatch(closeModal())} 
                        className="uil uil-times"></i>
                    </div>
                    <div>
                        <table style={{borderCollapse:'collapse', fontSize:'11.5px', margin:'auto', paddingBottom:'10px', width:'100%'}}>
                            <caption style={{textAlign:'center', fontSize:'17px', fontWeight:'bold', margin:'5px 0'}}>DEVELOPER INFORMATION</caption>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Injamam Islam Chowdhury</td>
                                    <td>Web & software Developer (full-stack)</td>
                                    <td>Byte Dynamo</td>
                                    <td>akilinjamam@gmail.com </td>
                                    <td>01516708479 </td>
                                </tr>
            
                            </tbody>
                        </table>
                    </div>
                           
                </section>
        </div>
    );
};

export default DeveloperInfo;