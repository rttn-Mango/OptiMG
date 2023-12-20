//Component
import CTA from '../Components/CTA'

//Image/illustrations
import newspaper from '../Assets/newspaper.jpg'
import seamless from '../Assets/seamless.svg'
import seamlessTablet from '../Assets/seamless-tablet.svg'
import seamlessMobile from '../Assets/seamless-mobile.svg'


//Icon
import arrow from '../Assets/arrow.svg'

export default function Homepage(){
    return (
        <main className="homepage">
            <h1 aria-label='Optimize all your assets with minify.'>
                Optimize <a href="" aria-hidden="true" title="Start Compressing">Start Compressing</a> all your assets <img aria-hidden='true' src={newspaper} alt="Newspaper Image" draggable="false" width={110} height={100}/> with minify.
            </h1>
            <p aria-label='Or convert them to a new one'>Or <a href="" aria-hidden="true" title='Convert'>Convert <img src={arrow} alt="Right Arrow" draggable="false" width={30} height={30}/></a> them to a new one.</p>

            <section className="homepage__mid-content">
                <img 
                    src={seamless} 
                    srcSet={`${seamlessMobile} 270w, ${seamlessTablet} 640w, ${seamless} 1200`}
                    sizes='(max-width: 430px) 270px, (max-width: 850px) 640px, 1200px'
                    alt="Seamless Experience Illustration" 
                    draggable="false" 
                    width={1200} 
                    height={610}
                />
                <h2>At minify, we understand the importance of a <span>simple</span> and <span>minimal</span> experience.</h2>
            </section>

            <section className="homepage__mission">
                <h2>Our <span>mission</span> you ask?</h2>
                <p>It&apos;s simple, minify is on a mission to make a simple, easy to use, and seamless compression site which <span>Developers</span>, <span>Designers</span>, and average consumers can enjoy can enjoy.</p>
            </section>

            <section className="homepage__offer">
                <h2>What do we offer?</h2>

                <div className="homepage__offer--card">
                    <h3>Compression</h3>
                    <p>Say goodbye to sluggish load times and hefty file sizes. </p>
                    <p>Our compression service reduces the size of your digital assets without compromising on quality. </p>
                    <p>Watch as we shrink that once 1MB file down to a nimble 50KB, ensuring your web pages load faster and your users stay engaged.</p>
                </div>
                <div className="homepage__offer--card">
                    <h3>Conversion</h3>
                    <p>Keep up with the latest file formats effortlessly.</p>
                    <p>conversion service allows you to transition from older file extensions, like JPG, to newer ones, such as WebP.</p>
                    <p>Stay ahead of the curve, improve compatibility, and embrace the benefits of modern digital media with a simple click.</p>
                </div>
            </section>

            <section className="homepage__closing">
                <CTA/>
            </section>
        </main>
    )
}