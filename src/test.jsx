import routes from "./routes";
import { useRoutes } from 'react-router-dom';

function test() {
    const { isLoggedIn } = useSelector((state) => state.auth);

    const routing = useRoutes(routes(isLoggedIn));

    return (
        <>
            {routing}
        </>
    );
}