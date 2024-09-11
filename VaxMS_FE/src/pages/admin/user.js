import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import DataTable from 'datatables.net-dt';
import Swal from 'sweetalert2'


var token = localStorage.getItem("token");

async function loadUser(role){
    var url = 'http://localhost:8080/api/admin/get-user-by-role';
    if (role != "") {
        url += '?role=' + role
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    return response;
}

async function handleAddAccount(event) {
    event.preventDefault();
    if(event.target.elements.password.value != event.target.elements.repassword.value){
        toast.error("Mật khẩu không trùng khớp");
        return;
    }
    const payload = {
        fullname: event.target.elements.fullname.value,
        email: event.target.elements.email.value,
        phone: event.target.elements.phone.value,
        password: event.target.elements.password.value
    };
    const res = await fetch('http://localhost:8080/api/admin/addaccount', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
    });
    var result = await res.json()
    console.log(result);
    if (res.status == 417) {
        toast.error(result.defaultMessage);
    }
    if(res.status < 300){
        Swal.fire({
            title: "Thông báo",
            text: "Tạo tài khoản thành công!",
            preConfirm: () => {
                window.location.reload();
            }
        });
    }
};

const AdminUser = ()=>{
    const [items, setItems] = useState([]);
    useEffect(()=>{
        const getUser = async(role) =>{
            var response = await loadUser(role);
            var listUser = await response.json();
            setItems(listUser)
        };
        getUser("");
    }, []);

    $( document ).ready(function() {
        if(items.length > 0){
            $('#example').DataTable();
        }
    });

    async function filterUser(){
        $('#example').DataTable().destroy();
        var role = document.getElementById("role").value
        var response = await loadUser(role);
        var listUser = await response.json();
        setItems(listUser)
    }

    async function lockOrUnlock(id, type) {
        var con = window.confirm("Xác nhận hành động?");
        if (con == false) {
            return;
        }
        var url = 'http://localhost:8080/api/admin/lockOrUnlockUser?id=' + id;
        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        if (response.status < 300) {
            var mess = '';
            if (type == 1) {
                mess = 'Khóa thành công'
            } else {
                mess = 'Mở khóa thành công'
            }
            toast.success(mess);
            filterUser();
        } else {
            toast.error("Thất bại");
        }
    }
    
    return (
        <>
            <div class="row">
                <div class="col-md-3 col-sm-6 col-6">
                    <label  class="lb-form" dangerouslySetInnerHTML={{__html:'&ThinSpace;'}}></label>
                    <a data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary"><i class="fa fa-plus"></i> Thêm admin</a>
                </div>
                <div class="col-md-3 col-sm-6 col-6">
                    <label class="lb-form">Chọn quyền</label>
                    <select onChange={()=>filterUser()} id='role' class="form-control">
                        <option value="">Tất cả quyền</option>
                        <option value="ROLE_USER">Tài khoản người dùng</option>
                        <option value="ROLE_ADMIN">Tài khoản admin</option>
                    </select>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách tài khoản</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>Ngày tạo</th>
                                <th>Quyền</th>
                                <th>Khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                var btn = '';
                                if (item.actived == 0) {
                                    var btn = <button onClick={()=>lockOrUnlock(item.id,0)} class="btn btn-danger"><i class="fa fa-unlock"></i> mở khóa</button>
                                } else {
                                    var btn = <button onClick={()=>lockOrUnlock(item.id,1)} class="btn btn-primary"><i class="fa fa-lock"></i> Khóa</button>
                                }
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.authorities.name}</td>
                                    <td class="sticky-col">
                                        {btn}
                                    </td>
                                </tr>
                            }))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="modal fade" id="addtk" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Thêm tài khoản quản trị</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <form onSubmit={handleAddAccount} class="col-sm-6" style={{margin:'auto'}}>
                                <label class="lb-form">Họ tên</label>
                                <input name='fullname' id="fullname" class="form-control"/>
                                <label class="lb-form">Số điện thoại</label>
                                <input name='phone' id="phone" class="form-control"/>
                                <label class="lb-form">Email</label>
                                <input name='email' required id="email" class="form-control"/>
                                <label class="lb-form">Mật khẩu</label>
                                <input name='password' required id="pass" type="password" class="form-control"/>
                                <label class="lb-form">Nhắc lại mật khẩu</label>
                                <input name='repassword' required id="repass" type="password" class="form-control"/>
                                <br/>
                                <button class="form-control btn btn-primary">Thêm tài khoản</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminUser;