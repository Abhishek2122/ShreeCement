import pkg from '../../package.json';
export const environment = {
  production: false,
  baseUrl: 'https://theforesite.in/LiveBackEnd/api/',
  MailLink: 'http://localhost:4200/MailApprovalReject',
  NewBaseUrl: "http://localhost:3000/v1/api/",
  envType: "local",
  AppVersion: pkg.version
};

