import { getImage } from "@/api/images";
import { userGetById } from "@/api/users";
import {
    ImageContract,
    usersContract,
    type ContentPoll,
    type Post,
    type User,
} from "@my-app/shared";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import { checkLikeByUser, likePost, unlikePost } from "@/api/post";

function onUsernameClick() {}
function onImageClick() {}
function onContentClick() {}
function onComment() {}
//function onLike() {}
function onBookmark() {}
function onShare() {}

type AvatarIconProps = {
    id: string;
    pfp_id: string | null;
};

const AvatarIcon = ({ id, pfp_id }: AvatarIconProps) => {
    const [pfp_url, setPfpUrl] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            // await new Promise((f) => setTimeout(f, 200));
            try {
                if (pfp_id != null) {
                    const image =
                        ImageContract.routes.getById.responses[200].body.parse(
                            await (await getImage({ id: pfp_id })).json(),
                        );
                    setPfpUrl(
                        `data:${image.image_mime};base64,${image.image_data}`,
                    );
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [pfp_id]);

    return (
        <Link
            to={`/profile/${id}`}
            className="bg-neutral-darkest border-neutral-lightest flex w-1/4 justify-center overflow-clip rounded-full border-2"
        >
            <img
                src={pfp_url == null ? "/src/assets/icons/avatar.svg" : pfp_url}
            ></img>
        </Link>
    );
};

const CommentIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 14H18V12H6V14ZM6 11H18V9H6V11ZM6 8H18V6H6V8ZM22 22L18 18H4C3.45 18 2.97917 17.8042 2.5875 17.4125C2.19583 17.0208 2 16.55 2 16V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V22ZM4 16H18.85L20 17.125V4H4V16Z"
            fill="#1D1B20"
        />
    </svg>
);

const HeartIcon = ({ like }: { like: boolean }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={like ? "red" : "none"}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M20.8401 4.61012C20.3294 4.09912 19.7229 3.69376 19.0555 3.4172C18.388 3.14064 17.6726 2.99829 16.9501 2.99829C16.2276 2.99829 15.5122 3.14064 14.8448 3.4172C14.1773 3.69376 13.5709 4.09912 13.0601 4.61012L12.0001 5.67012L10.9401 4.61012C9.90843 3.57842 8.50915 2.99883 7.05012 2.99883C5.59109 2.99883 4.19181 3.57842 3.16012 4.61012C2.12843 5.64181 1.54883 7.04108 1.54883 8.50012C1.54883 9.95915 2.12843 11.3584 3.16012 12.3901L12.0001 21.2301L20.8401 12.3901C21.3511 11.8794 21.7565 11.2729 22.033 10.6055C22.3096 9.93801 22.4519 9.2226 22.4519 8.50012C22.4519 7.77763 22.3096 7.06222 22.033 6.39476C21.7565 5.7273 21.3511 5.12087 20.8401 4.61012Z"
            stroke="#1E1E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const BookmarkIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
            stroke="#1E1E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ShareIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15"
            stroke="#1E1E1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ImagePlaceholder = () => (
    <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="320" height="320" fill="#999999" />
    </svg>
);

function getDateFromUUIDv7(uuid: string): Date {
    // Remove hyphens and take the first 12 hex characters (48 bits)
    const hexTimestamp = uuid.replace(/-/g, "").substring(0, 12);

    // Convert hex to a decimal integer (milliseconds)
    const timestampMs = parseInt(hexTimestamp, 16);

    return new Date(timestampMs);
}

function DateTimeToString(datetime: Date): string {
    const date = new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(datetime);

    const time = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
    }).format(datetime);

    return `${date} @ ${time}`;
}

type PostProps = {
    id: string;
    author_id: string;
    image_id: string | null;
    content: string;
    poll: ContentPoll | null;
    comments: number;
    likes: number;
    bookmarks: number;
};

function PollOption({ option, votes }: { option: string; votes: number }) {
    return (
        <div className="flex">
            <p>{option}</p>
            <p>{votes}</p>
        </div>
    );
}

function Poll({
    question,
    closes_at,
    options,
    vote,
    current_votes,
}: ContentPoll) {
    let index = 0;

    return (
        <div>
            <p>{question}</p>
            <p>{DateTimeToString(new Date(closes_at))}</p>

            {options.map((option) => {
                index++;
                return (
                    <PollOption
                        key={option}
                        option={option}
                        votes={current_votes[index]}
                    />
                );
            })}
        </div>
    );
}

export function Post({
    id,
    author_id,
    content,
    image_id,
    poll,
    comments,
    likes,
    bookmarks,
}: PostProps) {
    const [user, setUser] = useState<User>();
    const [imageUrl, setImageUrl] = useState<string | null>();
    const [uiLikes, setUiLikes] = useState<number>(likes);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            // await new Promise((f) => setTimeout(f, 100));
            try {
                let tempLiked = checkLikeByUser(id);

                const user =
                    usersContract.routes.getById.responses[200].body.parse(
                        await (await userGetById({ id: author_id })).json(),
                    );
                setUser(user);

                if (image_id != null) {
                    const image =
                        ImageContract.routes.getById.responses[200].body.parse(
                            await (await getImage({ id: image_id })).json(),
                        );
                    setImageUrl(
                        `data:${image.image_mime};base64,${image.image_data}`,
                    );
                } else {
                    setImageUrl(null);
                }

                setLiked((await tempLiked).liked);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (user == undefined) {
        return;
    }

    return (
        <article className="post">
            <header className="post-header">
                <button className="post-author" onClick={onUsernameClick}>
                    <AvatarIcon pfp_id={user.pfp_id} id={user.id} />
                    <span className="post-username">{user.username}</span>
                </button>
                <div className="post-header-right">
                    <span className="post-date">
                        {DateTimeToString(getDateFromUUIDv7(id))}
                    </span>
                </div>
            </header>

            {imageUrl !== null && (
                <button className="post-image-wrapper" onClick={onImageClick}>
                    {imageUrl ? (
                        <img className="post-image" src={imageUrl} alt="Post" />
                    ) : (
                        <ImagePlaceholder />
                    )}
                </button>
            )}

            {content.trim() && (
                <>
                    <button className="post-body" onClick={onContentClick}>
                        <p className="post-content">{content}</p>
                    </button>
                </>
            )}

            {poll && (
                <Poll
                    type="poll"
                    question={poll.question}
                    closes_at={poll.closes_at}
                    options={poll.options}
                    vote={poll.vote}
                    current_votes={poll.current_votes}
                />
            )}

            <footer className="post-actions">
                <button
                    className="post-action-btn"
                    onClick={onComment}
                    aria-label="Comment"
                >
                    <CommentIcon />
                    <p className="post-action-text">{comments}</p>
                </button>
                <button
                    className="post-action-btn"
                    onClick={async () => {
                        if (liked) {
                            if (
                                (await unlikePost({ post_id: id })).status ===
                                200
                            ) {
                                setUiLikes(uiLikes - 1);
                            }
                            setLiked(false);
                        } else {
                            if (
                                (await likePost({ post_id: id })).status === 200
                            ) {
                                setUiLikes(uiLikes + 1);
                            }
                            setLiked(true);
                        }
                    }}
                    aria-label="Like"
                >
                    <HeartIcon like={liked} />
                    <p className="post-action-text">{uiLikes}</p>
                </button>
                <button
                    className="post-action-btn"
                    onClick={onBookmark}
                    aria-label="Bookmark"
                >
                    <BookmarkIcon />
                    <p className="post-action-text">{bookmarks}</p>
                </button>
                <button
                    className="post-action-btn"
                    onClick={onShare}
                    aria-label="Share"
                >
                    <ShareIcon />
                </button>
            </footer>
        </article>
    );
}

type PostFeedProps = {
    posts: Post[];
};

export function PostFeed({ posts }: PostFeedProps) {
    return (
        <div className="posts-feed">
            {posts?.map((post) => {
                switch (post.content.type) {
                    case "text":
                        return (
                            <Post
                                key={post.id}
                                id={post.id}
                                author_id={post.author_id}
                                content={post.content.content}
                                comments={post.comments}
                                likes={post.likes}
                                bookmarks={post.booksmarks}
                                image_id={null}
                                poll={null}
                            ></Post>
                        );
                    case "image":
                        return (
                            <Post
                                key={post.id}
                                id={post.id}
                                author_id={post.author_id}
                                content=""
                                comments={post.comments}
                                likes={post.likes}
                                bookmarks={post.booksmarks}
                                image_id={post.content.image_id}
                                poll={null}
                            ></Post>
                        );
                    case "text_image":
                        return (
                            <Post
                                key={post.id}
                                id={post.id}
                                author_id={post.author_id}
                                content={post.content.content}
                                comments={post.comments}
                                likes={post.likes}
                                bookmarks={post.booksmarks}
                                image_id={post.content.image_id}
                                poll={null}
                            ></Post>
                        );
                    case "poll":
                        return (
                            <Post
                                key={post.id}
                                id={post.id}
                                author_id={post.author_id}
                                content=""
                                comments={post.comments}
                                likes={post.likes}
                                bookmarks={post.booksmarks}
                                image_id={null}
                                poll={post.content}
                            ></Post>
                        );
                }
            })}
        </div>
    );
}
