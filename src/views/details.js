import { html } from "../../node_modules/lit-html/lit-html.js";
import { getEventById, deleteEvent } from "../api/data.js";

const detailsTemplate = (theaterEvent, isOwner, onDelete) => html`
<section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${theaterEvent.title}</h1>
                    <div>
                        <img src=${theaterEvent.imageUrl} />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${theaterEvent.description}</p>
                    <h4>Date: ${theaterEvent.date}</h4>
                    <h4>Author: ${theaterEvent.author}</h4>

                     ${isOwner ? html`<div class="buttons">
                     <a @click=${onDelete} class="btn-delete">Delete</a>
                     <a class="btn-edit" href="/edit/${theaterEvent._id}">Edit</a>
                     <a class="btn-like" href="/like">Like</a>
                 </div>` : ''}
                    
                    <p class="likes">Likes: 0</p>
                </div>
            </div>
        </section>`

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');

    const eventId = ctx.params.id;

    const theaterEvent = await getEventById(eventId);

    const isOwner = userId === theaterEvent._ownerId;
    ctx.render(detailsTemplate(theaterEvent, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteEvent(eventId);
            ctx.page.redirect('/');
        }
    }
}