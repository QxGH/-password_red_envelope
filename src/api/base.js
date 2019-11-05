let base;

if(process.env.NODE_ENV == 'production') {
  // production
  base = {    
    http: 'http://mock-api.com/ynWopyn6.mock'
  };
} else {
  // development
  base = {    
    http: 'http://mock-api.com/ynWopyn6.mock'
  };
};

export default base;