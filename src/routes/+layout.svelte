<script>
    import {env} from "$env/dynamic/public";
    export let data
    const Header = data.Header
    const Footer = data.Footer
    const jwt = data.jwt
    const artistName = data?.userData?.customMessage?.artistName
    const userRole = data?.userData?.customMessage?.role
    const profilePictureKey = data?.userData?.customMessage?.profilePictureKey
    const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX
    const imageSource = `${imageSourcePrefix}${profilePictureKey}`


</script>

<Header artistName={artistName}
        imageSource={imageSource}
        jwt={jwt}
        userRole={userRole}
/>
<slot/>
<Footer/>
