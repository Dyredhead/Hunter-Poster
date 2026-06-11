import { getImage } from "@/api/images";
import {
    bookmarkPost,
    checkBookmarkedByUser,
    checkLikedByUser,
    likePost,
    unbookmarkPost,
    unlikePost,
} from "@/api/posts";
import { userGetById } from "@/api/users";
import {
    ImageContract,
    postContract,
    usersContract,
    type ContentPoll,
    type Post,
    type User,
} from "@my-app/shared";
import { useEffect, useState } from "react";
import Pfp from "./Pfp";
import "./Post.css";

function onUsernameClick() {}
function onImageClick() {}
function onContentClick() {}
function onComment() {}
function onShare() {}

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

type HeartIconProps = {
    post_id: string;
    likes: number;
};

const HeartIcon = ({ post_id, likes }: HeartIconProps) => {
    const [isLiked, setIsLiked] = useState<boolean>();
    const [uiLikes, setUiLikes] = useState<number>(likes);

    useEffect(() => {
        const fetchData = async () => {
            // await new Promise((f) => setTimeout(f, 200));
            try {
                setIsLiked(
                    postContract.routes.checkLiked.responses[200].body.parse(
                        await (await checkLikedByUser({ id: post_id })).json(),
                    ).isLiked,
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [post_id, isLiked, uiLikes]);

    if (isLiked == undefined) {
        return;
    }

    return (
        <button
            className="post-action-btn"
            onClick={async () => {
                if (isLiked) {
                    if (
                        (await unlikePost({ post_id: post_id })).status === 200
                    ) {
                        setUiLikes(uiLikes - 1);
                    }
                    setIsLiked(false);
                } else {
                    if ((await likePost({ post_id: post_id })).status === 200) {
                        setUiLikes(uiLikes + 1);
                    }
                    setIsLiked(true);
                }
            }}
            aria-label="Like"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isLiked ? "red" : "none"}
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
            <p className="post-action-text">{uiLikes}</p>{" "}
        </button>
    );
};

type BookmarkIconProps = {
    post_id: string;
    bookmarks: number;
};

const BookmarkIcon = ({ post_id, bookmarks }: BookmarkIconProps) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>();
    const [uiBookmarks, setUiBookmarks] = useState<number>(bookmarks);

    useEffect(() => {
        const fetchData = async () => {
            // await new Promise((f) => setTimeout(f, 200));
            try {
                setIsBookmarked(
                    postContract.routes.checkBookmarked.responses[200].body.parse(
                        await (
                            await checkBookmarkedByUser({ id: post_id })
                        ).json(),
                    ).isBookmarked,
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [post_id, isBookmarked, uiBookmarks]);

    if (isBookmarked == undefined) {
        return;
    }

    return (
        <button
            className="post-action-btn"
            onClick={async () => {
                if (isBookmarked) {
                    if (
                        (await unbookmarkPost({ post_id: post_id })).status ===
                        200
                    ) {
                        setUiBookmarks(uiBookmarks - 1);
                    }
                    setIsBookmarked(false);
                } else {
                    if (
                        (await bookmarkPost({ post_id: post_id })).status ===
                        200
                    ) {
                        setUiBookmarks(uiBookmarks + 1);
                    }
                    setIsBookmarked(true);
                }
            }}
            aria-label="Like"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isBookmarked ? "blue" : "none"}
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
            <p className="post-action-text">{uiBookmarks}</p>{" "}
        </button>
    );
};

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

function PollOption({ option, votes }: { option: string; votes: number }) {
    return (
        <div className="flex flex-row justify-between">
            <p>{option}</p>
            <p>{votes}</p>
        </div>
    );
}

function Poll({
    question,
    closes_at,
    options,
    // vote,
    current_votes,
}: ContentPoll) {
    let index = 0;

    return (
        <div className="text-neutral-darkest flex flex-col gap-4">
            <div>
                <p>{question}</p>
                <p>closes at: {DateTimeToString(new Date(closes_at))}</p>
            </div>

            <div>
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
        </div>
    );
}

type PostProps = {
    id: string;
    author_id: string;
    comments: number;
    likes: number;
    bookmarks: number;
    image_id: string | null;
    content: string | null;
    poll: ContentPoll | null;
};

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

    useEffect(() => {
        const fetchData = async () => {
            // await new Promise((f) => setTimeout(f, 100));
            try {
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
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [author_id, id, image_id]);

    if (user == undefined) {
        return;
    }

    return (
        <article className="post ransform rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1">
            <header className="post-header">
                <button className="post-author" onClick={onUsernameClick}>
                    <Pfp
                        id={user.id}
                        pfp_id={user.pfp_id}
                        className="h-10 w-10"
                    />
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

            {content !== null && content.trim() !== "" && (
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

                <HeartIcon post_id={id} likes={likes} />

                <BookmarkIcon post_id={id} bookmarks={bookmarks} />
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
                let content = null;
                let image_id = null;
                let poll = null;

                switch (post.content.type) {
                    case "text":
                        content = post.content.content;
                        break;
                    case "image":
                        image_id = post.content.image_id;
                        break;
                    case "text_image":
                        content = post.content.content;
                        image_id = post.content.image_id;
                        break;
                    case "poll":
                        poll = post.content;
                        break;
                }
                return (
                    <Post
                        key={post.id}
                        id={post.id}
                        author_id={post.author_id}
                        comments={post.comments}
                        likes={post.likes}
                        bookmarks={post.bookmarks}
                        content={content}
                        image_id={image_id}
                        poll={poll}
                    ></Post>
                );
            })}
        </div>
    );
}
