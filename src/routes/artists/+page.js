export const load = async ({fetch, params}) => {


    const artistResponse = await fetch("http://localhost:8080/api/users")
    const artists = await artistResponse.json()


    return {
        artists,
    }

}
