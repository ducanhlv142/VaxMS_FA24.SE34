import Footer from '../../layout/customer/footer/footer'
import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import avatar from '../../assest/images/avatar.png'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, postMethod, postMethodPayload} from '../../services/request';
import Swal from 'sweetalert2'
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function toggleChat() {
    var chatBox = document.getElementById("chat-box");
    var btnopenchat = document.getElementById("btnopenchat");
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "block";
        chatBox.style.bottom = "20px";
        btnopenchat.style.display = 'none'
    }
    else {
        chatBox.style.display = "none";
        btnopenchat.style.display = ''
    }
}

function ChatFrame(){
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [itemChat, setItemChat] = useState([]);
    const [client, setClient] = useState(null);
    useEffect(() => {
        var user = localStorage.getItem("user")
        var email = null;
        if(user != null){
          user = JSON.parse(user);
          email = user.email
          if(user.authorities.name == "Customer"){
            const getItemChat= async() =>{
              var response = await getMethod('/api/chat/customer/my-chat');
              var result = await response.json();
              setItemChat(result)
            };
            getItemChat();
          }

        }
        const sock = new SockJS('http://localhost:8080/hello');
        const stompClient = new Client({
          webSocketFactory: () => sock,
          onConnect: () => {
            console.log("WebSocket connected successfully!");
            stompClient.subscribe('/users/queue/messages', (msg) => {
              appendTinNhanDen(msg.body)
            });
          },
          connectHeaders: {
            username: email  // Truyền email vào header khi kết nối
          }
        });
        stompClient.activate();
        setClient(stompClient);
    
        return () => {
          stompClient.deactivate();
        };
    }, []);
    
    const sendMessage = () => {
        client.publish({
          destination: '/app/hello/-10',
          body: document.getElementById("contentmess").value,
        });
        append();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        client.publish({
          destination: '/app/hello/-10',
          body: document.getElementById("contentmess").value,
        });
        append();
      }
  };



    function append() {
        const newChatElement = document.createElement('p'); 
        newChatElement.className = "mychat";
        newChatElement.textContent = document.getElementById("contentmess").value; 

        document.getElementById('listchat').appendChild(newChatElement);
        var scroll_to_bottom = document.getElementById('scroll-to-bottom');
        scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
        document.getElementById("contentmess").value = ''
    }

    function appendTinNhanDen(mess) {
        const newChatElement = document.createElement('p'); 
        newChatElement.className = "adminchat";
        newChatElement.textContent = mess; 

        document.getElementById('listchat').appendChild(newChatElement);
        var scroll_to_bottom = document.getElementById('scroll-to-bottom');
        scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
        document.getElementById("contentmess").value = ''
    }

    var token = localStorage.getItem("token");
    if(token == null){
        return <></>
    }
    return(
    <div class="chat-container">
        <button class="chat-button" id="btnopenchat" type='button' onClick={()=>toggleChat()}><i class="fa fa-comment"></i> Chat với chúng tôi</button>

        <div id="chat-box" class="chat-box">
            <div class="chat-header">
                <h3>Xin chào bạn!</h3>
                <button class="close-btn" onClick={()=>toggleChat()}>X</button>
            </div>
            <div class="chat-body" id="scroll-to-bottom">
                <div id="listchat">
                {itemChat.map((item, index)=>{
                    if(item.sender.authorities.name == "Customer"){
                      return <p class="mychat">{item.content}</p>
                    }
                    else{
                      return <p class="adminchat">{item.content}</p>
                    }
                })}
                </div>
            </div>
            <div class="chat-footer">
                <input  onKeyDown={handleKeyDown} type="text" id="contentmess" placeholder="Nhập tin nhắn..." />
                <button id="sendmess" onClick={()=>sendMessage()}>Gửi</button>
            </div>
        </div>
    </div>
    );
}

export default ChatFrame;
