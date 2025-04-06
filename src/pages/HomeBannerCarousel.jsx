import Carousel from '../components/Carousel';

function HomeBannerCarousel() { 
    //give the path of the image whihc is in public/assets/images/
    const slides = [
        {
          image: '/assets/images/home-banner1.jpg',
          title: 'Start Your English Journey',
          subtitle: 'Basics to Advanced — Explore All in One Place',
          buttonText: 'Explore Modules',
          onClick: () => alert('Navigating to modules...')
        },
        {
          image: 'https://images.pexels.com/photos/5212323/pexels-photo-5212323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=1200',
          title: 'Learn with Confidence',
          subtitle: 'Fun, engaging lessons with real progress',
          buttonText: 'Start Learning',
          onClick: () => alert('Navigating to start learning...')
        },
        {
          image: 'https://img.freepik.com/free-vector/online-education-concept_1209646.htm?t=st=1712430000~exp=1712433600~hmac=a6e2dd75c3a8835d4d39430b47dd5410ec7f5c5192068b8b91c45b112cf1d093&w=1380',
          title: 'Anywhere, Anytime Learning',
          subtitle: 'Online, self-paced, and interactive',
          buttonText: 'Get Started',
          onClick: () => alert('Navigating to get started...')
        }
      ];
    return (
      <div>
         
         <Carousel slides={slides} />

      </div>
    )
  }
  
  export default HomeBannerCarousel