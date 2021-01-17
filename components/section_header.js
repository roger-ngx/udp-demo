
import React from 'react';

const SectionHeader = ({name, color='#333', align='center'}) => {

    return (<div style={{color}}>
        <h2>{name}</h2>
        <style jsx>
        {
            `
            h2 {
                margin-top: 0;
                padding-bottom: 12px;
                position: relative;
                text-transform: uppercase;
            }
            h2:after {
                position: absolute;
                content: '';
                bottom: 0;
                left: ${align === 'left' ? 0 : '50%'};
                margin-left: ${align === 'left' ? 0 : '-30px'};
                width: 60px;
                height: 4px;
                background: linear-gradient(to right, #5ca9fb 0%, #6372ff 100%);
            }

            @media (max-width: 600px){
                h2{
                    text-align: center
                }
                h2:after{
                    left: 50%;
                    margin-left: -30px;
                }
            }
            `
        }
        </style>
        </div>
    )
}

export default SectionHeader;