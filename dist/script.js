document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  // Mobile menu toggle
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")

    // Toggle icon
    const icon = mobileMenuButton.querySelector("i")
    if (mobileMenu.classList.contains("hidden")) {
      icon.className = "fas fa-bars text-2xl"
    } else {
      icon.className = "fas fa-times text-2xl"
    }
  })

  // Close mobile menu when clicking on links
  const mobileLinks = mobileMenu.querySelectorAll("a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      mobileMenuButton.querySelector("i").className = "fas fa-bars text-2xl"
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerOffset = 100
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Global functions
function callNow() {
  window.location.href = "tel:+33299123456"
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const headerOffset = 100
    const elementPosition = section.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-xl shadow-xl max-w-sm transition-all duration-300 ${
    type === "success"
      ? "bg-green-500 text-white"
      : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
  }`

  notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"
            } mr-2"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = "0"
    setTimeout(() => notification.remove(), 300)
  }, 5000)
}
