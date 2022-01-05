import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout as apiLogout } from './api/data.js'
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';


const main = document.getElementById('content');

document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)').addEventListener('click', logout);
setUserNav();

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);
page('/register', decorateContext, registerPage);

page.start();


function decorateContext(ctx, next) {

    ctx.render = (content) => render(content, main);

    ctx.setUserNav = setUserNav;

    next();

}
function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email != null) {
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)').style.display = '';
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)').style.display = '';
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)').style.display = '';
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)').style.display = 'none';
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1)').style.display = 'none';

    } else {
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)').style.display = 'none';
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)').style.display = 'none';
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)').style.display = 'none';
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)').style.display = '';
        document.querySelector('#container > header:nth-child(1) > nav:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1)').style.display = '';
    }
}
async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
}