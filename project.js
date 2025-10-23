// ### 2. JavaScript (Dynamic Image Fetching)

// Remember to replace the placeholder with your actual key.


        // ⚠️ IMPORTANT: Replace this with your actual TMDB API Key
        const API_KEY = '95f5042e4f8e02815fa8e41724149425'; // <<<--- MUST BE CHANGED!
        const PARALLAX_SECTION = document.getElementById('parallax-bg');
        const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

        // Function to fetch and set a single random movie poster
        async function setRandomBackground() {
            try {
                // Fetch the first page of popular movies
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
                const data = await response.json();

                if (!data.results || data.results.length === 0) {
                    console.error("TMDB: No movie results found.");
                    return;
                }

                // Get a random movie from the results
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const movie = data.results[randomIndex];

                // Prioritizes the wide 'backdrop_path' for the background
                const posterPath = movie.backdrop_path || movie.poster_path; 

                if (posterPath) {
                    const fullImageUrl = `${BASE_IMAGE_URL}${posterPath}`;
                    
                    // Set the background-image style directly
                    PARALLAX_SECTION.style.backgroundImage = `url('${fullImageUrl}')`;
                }

            } catch (error) {
                console.error('Error fetching movie data. Check API key and network:', error);
                // Fallback: Use a simple placeholder if API fails
                PARALLAX_SECTION.style.backgroundImage = `url('https://picsum.photos/1920/1080?grayscale')`;
            }
        }

        // 2. Initial call to set the first image immediately
        setRandomBackground();

        // 3. Set up the interval to change the image every 7 seconds (7000 milliseconds)
        setInterval(setRandomBackground, 7000);    