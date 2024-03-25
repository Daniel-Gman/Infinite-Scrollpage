document.addEventListener("DOMContentLoaded", async function () {
    const content = document.getElementById('content');
    const userList = document.getElementById('userList');
    const pageSize = 10;
    let currentPage = 1;
    let isLoading = false;

    async function fetchPageContent(page) {
        const response = await fetch(`MOCK_DATA.json?page=${page}&size=${pageSize}`);
        const data = await response.json();
        return data;
    }
    async function appendPageContent() {
        isLoading = true;
        const pageContent = await fetchPageContent(currentPage);
        pageContent.forEach(item => {
            const userCard = document.createElement('div');
            userCard.classList.add('card');
            userCard.innerHTML = `
                <h1>${item.user}</h1>
                <h2>${item.datum}</h2>
                <p>${item.content}</p>
            `;
            content.appendChild(userCard);
        });
        currentPage++;
        isLoading = false;
    }
    await appendPageContent();

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading) {
                appendPageContent();
            }
        });
    }, { root: null, rootMargin: "0px", threshold: 0.5 });

    observer.observe(content.lastElementChild);
});
