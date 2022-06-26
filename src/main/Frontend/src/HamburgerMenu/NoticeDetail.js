import React from 'react';

import '../styles/NoticeDetail.css';

function NoticeDetail() {
    return (
        <div class="middle">
            <ul class="menus">
                <li class="item" id="profile">
                <a href="#profile"><i class="fas fa-user"></i>Profile</a>
                <div class="sub-menus">
                    <a href="#">Posts</a>
                    <a href="#">Picture</a>
                </div>
                </li>
                <li class="item" id="messages">
                <a href="#messages"><i class="fas fa-envelope"></i>Messages</a>
                <div class="sub-menus">
                    <a href="#">New</a>
                    <a href="#">Sent</a>
                    <a href="#">Spam</a>
                </div>
                </li>
                <li class="item" id="settings">
                <a href="#settings"><i class="fas fa-cog"></i>Settings</a>
                <div class="sub-menus">
                    <a href="#">language</a>
                    <a href="#">Password</a>
                </div>
                </li>
                <li class="item">
                <a href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
                </li>
            </ul>
            </div>
    );
}

export default NoticeDetail;