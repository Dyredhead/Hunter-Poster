export async function findUserById(id: number) {
    const fakeUsers = [
        { id: 1, email: "alice@example.com" },
        { id: 2, email: "bob@example.com" },
    ];

    return fakeUsers.find((user) => user.id === id) ?? null;
}
