<script>
  import { env } from "$env/dynamic/public";
  import UserUploadedFile from "../lib/components/files/UserUploadedFile.svelte";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";

  export let data;
const posts = data.postData;
  const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX;
  const users = data?.usersData?.data;


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

    function isRecentSignup(creationDate) {
          const currentDate = new Date();
          const parts = creationDate.split(', ')[0].split('/');
          const creationTimestamp = new Date(
              `${parts[2]}-${parts[1]}-${parts[0]}`
          ).getTime();
          const sevenDaysAgo = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
          return creationTimestamp >= sevenDaysAgo;
      }




    let slideIndex = 0;
    let timer;

    function showSlides() {
      const slides = document.querySelectorAll(".mySlides");

      slides.forEach((slide, index) => {
      slide.style.display = index === slideIndex ? "block" : "none";
      });

      slideIndex++;
      if (slideIndex >= slides.length) {
        slideIndex = 0;
      }

      timer = setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

    // Call the showSlides function when the component is mounted
    onMount(() => {
      showSlides();
    });

    // Stop the timer when the component is unmounted
    onDestroy(() => {
      clearTimeout(timer);
    });
  </script>
  <div class="header">
  <h1>Tune</h1>
</div>
  <div class="front-page">

      <div>
        <h3>New Releases</h3>

      </div>


      <div class="new-users-week">
        <div class="slideshow-container">
          {#each users as user, index}
            {#if isRecentSignup(user.creationDate)}
              <div class="mySlides fade" style="display: {index === 0 ? 'block' : 'none'};">
                <a href="/profile/{user.artistName}" target="_blank"><div class="slide-content-wrapper" style="background-image: url('{imageSourcePrefix}{user.profilePictureKey}');">
                  <div class="numbertext">
                    <p>{user.artistName}</p>
                  </div>
                  <div class="user-tags">
                    {#each user.userTags as tag}
                      <p>{tag}</p>
                    {/each}
                  </div>
                </div></a>
              </div>
            {/if}
          {/each}
        </div>
    </div>

    <div class="top-5-posts">
      {#each topPosts as post}
      <div class="top-post">
        <h2>{post.postTitle}</h2>
        <UserUploadedFile
                className={"frontpage-media-top5"}
                keyReference={post.keyReference}
                artistId={post.artistId}/>
        <p class="post-body">{truncateText(post.body)}</p>
        <p> <b>{post.artistName}</b></p>
        <p>Rating: {post.rating.length}</p>
        <a href="http://localhost:5173/forum/{post.referenceName}/{post.postTitle}"> GO TO POST</a>
      </div>
      {/each}
    </div>
  </div>



  <style lang="scss">
    h1{
      text-align: center;
    }
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
      grid-template-columns: 33% 33% 33%;

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

    * {box-sizing: border-box;}
  body {font-family: Verdana, sans-serif;}
  .mySlides {display: none;}
  img {vertical-align: middle;}

  .new-users-week{
    max-width: 100%;

  }
  .slideshow-container {
    a{
      text-decoration: none;
    }


      .numbertext {
      color: #f2f2f2;
      font-size: 100px;
    }
    .user-tags {
      color: #f2f2f2;
      font-size: 20px;
    }
    .slide-content-wrapper {

      background-size: cover;
      background-position: center;
      border-radius: 20px;
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }
    .fade {
      animation-name: fade;
      animation-duration: 1.5s;
    }

    @keyframes fade {
      from {opacity: .4}
      to {opacity: 1}
    }

    .slider-img{
      width: 500px;
    }
  }
  </style>
