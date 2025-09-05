

    //toggle navbar//
    //access elements from the dom
    function toggleMenu(){
        document.querySelector('.navLinks').classList.toggle('active');
        document.querySelector('.menu-icon').textContent = document.querySelector('.navLinks').classList.contains('active') ? "X" : "☰";
        document.querySelector('.menu-icon').style.color = 'black';
    }
    //ACcess elements from the dom
    const videoElement = document.getElementById('bgVideo');
    const videoSources = [ 'video1.mp4', 'video2.mp4', 'video3.mp4'];
    //predefine the currentindex
    let currentindex = 0;
    //introduce functions
    function playNextVideo(){
        videoElement.src = videoSources[currentindex];
        videoElement.load();
        videoElement.play();
        //autoassign the currentindex
        currentindex = (currentindex+1) % videoSources.length;
        //switch vibes every 10 seconds
        setTimeout(playNextVideo, 10000);
    }
    //initialize the videos
    playNextVideo();


    /*MENU SECTION*/
//introduce functions to filter the products by category
    function showCategory(category) {
        //Access the contents of the card container then loop through each of them
      document.querySelectorAll('.card-container').forEach(c => c.style.display = 'none');
      document.getElementById(category).style.display = 'flex';
      document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }

    function toggleCart(card) {
      card.classList.toggle('clicked');
    }

    function orderViaWhatsApp(product, price) {
      const phoneNumber = '254112585214'; // Enter WhatsApp number
      const message = `Hello, I'd like to order ${product} for KES ${price}.`;
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }

    function searchMeals() {
      const input = document.getElementById('searchInput').value.toLowerCase();
      document.querySelectorAll('.card-container').forEach(container => {
        container.querySelectorAll('.card').forEach(card => {
          const name = card.querySelector('h3').textContent.toLowerCase();
          card.style.display = name.includes(input) ? 'block' : 'none';
        });
      });
    }
/*MENU SECTION*/
/*LOYALTY SECTION*/

//Loyalty system

    const correctCode = generateDailyCode();
    const today = new Date().toDateString();
    const lastLogged = localStorage.getItem('lastMealDate');
    let stamps = parseInt(localStorage.getItem('stamps') || '0');

    function generateDailyCode() {
      const date = new Date();
      const seed = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
      }
      return 'MEAL' + Math.abs(hash % 1000); // e.g., MEAL472
    }

    function showCodeEntry() {
      if (lastLogged === today) {
        alert("You've already logged today's meal.");
        return;
      }
      document.getElementById('codeEntry').style.display = 'block';
    }

    function verifyCode() {
      const enteredCode = document.getElementById('dailyCode').value.trim().toUpperCase();
      if (enteredCode === correctCode) {
        stamps++;
        localStorage.setItem('stamps', stamps);
        localStorage.setItem('lastMealDate', today);
        updateStamps(stamps);
        document.getElementById('codeEntry').style.display = 'none';
        document.getElementById('dailyCode').value = '';
      } else {
        document.getElementById('rewardMessage').textContent = 'Enter the correct hotels code to proceed';
        rewardMessage.style.color = 'red';
        rewardMessage.style.padding = '5px 10px';
      }
    }

    function updateStamps(count) {
      for (let i = 1; i <= 7; i++) {
        const stamp = document.getElementById(`stamp${i}`);
        stamp.classList.toggle('filled', i <= count);
      }

      if (count >= 7) {
        document.getElementById('rewardMessage').textContent = "🎉 You’ve earned a free meal! Show this screen at the counter.";
        rewardMessage.style.color = 'green';
        rewardMessage.style.padding= '5px 10px';
      }
    }

    updateStamps(stamps);
    //Loyalty system//
    //contacts form//
    
  function sendToWhatsApp(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const phoneNumber = "254112585214"; // Replace with your business WhatsApp number
    const text = `Hello, my name is ${name} (${email}).\n\n${message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  }
  
  /*CONTACT SECTION*/