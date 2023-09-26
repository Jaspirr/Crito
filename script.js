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
    const leftArrow = document.querySelector('.pagination .page-arrow i.fa-chevron-left:not(.fa-rotate-180)');
    const rightArrow = document.querySelector('.pagination .page-arrow i.fa-rotate-180');
    const pageNumbers = document.querySelectorAll('.pagination .page-number, .pagination .page-number-active');
    const ellipsis = document.querySelector('.pagination .ellipsis');
    let showHiddenPages = false; // Variabel för att spåra om de dolda sidnumren visas eller inte

    function switchPage(targetPageNumber) {
        const activePage = document.querySelector('.pagination .page-number-active');
        
        // Dölj alla sidnummer först
        pageNumbers.forEach(page => {
            page.style.display = 'none';
        });

        // Visa de 7 sidnumren baserat på det aktuella sidnumret
        for (let i = targetPageNumber - 3; i <= targetPageNumber + 3; i++) {
            const page = document.querySelector(`.pagination .page-number[data-page="${i}"], .pagination .page-number-active[data-page="${i}"]`);
            if (page) {
                page.style.display = 'inline-block';
            }
        }

        // Visa eller dölj ellipsis baserat på det aktuella sidnumret
        if (targetPageNumber <= 4) {
            ellipsis.style.display = 'inline-block';
        } else if (targetPageNumber >= 6) {
            ellipsis.style.display = 'inline-block';
        } else {
            ellipsis.style.display = 'none';
        }

        const targetPage = document.querySelector(`.pagination .page-number[data-page="${targetPageNumber}"], .pagination .page-number-active[data-page="${targetPageNumber}"]`);
        
        if (targetPage) {
            activePage.classList.remove('page-number-active');
            activePage.classList.add('page-number');
            targetPage.classList.remove('page-number');
            targetPage.classList.add('page-number-active');
        }
    }

    rightArrow.parentElement.addEventListener('click', function(event) {
        event.preventDefault();
        const activePageNumber = parseInt(document.querySelector('.pagination .page-number-active').getAttribute('data-page'));
        switchPage(activePageNumber + 1);
    });

    leftArrow.parentElement.addEventListener('click', function(event) {
        event.preventDefault();
        const activePageNumber = parseInt(document.querySelector('.pagination .page-number-active').getAttribute('data-page'));
        switchPage(activePageNumber - 1);
    });

    pageNumbers.forEach(function(page) {
        page.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPageNumber = parseInt(page.getAttribute('data-page'));
            switchPage(targetPageNumber);
        });
    });

    // Händelselyssnare för ellipsis
    ellipsis.addEventListener('click', function(event) {
        event.preventDefault();
        showHiddenPages = !showHiddenPages; // Växla mellan att visa/dölja de dolda sidnumren
        if (showHiddenPages) {
            // Visa alla sidnummer
            pageNumbers.forEach(page => {
                page.style.display = 'inline-block';
            });
            ellipsis.style.display = 'none';
        } else {
            // Uppdatera sidnumren baserat på det aktuella sidnumret
            const activePageNumber = parseInt(document.querySelector('.pagination .page-number-active').getAttribute('data-page'));
            switchPage(activePageNumber);
        }
    });
});