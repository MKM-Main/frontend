<script>
    export let data;
    const forums = data?.json?.forum
    
    function replaceSpacesWithHyphens(title) {
        if (title.includes(" ")) {
            return title.replace(/ /g, "-");
        }
        return title;
    }


</script>


<h1>{forums[0].referenceName}</h1>

<div class="forum-container">
    {#each forums as forum}
        <!-- <a href="/forum/{replaceSpacesWithHyphens(forum.referenceName)}/{replaceSpacesWithHyphens(forum.postTitle)}"> -->
        <a href="/forum/{forum.referenceName}/{forum.postTitle}">
            <p>Post Title: {forum.postTitle}</p>
            <p>Body: {forum.body} </p>
            <p>User who created post: {forum.artistName} </p>
            <p>Created at: {forum.timeStamp}</p>
            <p>Rating: {forum.rating}</p>
            <p>Number of comments: {forum.comments.length}</p>
        </a>
    {/each}
</div>

<style>
    .forum-container {
        border-bottom: 1px solid black;
    }

    a {
        color: black;
        text-decoration: none;
    }

    .forum-container:hover {
        background-color: grey;
    }
</style>


