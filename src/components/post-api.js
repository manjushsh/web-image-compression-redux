import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromURL } from "../redux/reducers/posting-api/post-slice";

const PostAPI = () => {

    const dispatch = useDispatch();
    // Fetch on component mount
    useEffect(() => {
        dispatch(getFromURL());
    }, [dispatch]);
    const state = useSelector(state => state);
    const { isFetchingUserData, userData } = state?.getFromAPI;

    return (
        <div className="post-api-container">
            <h1>POST API</h1><hr />
            {!isFetchingUserData ? (
                <div>
                    {userData?.map(user => (
                        <span>
                            {user?.name}<br />
                            {user?.email}<br />
                            {user?.phone}<br /><hr />
                        </span>
                    ))}
                </div>
            ) : "Loading..."}
        </div>
    );
};

export default PostAPI;