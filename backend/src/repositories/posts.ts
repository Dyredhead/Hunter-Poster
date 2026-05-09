interface PostStats {
    comments: number;
    likes: number;
    bookmarks: number;
}

interface Post {
    id: number;
    created_by: string;
    created_at: Date;
    content: string;
    stats: PostStats;
}

const fakePosts: Post[] = [
    {
        id: 1,
        created_by: "alice",
        created_at: new Date(),
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a sapien justo. Nunc ultrices ligula ut erat tristique, ut fringilla nisi malesuada. Aenean tincidunt nunc mauris, vitae varius nunc tincidunt at. Pellentesque ornare ultrices aliquam. Etiam auctor dictum ex vitae venenatis. Sed aliquet metus at tellus pellentesque aliquet. Donec nec augue eget risus interdum mattis in sagittis orci. Morbi at tortor tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam faucibus orci eros, ut semper augue luctus et. Donec id ligula in ex ullamcorper vestibulum. Aenean quis nibh eget nibh cursus imperdiet. Pellentesque lorem risus, auctor quis lobortis quis, dapibus vel augue. Donec vulputate quam eu dolor iaculis pellentesque.",
        stats: {
            comments: 100,
            likes: 200,
            bookmarks: 300,
        },
    },
    {
        id: 2,
        created_by: "bob",
        created_at: new Date(),
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed urna purus. Pellentesque sed vehicula mauris. Vivamus turpis turpis, tempor ut ex a, congue tempor orci. Ut sodales, ligula at vulputate sodales, tellus nisl dignissim justo, sed accumsan dolor nunc quis metus. Sed ut feugiat dolor, ac venenatis enim. Integer bibendum tempus venenatis. Nam tristique finibus erat, ut cursus odio elementum vitae. Proin porttitor est nec nisl bibendum, vitae faucibus ante semper. Nulla egestas congue tortor sit amet scelerisque. Ut vitae mi dignissim, ornare augue quis, semper arcu. Quisque magna nisl, pretium sit amet pulvinar eget, consectetur eu purus. Nam justo ipsum, malesuada quis ex ut, interdum aliquam dui. ",
        stats: {
            comments: 500,
            likes: 600,
            bookmarks: 700,
        },
    },
];

export async function getPostsFollowing() {
    return fakePosts;
}

export async function getPostsForYou() {
    return fakePosts;
}

export async function getPostsById(id: number) {
    return fakePosts.find((post) => post.id === id);
}
