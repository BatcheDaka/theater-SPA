import { html } from "../../node_modules/lit-html/lit-html.js";

import { getEventById, updateEvent } from '../api/data.js';

const editCarTemplate = (theaterEvent, onSubmit) => html`
<section id="editPage">
<form @submit=${onSubmit} class="theater-form">
    <h1>Edit Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" .value=${theaterEvent.title}>
    </div>
    <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${theaterEvent.date}>
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author"
        .value=${theaterEvent.author}>
    </div>
    <div>
        <label for="description">Theater Description:</label>
        <textarea id="description" name="description"
            placeholder="Description" .value=${theaterEvent.description}></textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
        .value=${theaterEvent.imageUrl}>
    </div>
    <button class="btn" type="submit">Submit</button>
</form>
</section>`;

export async function editPage(ctx) {

    const eventId = ctx.params.id;

    const theaterEvent = await getEventById(eventId);
    ctx.render(editCarTemplate(theaterEvent, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const date = formData.get('date');
        const author = formData.get('author');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');


        if (!title || !date || !author || !description || !imageUrl) {
            return alert('All fields are required');
        }

        await updateEvent(eventId, {
            title,
            date,
            author,
            description,
            imageUrl,
        });
        ctx.page.redirect('/details/' + eventId);
    }

}