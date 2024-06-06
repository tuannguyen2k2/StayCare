import { getCookies } from "cookies-next";

function RefresPage() {
    const refresh_token = getCookies();
    console.log("refresh token inside: ", refresh_token);
    // return ( <></> );

    // useEffect(() => {
    //     console.log("resetting access token");
    //     resetServerAccessCookies({
    //         access_token: "new token",
    //     });
    //     // removeServerAuthCookies();
    // }, []);
}

export default RefresPage;