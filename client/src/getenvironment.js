function getEnvironment() {
    const currentURL = window.location.href;
   const development = 'http://localhost:8010';
    const production = 'https://ams-backend-jict.onrender.com';
    if (currentURL.includes('localhost')) {
      return development;
    } else 
    {
      return production;
    }
  }
  
export default getEnvironment;
  
