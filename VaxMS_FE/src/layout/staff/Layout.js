import {handleChangePass} from '../../services/auth'
import lich from '../../assest/images/lich.png'
import avatar from '../../assest/images/user.svg'
import { useState, useEffect } from 'react'

function Header({ children }){
    const [isCssLoaded, setCssLoaded] = useState(false);
    useEffect(()=>{
        import('../staff/layout.scss').then(() => setCssLoaded(true));
        getDateTime();
    }, []);
    function getDateTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds(); //
            var a = 0;
            //
            if (month.toString().length == 1) {
                month = '0' + month;
            }
            if (day.toString().length == 1) {
                day = '0' + day;
            }
            if (hour.toString().length == 1) {
                hour = '0' + hour;
            }
            if (minute.toString().length == 1) {
                minute = '0' + minute;
            }
            if (second.toString().length == 1) {
                second = '0' + second;
            }
            var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' +
                minute + ':' + second;
            return dateTime;
        }
        setInterval(function() {
            var currentTime = getDateTime();
            document.getElementById("digital-clock").innerHTML = currentTime;
        }, 1000);
        
        var date = new Date();
        
        var current_day = date.getDay();
        
        var day_name = '';
        
        switch (current_day) {
            case 0:
                day_name = "Chủ nhật";
                break;
            case 1:
                day_name = "Thứ hai";
                break;
            case 2:
                day_name = "Thứ ba";
                break;
            case 3:
                day_name = "Thứ tư";
                break;
            case 4:
                day_name = "Thứ năm";
                break;
            case 5:
                day_name = "Thứ sáu";
                break;
            case 6:
                day_name = "Thứ bảy";
        }
    if (!isCssLoaded) {
        return <></>
    }
    return(
        <>
         <div class="navleft" id="navleft">
            <div class="divroot">
                <h3>Staff</h3>
            </div>
            <div class="listmenumain">
                <a href="index">Trang chủ</a>
                <a href="chat">Tin nhắn</a>
                <a href="#" onClick={()=>logout()}>Đăng xuất</a>
            </div>
         </div>
    <div class="contentadminweb">
        <div class="headerwebadmin" id="headerwebadmin">
            <div class="lichheader">
                <img class="iconlich" src={lich} />
                <p class="text-gray fst-italic mb-0">
                    <p id="digital-clock"></p>
                </p>
            </div>
            <div class="userheader-admin">
                <a class="nav-link dropdown-toggle menucha" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="tendangnhap">hieu</span>
                    <img src={avatar} className="userlogo-admin"/>
                </a>
                <ul class="dropdown-menu listitemtk" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" onClick={()=>logout()} href="#"><i class="fa fa-sign-out"></i> Đăng xuất</a></li>
                </ul>
            </div>
        </div>
        <div class="contentmain">
            {children}
        </div>
    </div>
        </>
    );
}

async function checkAdmin(){
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/admin/check-role-admin';
    const response = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status > 300) {
        window.location.replace('../login')
    }
}


function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('../login')
}

export default Header;