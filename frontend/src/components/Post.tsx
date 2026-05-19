import "./Post.css";

type PostProps = {
    username: string;
    created_at: string;
    imageUrl?: string;
    content: string;
    comments: number;
    likes: number;
    bookmarks: number;
};

function onUsernameClick() {}
function onImageClick() {}
function onContentClick() {}
function onComment() {}
function onLike() {}
function onBookmark() {}
function onShare() {}

const AvatarIcon = () => (
    <svg
        className="post-avatar"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#avatar-clip)">
            <rect width="40" height="40" rx="20" fill="#999999" />
            <path
                d="M8 34C8 29.5817 11.5817 26 16 26H24C28.4183 26 32 29.5817 32 34V42C32 46.4183 28.4183 50 24 50H16C11.5817 50 8 46.4183 8 42V34Z"
                fill="#666666"
            />
            <circle cx="20.3618" cy="16" r="8" fill="#666666" />
        </g>
        <defs>
            <clipPath id="avatar-clip">
                <rect width="40" height="40" rx="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

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

const HeartIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
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

function DateTimeToString(datetime: Date): string {
    // const date = new Intl.DateTimeFormat(undefined, {
    //     month: "short",
    //     day: "numeric",
    //     year: "numeric",
    // }).format(datetime);

    // const time = new Intl.DateTimeFormat(undefined, {
    //     hour: "numeric",
    //     minute: "2-digit",
    // }).format(datetime);

    // return `${date} @ ${time}`;
    console.log(datetime);
    return datetime.toString();
}

export default function Post({
    username,
    created_at,
    content,
    imageUrl,
    comments,
    likes,
    bookmarks,
}: PostProps) {
    return (
        <article className="post">
            <header className="post-header">
                <button className="post-author" onClick={onUsernameClick}>
                    <AvatarIcon />
                    <span className="post-username">{username}</span>
                </button>
                <div className="post-header-right">
                    <span className="post-date">
                        {DateTimeToString(new Date(created_at))}
                    </span>
                </div>
            </header>

            {imageUrl !== undefined && (
                <button className="post-image-wrapper" onClick={onImageClick}>
                    {imageUrl ? (
                        <img className="post-image" src={imageUrl} alt="Post" />
                    ) : (
                        <ImagePlaceholder />
                    )}
                </button>
            )}

            <button className="post-body" onClick={onContentClick}>
                <p className="post-content">{content}</p>
            </button>

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
                    onClick={onLike}
                    aria-label="Like"
                >
                    <HeartIcon />
                    <p className="post-action-text">{likes}</p>
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
