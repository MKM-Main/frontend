<script>
  import { env } from "$env/dynamic/public";
  import UserUploadedFile from "../lib/components/files/UserUploadedFile.svelte";
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import toast, {Toaster} from 'svelte-french-toast'
  import CookieConsent from "$lib/components/util/CookieConsent.svelte";

  export let data;
  const posts = data.postData.posts;
  const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX;
  const users = data?.usersData?.data;
  const jwt = data?.jwt;


  const filteredArrays = posts.reduce((filtered, post) => {
    if (post.referenceName !== "wallpost") {
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



    // Short down the body of the post and replace with ...
    function truncateText(text) {
      const lines = text?.split('\n')?.slice(0, 3); // Get first 3 lines of the text
      const truncatedText = lines?.join('\n'); // Join the lines back into a string
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
    let slideReleaseIndex = 0;
    let timer;


  function showSlides(classSelectors) {
    const slides = document.querySelectorAll(classSelectors);
    if(classSelectors === ".mySlides"){
      slides.forEach((slide, index) => {
      slide.style.display = index === slideIndex ? 'block' : 'none';
    });

    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }

    timer = setTimeout(() => showSlides(classSelectors), 2000);
    }else if(classSelectors === ".mySlides-release"){
      slides.forEach((slide, index) => {
      slide.style.display = index === slideReleaseIndex ? 'block' : 'none';
    });

    slideReleaseIndex++;
    if (slideReleaseIndex >= slides.length) {
      slideReleaseIndex = 0;
    }

    timer = setTimeout(() => showSlides(classSelectors), 4000);
    }

  }

  onMount(() => {
    showSlides('.mySlides');
    showSlides('.mySlides-release');
  });

  onDestroy(() => {
    clearTimeout(timer);
  });
  </script>

<Toaster />

<div class="header">
</div>
  <div class="front-page">
    <div style="max-width: 25%;"></div>
    <div class="new-users-week">
      <div class="slideshow-container">
        <h2 class="widget-center">Recent Sign-up's</h2>
        {#each users as user, index}
          {#if isRecentSignup(user.creationDate)}
            <div class="mySlides fade" style="display: {index === 0 ? 'block' : 'none'};">
              <a href="/profile/{user.artistName}" target="_blank">
                {#if user.profilePictureKey === "blank_profile.webp"}
                <div class="slide-content-wrapper" style="background-image: url('{imageSourcePrefix}{user.profilePictureKey}');">
                    <div class="numbertext">
                      <p>{user.artistName}</p>
                    </div>
                    <div class="user-tags">
                      {#each user.userTags as tag}
                        <p>{tag}</p>
                      {/each}
                    </div>
                </div>
                {:else}
                <div class="slide-content-wrapper" style="background-image: url('{imageSourcePrefix}{user._id}/profile/{user.profilePictureKey}');">
                  <div class="numbertext">
                    <p>{user.artistName}</p>
                  </div>
                  <div class="user-tags">
                    {#each user.userTags as tag}
                    <p>{tag}</p>
                    {/each}
                  </div>
                </div>
                {/if}

            </a>
            </div>
          {/if}
        {/each}
        {#if !jwt}
          <a href="/signup"><button class="sign-up-btn">Sign up today</button></a>
        {/if}
      </div>

  </div>

  <div></div>

      <div>
        
        <div class="slideshow-container-release">
          <h1>Upcoming Releases</h1>
          {#each users as user, index}
            {#each user.discography as discography}
              {#if discography.isNewRelease === true || discography.length !== 0}
              <div class="mySlides-release fade-release" style="display: {index === 0 ? 'block' : 'none'};">
                <h2>{discography.mainTitle}</h2>
                <div class="release-img-container">
                  <h3>Release Date: {discography.releaseDate}</h3>
                  <a href="/profile/{user.artistName}"><img class="release-img" src="{imageSourcePrefix}{user._id}/discography/{discography._id}" alt=""></a>
                </div>
                <div class="release-content">
                  <h2>{user.artistName}</h2>
                  {#if discography.album === true}
                    <p>New album comming up</p>
                    {:else}
                    <p>Single</p>
                  {/if}

                  <div class="release-service">
                    <a href="{discography.mainUrl}" target="_blank"><img class="service-img" src="{imageSourcePrefix}logos/{discography.selectedService}.svg" alt=""></a>
                  </div>
                </div>
              </div>
              {/if}
            {/each}
          {/each}
        </div>
      </div>

      <div class="info-section">
        <h1>Tune Tower</h1>
        <div class="about">
          <h2>About Us</h2>
          <p>
              Tune Tower is a platform dedicated to supporting new musicians. Whether you're a singer,
              songwriter,
              producer, or instrumentalist, we provide you with the tools and resources to grow your music career.
          </p>
      </div>
      <div class="discover">
          <h2>Discover</h2>
          <p>
              Explore a wide range of musical genres, discover new artists, and find inspiration for your own music.
              Our
              curated collection of tracks and playlists will keep you engaged and motivated on your musical journey.
          </p>
      </div>

      <div class="connect">
          <h2>Connect</h2>
          <p>
              Connect with fellow musicians, collaborate on projects, and exchange ideas. Our community is filled with
              talented individuals who are passionate about music. Build your network and grow together.
          </p>
      </div>

      <div class="showcase">
          <h2>Showcase</h2>
          <p>
              Showcase your talent to the world. Create your artist profile, upload your music, and reach a global
              audience.
              Gain recognition, receive feedback, and take your music career to the next level.
          </p>
      </div>
      </div>

    <div class="top-5-posts">
      <h2 class="header-top-post">Today's Top 5 Posts</h2>
      {#each topPosts as post}
      <div class="top-post">
        {#if post.postTitle}
          <h2>{post.postTitle}</h2>
        {/if}
        <UserUploadedFile className={"frontpage-media-top5"} keyReference={post.keyReference} artistId={post.artistId}/>
        <p class="post-body">{truncateText(post.body)}</p>
        <p> <b>{post.artistName}</b></p>
        <p>Rating: {post.rating.length}</p>
          {#if post.referenceName === "wallpost"}
              <a href="/profile/{post.artistName}#{post._id}">Go to Post</a>
              {:else}
              <a href="/forum/{post.referenceName}/{post.postTitle}#{post._id}">Go to Post</a>
          {/if}
      </div>
      {/each}
    </div>
  </div>

  <style lang="scss">
    .header-top-post{
      margin-left: 40%;
    }
    .widget-center{
      text-align: center;
    }
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
      width: 65%;
      margin: 0% 25% 5% 25%;
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
  img {
    vertical-align: middle;

  }

  .new-users-week{
    border-radius: 20px;
    width: 100%;
    margin-bottom: 5%;
    box-shadow: -1px -1px 15px 8px #e0e1dd;

    button{
      font-size: 1em;
      margin-left: 20%;
      margin-right: 20%;
      height: 2em;
      width: 60%;
      background-color: #1B263B;
      color: #E0E1DD;
      border: none;
      border-radius: 0.75em;
      cursor: pointer;
      transition: background-color 0.3s ease;
      text-decoration: none;
  }
  }
  .slideshow-container {
    a{
      text-decoration: none;
    }
      .numbertext {
        color: rgb(26, 25, 25);
        font-size: 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .user-tags {
      color: rgb(26, 25, 25);
      font-size: 20px;
    }
    .slide-content-wrapper {
      background-size:contain;
      background-position: center;
      border-radius: 20px;
      max-width: 100%;
      display: flex;
      justify-content: space-between !important;
      align-items: center;
      justify-content: center;
      z-index: 1;
      height: 14em;
      padding: 1em;
    }
    .fade {
      animation-name: fade;
      animation-duration: 1.5s;
    }

    .sign-up-btn{
      font-size: 1em;
      margin-left: 20%;
      margin-right: 20%;
      height: 2em;
      width: 60%;
      background-color: #1B263B;
      color: #E0E1DD;
      border: none;
      border-radius: 0.75em;
      cursor: pointer;
      transition: background-color 0.3s ease;
      text-decoration: none;
      margin-top: 1em;
      margin-bottom: 1em;
    }

    @keyframes fade {
      from {opacity: .4}
      to {opacity: 1}
    }

    .slider-img{
      width: 500px;
    }
  }
  .mySlides-release {display: none;}
  .slideshow-container-release {
    background-color: #415A77;
    max-width: 75%;
    box-shadow: -1px -1px 15px 8px #e0e1dd;
    border-radius: 20px;

    .fade-release {
      animation-name: fade-release;
      animation-duration: 1.5s;
    }

    @keyframes fade-release {
      from {opacity: .4}
      to {opacity: 1}
    }

    .release-img {
      max-width: 100%;
      height: 17em;
      padding: 1em;
      border-radius: 45px;
      // object-fit: contain;
    }
    .release-img-container{
      display: grid;
      place-items: center;
      object-fit: contain;
    }
    .release-content{
      text-align: center;
    }
    .release-service{
      object-fit: contain;
    }
    .service-img{
      object-fit: contain;
      max-width: 100%;
      padding: 1em;
      height: 7em;
      &:hover{
        filter: brightness(70%);
      }
    }
    h2{
      text-align: center;
      padding-top: 0.5em;
    }
  }


  </style>
