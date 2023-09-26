document.addEventListener("DOMContentLoaded", function() {
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.member-card');
    
    // Function to remove active and zoomed classes from all dots and cards
    const resetAll = () => {
      dots.forEach(d => d.classList.remove('active'));
      cards.forEach(c => c.classList.remove('zoomed'));
    };
  
    // Click event for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        resetAll();
        this.classList.add('active');
        const card = document.getElementById(`card${index + 1}`);
        if (card) {
          card.classList.add('zoomed');
        }
      });
    });
  
    // Click event for cards
    cards.forEach((card, index) => {
      card.addEventListener('click', function() {
        resetAll();
        this.classList.add('zoomed');
        const dot = document.getElementById(`dot${index + 1}`);
        if (dot) {
          dot.classList.add('active');
        }
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    let dots = document.querySelectorAll('.dot');
    let articles = document.querySelectorAll('.article');

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            let dotNumber = this.getAttribute('data-dot');

            articles.forEach(article => {
                if (article.getAttribute('data-article') === dotNumber) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
});

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