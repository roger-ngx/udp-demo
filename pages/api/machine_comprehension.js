const https = require("https");

export default async (req, res) => {
  try{
    const {context, question} = req.body;

    const body = {
      model: "FinBERT_v2",
      question,
      context
    };

    const response = await fetch('https://183.96.253.147:6061/api/v2/mrc/response_long_text',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      agent: new https.Agent({
        rejectUnauthorized: false
      }),
      mode: 'cors',
      body: JSON.stringify(body)
    });

    const resData = await response.json();
    console.log(resData);

    res.end(JSON.stringify(resData));
  }catch(ex){
    console.log(ex);
  }
};