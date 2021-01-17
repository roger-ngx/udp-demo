import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState, useRef, useEffect } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { throttle, map, orderBy, reduce, isEmpty } from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import DemoPage from '../components/DemoPage';
import { sampleTexts, sampleQuestions } from '../utils/mc_test_data';

let lastScrollTop = 0;
let savedTranslate = 0;


const useStyles = makeStyles(theme => ({
  disabledInput: {
    color: theme.palette.text.primary,
  },
}));

export default function MachineComprehension({models}) {

  const classes = useStyles();

  const [ translateY, setTranslateY ] = useState(0);
  const [ originalData, setOriginalData ] = useState('');
  const [ questions, setQuestions ] = useState([]);
  const [ question, setQuestion ] = useState();

  const [ result, setResult ] = useState('');
  const [ processing, setProcessing ] = useState(false);

  useEffect(() => {
    const handler = throttle(handleScroll, 10, { trailing: false});

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleScroll = () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    // if (st > lastScrollTop){
    //   console.log('scroll up', st - lastScrollTop);
    // } else {
    //   console.log('scroll down', lastScrollTop - st);
    // }
    savedTranslate += (lastScrollTop - st)/2;
    setTranslateY(savedTranslate);

    lastScrollTop = st <= 0 ? 0 : st;
  };

  const requestForAnswer = async () => {
    setProcessing(true);
    setResult('');

    try{
      const data = {
        context: originalData,
        question
      };

      console.log(data);

      const res = await fetch(`/api/machine_comprehension`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const resData = await res.json();

      const sortedData = map(orderBy(resData, ['probability'], ['desc']), data => `${data.text} (${(data.probability * 100).toFixed(2)}%)`).slice(0, 3);

      setResult(reduce(sortedData, (result, data) => {
        result += data + '\n\n';
        return result; 
      }, ''));
    }catch(ex){
      console.log(ex);
    }

    setProcessing(false);
  };

  return (
    <div className="container">
      <DemoPage active='machine'>
        <div style={{position: 'relative'}}>
          <div
            style={{
              backgroundColor: '#6f42c1',
              color: 'white',
              padding: '55px 0',
              width: '100%',
              position: 'fixed',
              top: 0, left: 0,
              zIndex: -1,
              height: 500,
              transform: `translateY(${translateY}px)`
            }}
          >
            <div className='grid' style={{flex: 1}}>
                <div style={{flex: 1, marginRight: 20}}>
                    <h1>Comprehensive Chatbot</h1>
                    <p>A messenger marketing solution</p>
                </div>
                <div style={{flex: 1}}>
                  <img src='/img/annotation/NER.gif' style={{height: 300}}/>
                </div>
            </div>
          </div>

          <div id='content' style={{marginTop: 400, backgroundColor: 'white', padding: '55px 0'}}>
          <div style={{padding: '0 20%', marginTop: 55}}>
                <h1>How it works</h1>
                <p>Comprehensive Chatbot aims to serve various domains separately. This means that Comprehensive Chatbot can comprehend a domain knowledge through input text regarding the domain. If you need to deploy Comprehensive Chatbot for your particular business, we just input its information regarding your products, services, or any content that Chatbot is desired to comprehend and answer your customers.</p>
                <p>To demonstrate the ability to comprehend an input knowledge, we built a Machine Reading Comprehension system as web application where we can input knowledge (so-called context) in the form of sentences in text format. And we can also input questions related to the input context. The system will answer our question based on the input context.</p>
          </div>

             <div style={{padding: '0 20%', marginTop: 55}}>
              <div className='column' style={{marginBottom: 24}}>
                <div style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                  <h2 style={{margin: 0}}>Input text</h2>
                  <FormControl variant='outlined' style={{width: 200, marginLeft: 24}}>
                    {/* <InputLabel id="demo-simple-select-label">English</InputLabel> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value='ko'
                      style={{height: 40}}
                    >
                      {/* <MenuItem value='en'>English</MenuItem> */}
                      <MenuItem value='ko'>한국어</MenuItem>
                      {/* <MenuItem value='vi'>Tiếng Việt</MenuItem> */}
                    </Select>
                  </FormControl>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                  <Button
                    style={{marginLeft: 'auto'}}
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setOriginalData(sampleTexts[0]);
                      setQuestions(sampleQuestions[0]);
                      setQuestion();
                    }}
                  >
                    Example
                  </Button>
                  {/* <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setOriginalData(sampleTexts[1]);
                      setQuestions(sampleQuestions[1]);
                      setQuestion();
                    }}
                  >
                    Example 2
                  </Button> */}
                </div>
              </div>
              <TextField
                placeholder='Insert a paragraph of context'
                variant='outlined'
                style={{width: '100%'}}
                multiline={true}
                rows={10}
                value={originalData}
                onChange={e => setOriginalData(e.target.value)}
              />

              {/* <TextField
                placeholder='Type a question'
                variant='outlined'
                style={{width: '100%', marginTop: 12}}
                value={question}
                onChange={e => setQuestion(e.target.value)}
              /> */}

              <Autocomplete
                key={originalData}
                options={questions}
                value={question}
                onChange={(e, value) => setQuestion(value)}

                inputValue={question}
                onInputChange={(event, newInputValue) => {
                  setQuestion(newInputValue);
                }}
        
                style={{ width: '100%' }}

                freeSolo={true}

                renderInput={(params) => <TextField
                  {...params}
                  placeholder='Select or type a question'
                  variant='outlined'
                  style={{width: '100%', marginTop: 12}}
                />}
              />

              <div style={{textAlign: 'right', marginBottom: 30}}>
                <Button
                  variant='contained'
                  color='secondary'
                  style={{margin: '10px 0', minWidth: 90}}
                  onClick={requestForAnswer}
                  disabled={processing || isEmpty(question)}
                >
                  {
                    processing ?
                    <CircularProgress size={24} style={{color: 'white'}} />
                    :
                    'submit'
                  }
                </Button>
              </div>
              
              <h2 style={{margin: '0 0 16px 0'}}>Result</h2>
              <TextField
                placeholder='Five answers for the above question will be displayed here'
                variant='outlined'
                style={{width: '100%'}}
                multiline={true}
                rows={6}
                disabled
                value={result}
                InputProps={{ classes: { disabled: classes.disabledInput } }}
              />
            </div>  

            <div className='grid-column'>
              <div>
                  <h1>Features</h1>
                  <p></p>
              </div>
              <div style={{flex: 1, textAlign: 'center'}}>
                <img src='/img/annotation/Chatbot_features.PNG' style={{width: '80%'}}/>
              </div>
            </div>

            <div className='grid-column'>
              <div>
                  <h1>Architecture</h1>
                  <p></p>
              </div>
              <div style={{flex: 1, textAlign: 'center'}}>
                <img src='/img/annotation/Chatbot_Architecture.PNG' style={{width: '80%'}}/>
              </div>
            </div>
          </div>
        </div>
      </DemoPage>

      <style jsx>{`
        .container {
          min-width: 100vw;
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        #content p {
            line-height: 2.0
        }

        h1 {
          margin-top: 0
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          text-rendering: optimizeLegibility !important;
          -webkit-font-smoothing: antialiased !important;
          color: #777;
          font-weight: 400;
        }

        .column {
          display: flex;
          flex-direction: row;
        }

        .grid {
          display: flex;
          flex-direction: row;
          padding: 0 20%;
        }

        .grid-column {
          display: flex;
          flex-direction: column;
          padding: 0 20%;
          margin-top: 55px
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }

          .column {
            display: flex;
            flex-direction: column;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('', {
//     headers: {
//       'Authorization' : `Basic ${Buffer.from('twin:twin', 'utf-8').toString()}`
//     }
//   });
//   const data = await res.json();

//   return {
//     props: {
//       models: data
//     }
//   }
// }
