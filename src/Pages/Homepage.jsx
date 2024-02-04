import { useEffect } from 'react'
import { Link } from 'react-router-dom'

//Image/illustrations
import seamless from '../Assets/seamless.svg'
import seamlessTablet from '../Assets/seamless-tablet.svg'
import seamlessMobile from '../Assets/seamless-mobile.svg'

//Icon
import arrow from '../Assets/arrow.svg'
import curved from '../Assets/curved arrow.svg'


export default function Homepage(){
    useEffect(()=> {document.title = 'Home'}, [])

    return (
        <main className="homepage" id="#trigger">
            <h1 aria-label='Optimize all your assets with minify.'>
                Optimize <Link to='/compress' title="Start Compressing">By Compressing</Link> all your assets <div className='img' title='Your Assets'/> with OptiMG.
            </h1>
            <p aria-label='Or convert them to a new one' className='homepage__sub'>Or <Link to='/convert' title='Convert' className='secondary'>Convert <img src={arrow} alt="Right Arrow" draggable="false" width={30} height={30}/></Link> them to a new one.</p>

            <section className="homepage__mid-content">
                <picture>
                    <source media='(max-width: 430px)' srcSet={seamlessMobile} />
                    <source media='(max-width: 840px)' srcSet={seamlessTablet} />
                    <img 
                        src={seamless} 
                        alt="Seamless Experience Illustration" 
                        draggable="false" 
                        width={1200} 
                        height={610}
                    />
                </picture>

                
                <h2>At OptiMG, we understand the importance of a <span className='secondary'>simple</span> and <span className='secondary'>minimal</span> experience.</h2>
            </section>

            <section className="homepage__mission">
                <h2>Our <span className='primary'>mission</span> you ask?</h2>
                <p>It&apos;s simple, OptiMG is on a mission to make a simple, easy to use, and seamless compression site which <span className='secondary'>Developers</span>, <span className='secondary'>Designers</span>, and average consumers can enjoy can enjoy.</p>
            </section>

            <div className="wrapper">
                <section className="homepage__offer">
                    <h2>What do we <span className='primary'>offer</span>?</h2>

                    <div className='container'>
                        <section className="homepage__offer--card">
                            <h3 className='secondary'>Compression</h3>
                            <p>Say goodbye to sluggish load times and hefty file sizes. </p>
                            <p>Our compression service reduces the size of your digital assets without compromising on quality. </p>
                            <p>Watch as we shrink your assets&apos; file size down, ensuring your web pages load faster and your users stay engaged.</p>
                        </section>
                        <section className="homepage__offer--card">
                            <h3 className='secondary'>Conversion</h3>
                            <p>Keep up with the latest file formats effortlessly.</p>
                            <p>conversion service allows you to transition from older file extensions, like JPG, to newer ones, such as WebP.</p>
                            <p>Stay ahead of the curve, improve compatibility, and embrace the benefits of modern digital media with a simple click.</p>
                        </section>
                    </div>
                </section>
            </div>

            <section className="homepage__closing">
                <p>Try <span className="primary">OptiMG</span> today</p>
                <p>Try OptiMG today and experience the magic of seamless compression and conversion. </p>
                <p>Empower your website, engage your audience, and embrace the future of digital optimization with OptiMG.</p>
            </section>

            <div className="wrapper">
                <section className="homepage__cta">
                    <h2>Check out the <span className='secondary'>APIs</span> used below</h2>
                    <img src={curved} alt="arrow pointing downwards" draggable="false" height={387} width={73}/>
                    <div className="homepage__cta--apis">
                        <Link to="https://tinypng.com/developers/reference" title='Tinify API'>Tinify</Link>
                        <Link to='https://api.cloudmersive.com/docs/convert.asp' title='Cloudmersive API'>Cloudmersive</Link>
                    </div>
                </section>
            </div>
        </main>
    )
}