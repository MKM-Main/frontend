<script>
    export let data
    const Header = data.Header
    const Footer = data.Footer
    const jwt = data.jwt
    const artistName = data?.userData?.customMessage?.artistName

</script>

<Header artistName={artistName}
        jwt={jwt}/>
<slot/>
<Footer/>
