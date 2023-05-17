<script>
import { env } from "$env/dynamic/public";
import UserUploadedFile from "../lib/components/files/UserUploadedFile.svelte";

export let data;
const posts = data.postData;
const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX;

const filteredArrays = posts.reduce((filtered, post) => {
  if (post.reference !== "wallpost") {
    const todaysDate = new Date().toLocaleString("en-GB").split(', ')[0];
    const filteredComments = post.comments.filter(comment => comment.timeStamp.split(', ')[0] === todaysDate);
    filtered.push({ post, filteredComments });
  }
  return filtered;
}, []);

const topPosts = filteredArrays
  .sort((a, b) => b.filteredComments.length - a.filteredComments.length)
  .slice(0, 5)
  .map(obj => obj.post);

  console.log(topPosts)

  // Short down the body of the post and replace with ...
  function truncateText(text) {
    const lines = text.split('\n').slice(0, 3); // Get first 3 lines of the text
    const truncatedText = lines.join('\n'); // Join the lines back into a string
    return truncatedText.length < text.length ? truncatedText + '...' : truncatedText;
  }

</script>

<div class="front-page">
  <h1>WELCOME TO TUNE TOWER</h1>

  <div class="info-section">
    <h3>Discover, Connect, and Showcase your talent</h3>
  </div>

  <div class="popular-forum">
    <h3>Most active forums</h3>
  </div>

  <div class="top-5-posts">
    <h3>Most popular post!!!</h3>
    {#each topPosts as post}
    <div class="top-post">
      <h2>{post.postTitle}</h2>
      <UserUploadedFile className={"frontpage-media-top5"} keyReference={post.keyReference} artistName={post.artistName}/>
      <p class="post-body">{truncateText(post.body)}</p>
      <p>{post.artistName}</p>
      <p>Rating: {post.rating.length}</p>
      <a href="http://localhost:5173/forum/{post.referenceName}/{post.postTitle}"> GO TO POST</a> 
    </div>
    {/each}

  </div>

  <div class="new-users-week">
    <h3>Users joined last 3 days</h3>
  </div>

</div>



<style lang="scss">
    .post-body {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

    .top-post {
    width: 50%;
    margin: 25px 25%;
    padding: 0.5em;
    border-radius: 0.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: -1px -1px 15px 8px #e0e1dd;
    background-color: #ffffff;
    overflow: hidden;
    
      a {
        font-size: 1em;
        padding: 0.5em 1em;
        background-color: #1B263B;
        color: #E0E1DD;
        border: none;
        border-radius: 0.75em;
        cursor: pointer;
        transition: background-color 0.3s ease;
        text-decoration: none;

        &:hover {
          background-color: #778DA9;
        }
    }
  }

  .top-post-file {
    width: 50%;
    margin: 0 auto;
    max-height: 20em;
    overflow: hidden;
  }

  .file-content {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file-content UserUploadedFile {
    max-width: 100%;
    max-height: 100%;
    
  }

  .front-page {
    color: #0d1b2a;
    padding: 40px;
    display: grid;
    grid-template-columns: 70% 30%;

    header {
      text-align: center;
      margin-bottom: 40px;

      h1 {
        color: #0d1b2a;
        font-size: 32px;
        margin-bottom: 10px;
      }
    }

    .about,
    .discover,
    .connect,
    .showcase {
      margin-bottom: 40px;

      h2 {
        color: #0d1b2a;
        font-size: 24px;
        margin-bottom: 10px;
      }
    }

    footer {
      text-align: center;
      margin-top: 40px;

      p {
        color: #e0e1dd;
      }
    }
  }
</style>

