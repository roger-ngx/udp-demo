import React from 'react';
import { TextField, Button } from '@material-ui/core';
import SectionHeader from './section_header';

const Footer = () => {

    return (
        <div style={{backgroundColor: '#1f386e', padding: '100px 0', width: '100%'}}>
            <div style={{marginLeft: '10%'}}>
                <SectionHeader name='get in touch' color='white' align='left'/>
            </div>

            <div className='grid' style={{alignItems: 'flex-start', color: 'rgba(255, 255, 255, 0.65)'}}>
                <div style={{flex: 3, display: 'flex', flexDirection: 'column'}}>
                    <p style={{marginTop: 0, marginBottom: 32}}>Please fill out the form below to send us an email and we will get back to you as soon as possible.</p>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <TextField
                            style={{flex: 1, backgroundColor: 'white', marginRight: 24, paddingLeft: 4}}
                            placeholder='Name'
                        />
                        <TextField
                            style={{flex: 1, backgroundColor: 'white', paddingLeft: 4}}
                            placeholder='Email'
                        />
                    </div>
                    <TextField
                        style={{flex: 1, backgroundColor: 'white', margin: '24px 0', paddingLeft: 4}}
                        multiline={true}
                        rows={5}
                        placeholder='Message'
                    />
                    <Button
                        style={{
                            border: '2px solid #fff',
                            background: 'transparent',
                            color: 'white',
                            borderRadius: 25,
                            width: 160,
                            fontSize: 15,
                            fontWeight: 500
                        }}
                    >
                        send message
                    </Button>
                </div>
                <div className='address' style={{flex: 1}}>
                    <h3 style={{marginTop: 0}}>Contact Info</h3>
                    <p>
                        <span>Address</span>
                        <div>9 Fl, Saechang-ro 11, Gongdeok-dong,<br/>
                        Mapo-gu, Seoul, S. Korea</div>
                    </p>
                    <p>
                        <span>Phone</span>
                        <div>+82 10 3087 8988</div>
                    </p>
                    <p>
                        <span>Email</span>
                        <div>nqphuoc@gmail.com</div>
                    </p>
                </div>
            </div>
            <style jsx>
                {
                    `
                    .address{
                        margin-left: 32px
                    }

                    @media(max-width: 600px){
                        .address{
                            margin-left: 0;
                            margin-top: 32px
                        }
                    }
                    `
                }
            </style>
        </div>
    )
}

export default Footer;