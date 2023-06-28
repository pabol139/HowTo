import {OPENAI_API_KEY} from '@env';
const {Configuration, OpenAIApi} = require('openai');

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
