import logo from '../../../assest/images/vnvc-logo.png';
import { useState, useEffect } from 'react'
import {getMethod,getMethodByToken} from '../../../services/request'
import React, { createContext, useContext } from 'react';

export const HeaderContext = createContext();


var token = localStorage.getItem("token");
function Header (){
import('../styles/styleuser.scss');
var auth = <a href="/login" class="itemheader itemtopheader hotlineheader">Đăng nhập</a>
if(token != null){
  auth = <>
  <a href="/tai-khoan" class="itemheader itemtopheader">Tài khoản</a>
  <a onClick={()=>logout()} class="itemheader itemtopheader hotlineheader pointer">Đăng xuất</a>
  </>
}

function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.replace('login')
}
return(
  <>
    <div id="headerweb">
      <div class="container-web">
          <nav class="navbar navbar-expand-lg">
              <div class="container-fluid">
                <a class="navbar-brand" href="/"><img src={logo} class="imagelogoheader"/></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  </ul>
                  <div class="d-flex">
                      <a href="" class="itemheader itemtopheader"><i class="fa fa-map-marker"></i> Tìm trung tâm VNVC</a>
                      <a href="/dang-ky-tiem-chung" class="itemheader itemtopheader"><i class="fa fa-calendar"></i> Đăng ký tiêm</a>
                      <a href="tel:02871026595" class="itemheader itemtopheader hotlineheader">Hotline: 028 7102 6595</a>
                      {auth}
                  </div>
                </div>
              </div>
          </nav>
      </div>
      <hr className='hrheader-web'/>
      <div class="container-web container-bottom-header">
          <a href="" class="itemheader">Trang chủ</a>
          <a href="" class="itemheader">Giới thiệu</a>
          <a href="" class="itemheader">Vắc xin trẻ em</a>
          <a href="" class="itemheader">Vắc xin người lớn</a>
          <a href="" class="itemheader">Gói vắc xin</a>
          <a href="tra-cuu-lich-tiem" class="itemheader">Tra cứu lịch tiêm</a>
          <a href="" class="itemheader">Bảng giá</a>
          <a href="" class="itemheader">Bệnh học</a>
          <a href="" class="itemheader">Tin tức</a>
      </div>
    </div>
    
  </>

);

    
}

export default Header;