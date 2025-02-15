
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
          <h1 class="landing-title">打造您的品牌影響力</h1><br/>
          <h1 class="landing-title">吸引精準客戶</h1>
          <p class="subtitle">Build Your Brand Story, Attract Targeted Customers</p>
          <p class="landing-description">我們幫助企業家打造個人與企業IP，通過數據驅動的內容策略和廣告優化，實現精準客戶增長</p>
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