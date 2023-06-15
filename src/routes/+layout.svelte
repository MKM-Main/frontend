<script>
  import { env } from "$env/dynamic/public";
  import { Toaster } from "svelte-french-toast";
  import CookieConsent from "../lib/components/util/CookieConsent.svelte";
  export let data;
  const Header = data.Header;
  const Footer = data.Footer;
  const jwt = data.jwt;
  const artistName = data?.userData?.customMessage?.artistName;
  const artistId = data?.userData?.customMessage?._id;
  const userRole = data?.userData?.customMessage?.role;
  const profilePictureKey = data?.userData?.customMessage?.profilePictureKey;
  const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX;
  let imageSource;

  if (profilePictureKey === "blank_profile.webp") {
    imageSource = `${imageSourcePrefix}${profilePictureKey}`;
  } else {
    imageSource = `${imageSourcePrefix}${artistId}/profile/${profilePictureKey}`;
  }

  let conversation = data?.conversationData;
  //$: for reactivity
  $: conversation = data?.conversationData;
</script>

<CookieConsent />
<Header artistName={artistName} conversation={conversation} imageSource={imageSource} jwt={jwt} userRole={userRole} />
<Toaster />
<slot />
<Footer />

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
  }
</style>
