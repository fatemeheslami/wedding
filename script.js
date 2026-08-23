document.addEventListener('DOMContentLoaded', () => {
    const inviteeNameEl = document.getElementById('inviteeName');
    
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const base64Name = urlParams.get('n') || urlParams.get('name');
    
    if (base64Name) {
        try {
            const decodedName = decodeURIComponent(escape(atob(base64Name)));
            inviteeNameEl.textContent = decodedName;
        } catch (e) {
            console.error('Error decoding the name from URL:', e);
            inviteeNameEl.textContent = 'مهمان عزیز';
        }
    } else {
        inviteeNameEl.textContent = 'مهمان عزیز';
    }

    // Envelope Interaction Animation Sequence
    const flapTop = document.getElementById('flapTop');
    let isOpen = false;

    flapTop.addEventListener('click', () => {
        if (!isOpen) {
            isOpen = true;
            
            // Play background music
            const bgMusic = document.getElementById('bgMusic');
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
            }
            
            // 1. Open the flap
            document.body.classList.add('open-flap');
            
            // 2. Pull up the paper (Wait 1000ms - overlap with flap opening for harmony)
            setTimeout(() => {
                document.body.classList.add('paper-pull-up');
            }, 1000);
            
            // 3. Drop down and unroll (Wait 1500ms for the pull-up to finish)
            setTimeout(() => {
                document.body.classList.add('paper-drop-down');
                
                // Ensure the user is scrolled to the top to read the paper
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 100);
            }, 2500); // 1000 + 1500
        }
    });

    // Map Modal Logic
    const openMapModalBtn = document.getElementById('openMapModal');
    const closeMapModalBtn = document.getElementById('closeMapModal');
    const mapModal = document.getElementById('mapModal');

    if (openMapModalBtn && closeMapModalBtn && mapModal) {
        openMapModalBtn.addEventListener('click', () => {
            mapModal.classList.add('active');
        });

        closeMapModalBtn.addEventListener('click', () => {
            mapModal.classList.remove('active');
        });

        // Close when clicking outside the modal content
        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) {
                mapModal.classList.remove('active');
            }
        });
    }
});
