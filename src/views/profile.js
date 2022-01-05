import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyEvents } from "../api/data.js";

const profileTemplate = (events, email) => html`
<section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${email}</h2>
            </div>
            <div class="board">
           
            ${events.length === 0 ? html`<div class="no-events">
            <p>This user has no events yet!</p>
        </div>` : events.map(eventTemplate)}
                <!--If there are no event-->
                
            </div>
        </section>`;

const eventTemplate = (singleEvent) => html`
        <div class="eventBoard">
        <div class="event-info">
            <img src=${singleEvent.imageUrl}>
            <h2>${singleEvent.title}</h2>
            <h6>${singleEvent.date}</h6>
            <a href="/details/${singleEvent._id}" class="details-button">Details</a>
        </div>
    </div>`;

export async function profilePage(ctx) {
    const events = await getMyEvents();
    const email = sessionStorage.getItem('email');
    ctx.render(profileTemplate(events, email));
}