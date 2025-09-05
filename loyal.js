
  const foodFacts = [
    { food: "Avocados", benefit: "are rich in healthy fats that support brain function and keep you full longer." },
    { food: "Sweet potatoes", benefit: "are packed with beta-carotene, which boosts your immune system and vision." },
    { food: "Spinach", benefit: "contains iron and folate, which help fight fatigue and support red blood cell production." },
    { food: "Bananas", benefit: "are a great source of potassium, helping regulate blood pressure and muscle function." },
    { food: "Oats", benefit: "provide slow-releasing energy, perfect for long study sessions or early morning classes." },
    { food: "Eggs", benefit: "are loaded with choline, which supports memory and cognitive performance." },
    { food: "Yogurt", benefit: "contains probiotics that aid digestion and improve gut health." },
    { food: "Carrots", benefit: "are high in antioxidants that protect your eyes and skin." },
    { food: "Pumpkin seeds", benefit: "are rich in magnesium, which helps reduce stress and improve sleep quality." }
  ];

  let currentIndex = null;
  let previousIndex = null;

  function updateFoodFact() {
    currentIndex = Math.floor((Date.now() / (1000 * 60 * 60 * 6)) % foodFacts.length);
    previousIndex = null;
    showFact(currentIndex);
  }

  function showRandomFact() {
    previousIndex = currentIndex;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * foodFacts.length);
    } while (randomIndex === currentIndex);
    currentIndex = randomIndex;
    showFact(currentIndex);
  }

  function showPreviousFact() {
    if (previousIndex !== null) {
      const temp = currentIndex;
      currentIndex = previousIndex;
      previousIndex = temp;
      showFact(currentIndex);
    }
  }

  function showFact(index) {
    const { food, benefit } = foodFacts[index];
    const text = `${food} ${benefit}`;
    const factText = document.getElementById("factText");
    factText.style.opacity = 0;
    setTimeout(() => {
      factText.textContent = text;
      factText.style.opacity = 1;
    }, 300);
  }

  function shareOnWhatsApp() {
    const { food, benefit } = foodFacts[currentIndex];
    const message = `Did you know? ${food} ${benefit}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  updateFoodFact(); // Initial load
    //DID YOU KNOW SECTION//