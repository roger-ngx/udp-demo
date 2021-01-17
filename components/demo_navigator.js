import Link from 'next/link';
import Head from 'next/head';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const DemoNavigator = ({active}) => {

    return(
        <>
            <AppBar style={{backgroundColor: 'white'}}>
                <Toolbar>
                    <Link href='/'>
                        <img src='/logo.png' style={{width: 50, height: 50, cursor: 'pointer'}}/>
                    </Link>
                    <Link href='/'>
                        <Typography style={{marginLeft: 'auto', color: '#1976d2', fontWeight: active==='machine' ? 'bold' : 'normal', cursor: 'pointer'}}>
                            Machine Comprehension
                        </Typography>
                    </Link>
                    <Link href='/products/content_classification'>
                        <Typography style={{marginLeft: 48, color: '#1976d2', fontWeight: active==='content' ? 'bold' : 'normal', cursor: 'pointer'}}>
                            Content Classification
                        </Typography>
                    </Link>
                    <Link href='/products/information_extraction'>
                        <Typography style={{marginLeft: 48, color: '#1976d2', fontWeight: active==='information' ? 'bold' : 'normal', cursor: 'pointer'}}>
                            Information Extraction
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <style jsx>
            {
                `
                `
            }
            </style>
        </>
    )
}

export default DemoNavigator;