import { useEffect } from "react";


const Home = () => {

        useEffect(() => {
        let Token;
        Token = localStorage.getItem('token');

        if (Token === null)
        {
            console.log('null token ');
        }


    }, []);


    return (
        <>
            
        </>
    );
}

export default Home