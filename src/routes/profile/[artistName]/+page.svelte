<script>
    import {goto} from "$app/navigation";
    export let data
    const cookie = data.cookie
    const wallposts = data.wallposts

</script>

<h1>In Profile</h1>
<h1><a href="/profile/Funch">funch profile</a></h1>
<pre>
    <code>
        {JSON.stringify(data.json)}
    </code>
</pre>

<div>
    {#each wallposts as wallpost}
    <div class="wallpost-div">
        <div class="artist-div">
            <b>{wallpost.artistName}</b>
        </div>

        <div class="wallpost-body">
            <p>{wallpost.body}</p>
        </div>

        <div class="splitter"></div>

        <div>
            <div>
                <input type="text" placeholder="comment">
            </div>
            <div class="wallpost-comment">
                <p>{wallpost.comments}</p>
            </div>
        </div>

    </div>

    <br>
    {/each}
</div>

<pre>
    <code>
        {cookie}
    </code>
</pre>


<style>
    .wallpost-div{
        border: 2px solid #000;
        border-radius: 15px;
        padding: 50px;
        margin: 30px;
    }
    .wallpost-body{
        margin-bottom: 10px;
    }
    .artist-div{
        padding-bottom: 5px;
    }
    input{
        border: 2px solid #000;
        width: 50%;
        border-radius: 5px;
        padding: 2px;
        padding-left: 5px;
    }
    .splitter{
        border: 1px solid #000;
        margin: 10px
    }
</style>
