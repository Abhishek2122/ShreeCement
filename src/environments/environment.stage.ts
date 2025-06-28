import pkg from '../../package.json';

export const environment = {
  production: false,
  baseUrl: 'https://theforesite.in/LiveBackEnd/api/',
  MailLink: 'http://localhost:4200/MailApprovalReject',
  NewBaseUrl: "https://newapi.theforesite.in/v1/api/",
  envType: "stage",
  AppVersion: pkg.version
};

