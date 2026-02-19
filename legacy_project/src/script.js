const counters = document.querySelectorAll('.counter');

const startCounting = () => {
    counters.forEach(counter => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 100; // lower = faster
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target; // final value
            }
        };

        updateCounter();
    });
};

// ✅ Trigger when section is visible (using Intersection Observer)
const section = document.querySelector('.counter').parentElement.parentElement;

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounting();
        observer.disconnect(); // run once only
    }
});

observer.observe(section);


const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});



        function toggleAccordion(id) {
            for (let i = 1; i <= 5; i++) {
                const content = document.getElementById(`content-${i}`);
                const icon = document.getElementById(`icon-${i}`);

                if (i === id) {
                    const isOpen = !content.classList.contains("hidden");
                    content.classList.toggle("hidden");
                    icon.textContent = isOpen ? "+" : "−";
                    icon.classList.toggle("bg-[#00b3b3]", !isOpen);
                    icon.classList.toggle("bg-[#e5f7f7]", isOpen);
                    icon.classList.toggle("text-white", !isOpen);
                    icon.classList.toggle("text-[#00b3b3]", isOpen);
                } else {
                    content.classList.add("hidden");
                    icon.textContent = "+";
                    icon.classList.add("bg-[#e5f7f7]", "text-[#00b3b3]");
                    icon.classList.remove("bg-[#00b3b3]", "text-white");
                }
            }
        }








        
    const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // Scroll hone pr full width aur slide-up animation
      navbar.classList.add(
        "top-0",
        "left-0",
        "w-full",
        "rounded-none",
        "shadow-lg",
        "translate-y-0"
      );
      navbar.classList.remove(
        "top-11",
        "left-1/2",
        "-translate-x-1/2",
        "w-[80%]",
        "rounded-xl",
        "translate-y-[-10px]"
      );
    } else {
      // Reset to original (centered rounded)
      navbar.classList.add(
        "top-11",
        "left-1/2",
        "-translate-x-1/2",
        "w-[80%]",
        "rounded-xl",
        "translate-y-[-10px]"
      );
      navbar.classList.remove(
        "top-0",
        "left-0",
        "w-full",
        "rounded-none",
        "shadow-lg",
        "translate-y-0"
      );
    }
  });
