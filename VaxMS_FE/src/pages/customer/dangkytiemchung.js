import Footer from '../../layout/customer/footer/footer'
import logomini from '../../assest/images/logomini.svg'
import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, postMethodPayload} from '../../services/request';
import Swal from 'sweetalert2'


function DangKyTiem(){
    const [vacxinType, setVacxinType] = useState([]);
    const [vacxin, setVacxin] = useState([]);
    const [vacxinSchedule, setVacxinSchedule] = useState([]);
    const [vacxinScheduleChoose, setVacxinScheduleChoose] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [customer, setCustomer] = useState(null);


    useEffect(()=>{
        const getType= async() =>{
            var response = await getMethod('/api/vaccine-type/public/find-all');
            var result = await response.json();
            setVacxinType(result)
        };
        getType();
        const getCustomer= async() =>{
            var response = await getMethod('/api/customer-profile/customer/find-by-user');
            var result = await response.json();
            setCustomer(result)
        };
        getCustomer();
    }, []);
  
    const handleChonLoai = async (option) => {
        var value = option.value;
        var response = await getMethod('/api/vaccine/all/find-by-type?typeId='+value);
        var result = await response.json();
        setVacxin(result)
        setVacxinChoose(null)
    };

    const handleChonVacxin = async (option) => {
        var value = option.value;
        var response = await getMethod('/api/vaccine-schedule/all/find-by-vacxin?idVacxin='+value);
        var result = await response.json();
        setVacxinSchedule(result)
        if(result.length == 0){
            document.getElementById("thongbaokhongtimthay").style.display = 'block'
            document.getElementById("btndangkytiem").style.display = 'none'
        }
        else{
            document.getElementById("thongbaokhongtimthay").style.display = 'none'
            document.getElementById("btndangkytiem").style.display = 'block'
        }
        setVacxinChoose(null)
    };


    const setVacxinChoose = (item, index) => {
        setActiveIndex(index); 
        setVacxinScheduleChoose(item);
    };

    
async function taoLichTiemChung(event) {
    event.preventDefault();
    if(vacxinScheduleChoose == null){
        toast.error("Bạn chưa chọn lịch tiêm")
        return false;
    }
    var lichtiem = {
        "fullName": event.target.elements.hotendki.value,
        "dob": event.target.elements.ngaysinhnt.value,
        "phone": event.target.elements.sdtnt.value,
        "address": event.target.elements.diachint.value,
        "vaccineSchedule": {"id":vacxinScheduleChoose.id},
    }
    console.log(lichtiem)

    window.localStorage.setItem('lichtiem', JSON.stringify(lichtiem));

    var payment = {
        "idSchedule":vacxinScheduleChoose.id,
        "content":"Thanh toán đăng ký lịch tiêm",
        "returnUrl":"http://localhost:3000/thong-bao",
        "notifyUrl":"http://localhost:3000/thong-bao",
    }

    var res = await postMethodPayload('/api/payment/customer/create-url-payment', payment)
    if (res.status < 300) {
        var result = await res.json();
        window.open(result.url, '_blank');
    } else {
        toast.error("Tạo link thanh toán thất bại");
    }
}

    return(
     <div className='container-fluid'>
        <div className='container-web'>
            <div className='row'>
                <div className='col-sm-9'>
                    <p className='link-head-section'>
                        <a href="https://vnvc.vn/">Trang chủ</a>
                        <span class="separator"> » </span>
                        <span class="last">Đăng ký thông tin tiêm chủng</span>
                    </p>
                    <div className='section-content-web'>
                        <div className='flex-section'>
                            <div className='divsc-dkytiem'><img src={logomini} className='img-section-dky-tiem'/></div>
                            <h2 className='title-dki-tiem-chung'>ĐĂNG KÝ TIÊM CHỦNG</h2>
                        </div>
                    </div>
                    <p className='ghi-chu-tiem-chung'>Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi đến làm thủ tục tại quầy Lễ tân cho Quý Khách hàng, việc đăng ký thông tin tiêm chủng chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.</p>
                    <p className='title-form-dki-tiem'>THÔNG TIN NGƯỜI TIÊM</p>
                    <form className='form-dky-tiem' onSubmit={taoLichTiemChung} method='post'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className='lb-form-dky-tiem'><span>*</span> Họ tên người tiêm</label>
                                <input name='hotendki' defaultValue={customer==null?'':customer.fullName} className='form-control' />
                            </div>
                            <div className='col-sm-6'>
                                <label className='lb-form-dky-tiem'><span>*</span> Ngày sinh người tiêm</label>
                                <input name='ngaysinhnt' defaultValue={customer==null?'':customer.birthdate} className='form-control' type='date' />
                            </div>
                            <div className='col-sm-6'>
                                <label className='lb-form-dky-tiem'><span>*</span> Địa chỉ</label>
                                <input name='diachint' defaultValue={customer==null?'':customer.street+', '+customer.ward+', '+customer.district+', '+customer.city} className='form-control' />
                            </div>
                            <div className='col-sm-6'>
                                <label className='lb-form-dky-tiem'><span>*</span> Số điện thoại</label>
                                <input name='sdtnt' defaultValue={customer==null?'':customer.contactPhone} className='form-control' />
                            </div>
                            <div className='col-sm-12'><p className='title-form-dki-tiem dichvu-dky-tiem'>THÔNG TIN DỊCH VỤ</p></div>
                            <div className='col-sm-6'>
                                <label className='lb-form-dky-tiem'><span>*</span> Loại vắc xin muốn đăng ký</label>
                                <Select
                                    options={vacxinType.map((item) => ({
                                        label: item.typeName,
                                        value: item.id,
                                    }))}
                                    onChange={handleChonLoai}
                                    placeholder="Chọn loại vacxin"
                                    name='centerselect'
                                    isSearchable={true} 
                                />
                            </div>
                            <div className='col-sm-6'>
                                <label className='lb-form-dky-tiem'><span>*</span> Tên vacxin</label>
                                <Select
                                    options={vacxin.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                    onChange={handleChonVacxin}
                                    placeholder="Tên vacxin"
                                    name='centerselect'
                                    isSearchable={true} 
                                />
                            </div>
                            <div className='col-sm-12'>
                                <div className='chonthoigiantiem'>
                                    <div className='row'>
                                        {vacxinSchedule.map((item, index)=>{
                                            return <div className='col-sm-3'>
                                            <div key={item.id}
                                                className={`singletgtiem ${activeIndex === index ? 'activetiem' : ''}`}
                                                onClick={() => setVacxinChoose(item, index)}>
                                                Từ: {item.startDate} <br/>
                                                Đến: {item.endtDate} <br/>
                                                Địa điểm:{item.center.centerName}
                                            </div>
                                        </div>
                                        })}
                                        <div className='hiddendiv' id='thongbaokhongtimthay'>
                                            <p>Xin lỗi! Không tìm thấy lịch tiêm nào với vacxin này</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <button id='btndangkytiem' className='btn btn-primary form-control'>Đăng Ký Tiêm Chủng</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     </div>
    );
}

export default DangKyTiem;
