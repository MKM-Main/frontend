<script>
    export let data

    const forums = data.forumData

    function replaceSpacesWithHyphens(title) {
        if (title.includes(" ")) {
            return title.replace(/ /g, "-");
        }
        return title;
    }

</script>


<div>
    <h2>Forums</h2>

    {#each forums.forum as forum}
        <div class="forum">

            <a href="/forum/{replaceSpacesWithHyphens(forum.forumTitle)}">Forum name: {forum.forumTitle}</a>
            <p>Forum Created: {forum.creationDate}</p>
            <br>
            <div class="comment">
                {#each forum.tags as tag}
                    <p>Tags: {tag}</p>
                    <br>
                {/each}
            </div>
        </div>
    {/each}
</div>


