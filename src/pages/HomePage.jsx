
import './HomePage.css'

import PixPlayLogo from '../images/pixplaylogo-landscape.png'

function HomePage() {

  return (
    <>
     <section className='home' id='home'>
  <div className='home-slider'>
    <div className='wrapper'>
      <div class="container">
        <div class="content">
          <div class="landing-logo">
            <img src={PixPlayLogo} alt="Brand Logo" class="logo"/>
          </div>
          <h1 class="landing-title">Build Your Brand Influence</h1><br/>
          <h1 class="landing-title">Attract Targeted Customers</h1>
          <p class="subtitle">打造您的品牌影響力,吸引精準客戶</p>
          <p class="landing-description">We help entrepreneurs build personal and corporate IPs, achieving precise customer growth through data-driven content strategies and advertising optimization.

</p>
          <a href="http://wa.me/+6593602418" class="cta-button">Contact Us</a>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default HomePage