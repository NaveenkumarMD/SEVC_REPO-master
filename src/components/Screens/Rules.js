import { Layout, Card } from 'antd'
import React from 'react'
import Navbar from '../Navbar'
import "../../css/faq.css"
import theme from '../../css/theme.json'
import Faq from '../Faq'
import Faqs from '../../assets/faqs.json'
import '../../css/landing.css'
const { Content } = Layout
function Rules() {

    return (
        <Layout>
            <Navbar />
            <Content style={{
                backgroundColor: theme.colors.backgroundColor,
                minHeight: "100vh"
            }}>
                <div className='faq-bg'>
                <img src={require("../../assets/faq_dropshadow.webp")} />
                </div>
                <div className='title-text text-container-for-faq' style={{color:theme.colors.primaryGreen}}>
                    Frequently Asked Questions
                </div>
                <div className='faq-container'>
                    {
                        Faqs.map((faq, idx) => {
                            return (
                                <Faq key={idx} data={faq} />
                            )
                        })
                    }

                </div>
            </Content>
        </Layout>
    )
}

export default Rules
