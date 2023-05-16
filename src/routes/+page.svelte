<script>
    export let data
    const hypedPost = data.hypedPostData[0]
    const jwt = data.jwt


</script>


<div class="front-page">
    <header>
        <h1>Welcome to the Musician Hub</h1>
        <p>Discover, Connect, and Showcase your talent</p>
    </header>

    <main>
        <div class="about">
            <h2>About Us</h2>
            <p>
                The Musician Hub is a platform dedicated to supporting new musicians. Whether you're a singer,
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
    </main>

</div>

<style lang="scss">
  .front-page {
    color: #0d1b2a;
    padding: 40px;

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

