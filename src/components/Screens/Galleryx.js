import { Layout } from 'antd'
import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import '../../css/gallery.css'
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectCards, EffectCoverflow } from "swiper";
import SwiperCore, { Autoplay } from "swiper"
import { Avatar, Card } from 'antd';

SwiperCore.use(Autoplay)

function Galleryx() {
    const [swiper, setSwiper] = useState(null)
    const [currentslide, setcurrentslide] = useState(0)
    const handleslidechange = () => {
        setcurrentslide(swiper.realIndex)
    }

    return (
        <Layout className='gallery'>
            <Navbar />

                <>
            <div>
                <Swiper
                    onSwiper={setSwiper}
                    onSlideChange={handleslidechange}
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                    autoplay={{ delay: 3000 }}

                >

                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1pHZEzEdIlVWis079zILBK8FCMExT9RB4" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1FLhj0Ir3BgaS7dkxCjx9FZsZdzXqZSb3" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1xi6zoGRQEIpA38C4pbL6124Q_Fxv6eOV" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1WbmCMVP7BQbYnmX39IpLgRKuEImZZBkS" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1xdmyBa7KweTQ6qR7c0iGJP8gr3QA5vuy" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1C--wA6-uZxRuQDPuMoCHWPRKRyPhaJox" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=14t4WGixfpyfr3SWBvzD4DnzzawF_jMk5" />                   </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1I29dLXIaiWxCGhr0T-1wZT_XLGuMG2Ui" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1os6RWmeFnee5OkpB0Ag51o4tvM7tOsLc" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1T50-ttSY-OPcSeSa2LFFIe4A_pcdirH6" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1sSNa5jVRx6RlW342gA2AiXYlq0Vjt3gS" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1E17hk47t34UTJWAjZqBO0GTN_I9na-kb" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1diJVPJ_zVkM-OC48PxS31AeRC-xIA0ui" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-card'>
                        <img src="https://drive.google.com/uc?export=view&id=1os6RWmeFnee5OkpB0Ag51o4tvM7tOsLc" />
                        </div>
                    </SwiperSlide>


                </Swiper>
                {/* <div className='card-description'>
                    <div className='title'>Title{swiper && currentslide}</div>
                    <div className='description'>React Smart Slider is a slideshow component for React that is available for download on NPM. It comes with lots of built-in functionality, and the steps to set it up are quite intuitive overall.</div>
                </div> */}
            </div>
            <div className='gallery-container'>
            <div>
                    <img src="https://drive.google.com/uc?export=view&id=1pHZEzEdIlVWis079zILBK8FCMExT9RB4" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1FLhj0Ir3BgaS7dkxCjx9FZsZdzXqZSb3" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1xi6zoGRQEIpA38C4pbL6124Q_Fxv6eOV" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1WbmCMVP7BQbYnmX39IpLgRKuEImZZBkS" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1xdmyBa7KweTQ6qR7c0iGJP8gr3QA5vuy" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1C--wA6-uZxRuQDPuMoCHWPRKRyPhaJox" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=14t4WGixfpyfr3SWBvzD4DnzzawF_jMk5" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1I29dLXIaiWxCGhr0T-1wZT_XLGuMG2Ui" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1os6RWmeFnee5OkpB0Ag51o4tvM7tOsLc" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1T50-ttSY-OPcSeSa2LFFIe4A_pcdirH6" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1sSNa5jVRx6RlW342gA2AiXYlq0Vjt3gS" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1E17hk47t34UTJWAjZqBO0GTN_I9na-kb" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1diJVPJ_zVkM-OC48PxS31AeRC-xIA0ui" />
                </div>
                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1OlBPyDDJjJ8-DzTMmFuZij2r7Ryrp1z9" />
                </div>

                <div>
                    <img src="https://drive.google.com/uc?export=view&id=1Qpokpv9QQ8qVKfdVkFwkoNVNfw7wmJlq" />
                </div>
            </div>
            </>


        </Layout>
    )
}

export default Galleryx