<script>
    import HypeWidget from "../lib/components/posts/HypeWidget.svelte";
    export let data
    const hypedPost = data.hypedPostData[0]
    const jwt = data.jwt


</script>

<h1>Welcome to TuneTower</h1>


<div>
    Welcome to our social media platform for musicians! Here, you can be a part of a growing community of
    talented musicians from around the world. Whether you're a musician looking to showcase your work or a user looking
    for the perfect artist for your party or event, our platform has everything you need.

    As a musician, you can create a profile, showcase your music, and connect with other musicians and fans. Our
    platform is designed to help you expand your network, find new opportunities, and gain valuable exposure. You can
    also participate in discussions, share your knowledge, and collaborate with other musicians to create amazing music.

    For users seeking a musician for their event or party, our platform offers an easy and intuitive way to find the
    perfect musician. Whether you're planning a wedding reception, birthday party, or any other social event, our
    platform has a wide selection of talented musicians to choose from. You can search for musicians by genre, location,
    and availability, and contact them directly to book their services.

    Our platform is built on the principles of community, collaboration, and creativity. We believe that by bringing
    musicians and fans from around the world together, we can create a lively and supportive community that fosters
    innovation and inspires new ideas. So whether you're a musician or a user, we invite you to be a part of our
    community and discover all the amazing things our platform has to offer in music.
</div>

<div>
    <HypeWidget post="{hypedPost}"/>
</div>

<div>

</div>
