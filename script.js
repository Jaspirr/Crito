const memberDots = document.querySelectorAll('.member-dot');
const memberCards = document.querySelectorAll('.member-card');

// Funktion för att återställa alla medlemskort och punkter till deras ursprungliga tillstånd
function resetMembers() {
    memberCards.forEach(card => {
        card.style.transform = 'scale(1)';
    });
    memberDots.forEach(dot => {
        dot.style.backgroundColor = '#bbb';
    });
}

// Hantera klickhändelser på medlemspunkter
memberDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        resetMembers(); // Återställ alla medlemskort och punkter

        // Zooma in det valda medlemskortet
        memberCards[index].style.transform = 'scale(1.1)';

        // Ändra bakgrundsfärgen på den valda punkten
        this.style.backgroundColor = '#717171';
    });
});

// Hantera klickhändelser på medlemskort
memberCards.forEach((card, index) => {
    card.addEventListener('click', function() {
        resetMembers(); // Återställ alla medlemskort och punkter

        // Zooma in det valda medlemskortet
        this.style.transform = 'scale(1.1)';

        // Ändra bakgrundsfärgen på den motsvarande punkten
        memberDots[index].style.backgroundColor = '#717171';
    });
});

const articles = document.querySelectorAll('.articles-section .article');
const articleDots = document.querySelectorAll('.articles-section .dot');

function showPage(pageNumber) {
    articles.forEach(article => {
        if (article.getAttribute('data-page') === pageNumber) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

articleDots.forEach(dot => {
    dot.addEventListener('click', function() {
        const pageNumber = this.getAttribute('data-page');
        showPage(pageNumber);
    });
});

// Visa den första sidan när sidan laddas
window.onload = function() {
    showPage('1');
}

  document.addEventListener('DOMContentLoaded', function() {
    const leftArrow = document.querySelector('.pagination .page-arrow i.fa-chevron-left:not(.fa-rotate-180)');
    const rightArrow = document.querySelector('.pagination .page-arrow i.fa-rotate-180');
    const pageNumbers = document.querySelectorAll('.pagination .page-number, .pagination .page-number-active');
    const articles = document.querySelectorAll('.article-card');
    const articlesPerPage = 3; // Antal artiklar per sida
    let currentPage = 1; // Starta på sida 1

    function updateArticlesVisibility() {
        articles.forEach((article, index) => {
            if (index >= (currentPage - 1) * articlesPerPage && index < currentPage * articlesPerPage) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
    function updateActivePageIndicator() {
        // Ta bort den aktiva klassen från alla sidnummer
        pageNumbers.forEach(page => {
            page.classList.remove('page-number-active');
            page.classList.add('page-number');
        });
    
        // Lägg till den aktiva klassen till det aktuella sidnumret
        const activePage = document.querySelector(`.pagination .page-number[data-page="${currentPage}"], .pagination .page-number-active[data-page="${currentPage}"]`);
        if (activePage) {
            activePage.classList.remove('page-number');
            activePage.classList.add('page-number-active');
        }
    }

    function updatePaginationButtons() {
        const maxPage = Math.ceil(articles.length / articlesPerPage);
        leftArrow.parentElement.style.visibility = currentPage === 1 ? 'hidden' : 'visible';
        rightArrow.parentElement.style.visibility = currentPage === maxPage ? 'hidden' : 'visible';
    }

    function switchPage(targetPageNumber) {
        currentPage = targetPageNumber;
        updateArticlesVisibility();
        updatePaginationButtons();
        updateActivePageIndicator(); // Lägg till denna rad
    }

    rightArrow.parentElement.addEventListener('click', function(event) {
        event.preventDefault();
        switchPage(currentPage + 1);
    });

    leftArrow.parentElement.addEventListener('click', function(event) {
        event.preventDefault();
        switchPage(currentPage - 1);
    });

    pageNumbers.forEach(function(page) {
        page.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPageNumber = parseInt(page.getAttribute('data-page'));
            switchPage(targetPageNumber);
        });
    });

    // Initial setup
    updateArticlesVisibility();
    updatePaginationButtons();
});